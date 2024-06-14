import {
  BadRequestException,
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Users } from '@prisma/client';
import { hash, verify } from 'argon2';
import { randomBytes, randomInt } from 'crypto';
import { createTransport } from 'nodemailer';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { JwtPayloadCreate } from '../common/types';
import { CreateOtpDto, SigninDto, SignupDto, VerifyOtpDto } from './dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly configService: ConfigService,
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  mailTransport() {
    return createTransport({
      host: process.env.EMAIL_HOST,
      auth: {
        user: process.env.EMAIL_HOST_USER,
        pass: process.env.EMAIL_HOST_PASSWORD,
      },
    });
  }

  async signUp(dto: SignupDto) {
    // check if email exists
    const emailExists = await this.usersService.findByEmail(dto.email);
    if (emailExists) {
      throw new BadRequestException('Email already exists');
    }

    // check if username exists
    const usernameExists = await this.usersService.findByUsername(dto.username);
    if (usernameExists) {
      throw new BadRequestException('Username already exists');
    }

    // if registering as admin, check if admin password is correct
    if (dto.isAdmin === 'true') {
      if (!dto.adminPassword) {
        throw new BadRequestException('Admin password is required');
      }
      if (dto.adminPassword !== process.env.ADMIN_PASSWORD) {
        throw new BadRequestException('Invalid admin password');
      }
    }

    // hash password
    const hashPassword = await hash(dto.password);

    // create user
    const newUser = await this.usersService.create({
      email: dto.email,
      password: hashPassword,
      username: dto.username,
      role: dto.isAdmin === 'true' ? 'ADMIN' : 'USER',
    });

    // token
    const tokens = await this.getUserTokens(newUser);
    await this.updateRefreshToken(newUser.id, tokens.refreshToken);

    // send email
    try {
      const transporter = this.mailTransport();

      await transporter.sendMail({
        from: `"No Reply - Reviu.ID App" <${process.env.EMAIL_HOST_USER}>`,
        to: dto.email,
        subject: 'Selamat Datang di Reviu.ID',
        html: `
        Halo, <b>${dto.username}</b>!
        </br>
        Terima kasih telah bergabung dengan aplikasi Reviu.ID
        </br>
        </br>
        Akun Anda telah berhasil dibuat.
        </br>
        Berikut adalah informasi akun Anda:
        </br>
        - Email: <b>${dto.email}</b>
        </br>
        - Username: <b>${dto.username}</b>
        </br>
        </br>
        Catatan:
        </br>
        - Jangan memberitahukan kata sandi Anda kepada siapapun.
        </br>
        - Anda dapat mengubah kata sandi Anda di menu pengaturan.
        </br>
        - Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.
        </br>
        </br>
        Salam,
        </br>
        Tim Reviu.ID
        `,
      });
    } catch (error) {
      console.log(error);
    }

    // return tokens
    return tokens;
  }

  async signIn(dto: SigninDto) {
    // check if user exists
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    // check if password is correct
    const passwordMatch = await verify(user.password, dto.password);
    if (!passwordMatch) {
      throw new BadRequestException('Invalid credentials');
    }

    // token
    const tokens = await this.getUserTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    // send email
    try {
      const transporter = this.mailTransport();

      await transporter.sendMail({
        from: `"No Reply - Reviu.ID App" <${process.env.EMAIL_HOST_USER}>`,
        to: dto.email,
        subject: 'Peringatan Keamanan - Reviu.ID',
        html: `
        Halo, <b>${user.username}</b>!
        </br>
        Kami mendeteksi bahwa ada yang berhasil masuk ke dalam akun Reviu.ID Anda.
        </br>
        </br>
        Jika Anda tidak melakukan login ini, segera ubah kata sandi Anda dan hubungi kami.
        </br>
        </br>
        Catatan:
        </br>
        - Jangan memberitahukan kata sandi Anda kepada siapapun.
        </br>
        - Anda dapat mengubah kata sandi Anda di menu pengaturan.
        </br>
        - Jika Anda memiliki pertanyaan, jangan ragu untuk menghubungi kami.
        </br>
        </br>
        Salam,
        </br>
        Tim Reviu.ID
        `,
      });
    } catch (error) {
      console.log(error);
    }

    // return tokens
    return tokens;
  }

  async signOut(userId: string) {
    // check if user exists
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // remove refresh token
    await this.usersService.update(userId, {
      refreshToken: null,
    });
  }

  async forgotPassword(email: string) {
    // check if email exists
    if (!email) {
      throw new BadRequestException('Email is required');
    }

    // check if email exists
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new BadRequestException('Email not found');
    }

    // send email
    try {
      const transporter = this.mailTransport();
      const newPassword = this.createRandomPassword();
      const hashPassword = await hash(newPassword);

      // send email
      await transporter.sendMail({
        from: `"No Reply - Aplikasi Reviu.ID" <${process.env.EMAIL_HOST_USER}>`,
        to: email,
        subject: 'Mengatur Ulang Kata Sandi',
        html: `
        Halo, <b>${user.username}</b>!
        </br>
        Terima kasih telah menggunakan aplikasi Reviu.ID
        </br>
        </br>
        Kami telah menerima permintaan Anda untuk mengatur ulang kata sandi.
        </br>
        Berikut adalah kata sandi baru Anda: <b>${newPassword}</b>
        </br>
        </br>
        Catatan:
        </br>
        - Jangan memberitahukan kata sandi ini kepada siapapun.
        </br>
        - Anda dapat mengubah kata sandi Anda di menu pengaturan.
        </br>
        - Jika Anda tidak merasa melakukan permintaan ini, segera hubungi kami.
        </br>
        </br>
        Salam,
        </br>
        Tim Reviu.ID
        `,
      });

      // update password
      await this.usersService.update(user.id, {
        password: hashPassword,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to send email');
    }
  }

  async refreshUserTokens(userId: string, refreshToken: string) {
    // check if user exists
    const user = await this.usersService.findById(userId);
    if (!user || !user.refreshToken) {
      throw new ForbiddenException('Access denied');
    }

    // check if refresh token is valid
    const isValid = await verify(user.refreshToken, refreshToken);
    if (!isValid) {
      throw new ForbiddenException('Access denied');
    }

    // token
    const tokens = await this.getUserTokens(user);
    await this.updateRefreshToken(user.id, tokens.refreshToken);

    return tokens;
  }

  async sendOtp(dto: CreateOtpDto) {
    // check if otp already exists
    const checkOtp = await this.prisma.oTPVerification.findUnique({
      where: {
        email: dto.email,
      },
    });

    // get user by email
    const user = await this.usersService.findByEmail(dto.email);

    // check if email exists
    if (dto.type === 'REGISTER' && user) {
      throw new BadRequestException('Email already exists');
    }

    if (
      checkOtp &&
      checkOtp.updatedAt.getTime() + 5 * 60 * 1000 > new Date().getTime()
    ) {
      throw new BadRequestException('OTP already sent');
    }

    // send otp
    try {
      const transporter = this.mailTransport();
      const otpCode = randomInt(100000, 999999).toString();
      const otpHash = await hash(otpCode);

      // create or update otp
      await this.prisma.oTPVerification.upsert({
        where: {
          email: dto.email,
        },
        update: {
          otp: otpHash,
        },
        create: {
          email: dto.email,
          type: dto.type,
          otp: otpHash,
        },
      });

      let subject = '';
      switch (dto.type) {
        case 'REGISTER':
          subject = 'Verifikasi OTP - Pendaftaran';
          break;
        case 'FORGOT_PASSWORD':
          subject = 'Verifikasi OTP - Lupa Kata Sandi';
          break;
        case 'CHANGE_EMAIL':
          subject = 'Verifikasi OTP - Ubah Email';
          break;
        default:
          subject = 'Verifikasi OTP';
          break;
      }

      await transporter.sendMail({
        from: `"No Reply - Reviu.ID App" <${process.env.EMAIL_HOST_USER}>`,
        to: dto.email,
        subject,
        html: `
        Halo, ${user ? `<b>${user.username}</b>` : 'Pengguna'}!
        </br>
        Terima kasih telah menggunakan aplikasi Reviu.ID
        </br>
        </br>
        Berikut adalah kode OTP Anda: <b>${otpCode}</b>
        </br>
        </br>
        Catatan:
        </br>
        - Jangan memberitahukan kode ini kepada siapapun.
        </br>
        - Kode ini akan kadaluarsa dalam waktu 5 menit.
        </br>
        - Jika Anda tidak merasa melakukan permintaan ini, segera hubungi kami.
        </br>
        </br>
        Salam,
        </br>
        Tim Reviu.ID
        `,
      });
    } catch (error) {
      console.log(error);
      throw new BadRequestException('Failed to send OTP');
    }
  }

  async verifyOtp(dto: VerifyOtpDto) {
    // check if otp exists
    const otp = await this.prisma.oTPVerification.findUnique({
      where: {
        email: dto.email,
      },
    });

    // check if otp exists
    if (!otp) {
      throw new BadRequestException('OTP not found');
    }

    // check if otp is valid
    const isValid = await verify(otp.otp, dto.otp);
    if (!isValid) {
      throw new BadRequestException('Invalid OTP');
    }

    // check if otp type is correct
    if (otp.type !== dto.type) {
      throw new BadRequestException('Invalid OTP type');
    }

    // check if otp is expired
    if (otp.updatedAt.getTime() + 5 * 60 * 1000 < new Date().getTime()) {
      throw new BadRequestException('OTP expired');
    }

    // delete otp
    await this.prisma.oTPVerification.delete({
      where: {
        email: dto.email,
      },
    });
  }

  async updateRefreshToken(userId: string, refreshToken: string) {
    const hashedRefreshToken = await hash(refreshToken);
    await this.usersService.update(userId, {
      refreshToken: hashedRefreshToken,
    });
  }

  async getUserTokens(user: Users) {
    const jwtPayload: JwtPayloadCreate = {
      sub: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
      role: user.role,
    };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_ACCESS_SECRET'),
        expiresIn: '15m',
      }),
      this.jwtService.signAsync(jwtPayload, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
        expiresIn: '7d',
      }),
    ]);

    return {
      accessToken,
      refreshToken,
    };
  }

  createRandomPassword() {
    const lowerCaseLetters = 'abcdefghijklmnopqrstuvwxyz';
    const upperCaseLetters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const specialCharacters = '!@#$%^&*()_+[]{}|;:,.<>?';
    const allCharacters =
      lowerCaseLetters + upperCaseLetters + numbers + specialCharacters;

    function getRandomCharacter(characters: string): string {
      const randomIndex = randomBytes(1)[0] % characters.length;
      return characters[randomIndex];
    }

    const passwordLength = 8 + (randomBytes(1)[0] % 5); // Panjang password antara 8 hingga 12 karakter

    let password = '';
    password += getRandomCharacter(lowerCaseLetters);
    password += getRandomCharacter(upperCaseLetters);
    password += getRandomCharacter(numbers);
    password += getRandomCharacter(specialCharacters);

    for (let i = 4; i < passwordLength; i++) {
      password += getRandomCharacter(allCharacters);
    }

    // Shuffle the password to ensure randomness
    password = password
      .split('')
      .sort(() => (randomBytes(1)[0] % 2) - 0.5)
      .join('');

    return password;
  }
}
