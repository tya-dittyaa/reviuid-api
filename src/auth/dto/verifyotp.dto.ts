import { OTPType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty, IsNumberString } from 'class-validator';

export class VerifyOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsNumberString()
  otp: string;

  @IsNotEmpty()
  @IsEnum(OTPType)
  type: OTPType;
}
