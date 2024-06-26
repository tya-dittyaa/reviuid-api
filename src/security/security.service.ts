import { GoogleGenerativeAI } from '@google/generative-ai';
import { BadRequestException, Injectable } from '@nestjs/common';
import { ReportType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { UsersService } from 'src/users/users.service';
import { AddUserReportDto } from './dto/addUserReport.dto';

@Injectable()
export class SecurityService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly usersService: UsersService,
  ) {}

  geminiModel() {
    const apiKey = process.env.GEMINI_API_KEY;
    const apiKey2 = process.env.GEMINI_API_KEY_2;
    const apiKey3 = process.env.GEMINI_API_KEY_3;
    const random = Math.floor(Math.random() * 3) + 1;

    let apiKeyToUse = apiKey;
    switch (random) {
      case 1:
        apiKeyToUse = apiKey;
        break;
      case 2:
        apiKeyToUse = apiKey2;
        break;
      case 3:
        apiKeyToUse = apiKey3;
    }

    const genAI = new GoogleGenerativeAI(apiKeyToUse);
    const model = genAI.getGenerativeModel({
      model: 'gemini-1.5-flash',
    });
    return model;
  }

  async checkText(text: string) {
    // Gemini model
    const model = this.geminiModel();
    let answer: boolean = false;

    // Check if text is empty
    if (!text) {
      throw new BadRequestException('Text is required');
    }

    // Create prompt
    const prompt = `Mohon berikan saya jawaban dalam 1 angka jika benar adalah '1' dan salah adalah '0' jika kalimat dibawah ini mengandung salah satu unsur kata kasar, unsur kata jorok, unsur SARA (Suku, Agama, Ras, Antar-golongan), ujaran kebencian, kata-kata yang merendahkan, promosi, iklan, spam, atau hal-hal yang tidak pantas lainnya dalam semua bahasa (utamakan bahasa indonesia dan bahasa daerah di indonesia), dan mohon di cek perhurufnya juga karena bisa saja dituliskan secara sambung tanpa spasi ataupun diubah menggunakan angka, kalimat yang di cek, segala angka dan singkatan yang mengandung kemungkinan pornografi, iklan, dan no telp dari kalimat yaitu: "${text}"`;

    // Generate content
    try {
      const result = await model.generateContent(prompt);
      const response = await result.response.text();
      answer = parseInt(response) === 0 ? false : true;
    } catch (error) {
      if (
        error.message ===
        '[GoogleGenerativeAI Error]: Candidate was blocked due to SAFETY'
      ) {
        answer = true;
      } else {
        answer = false;
      }
    }

    // Return response
    return answer;
  }

  async reportUsers() {
    return await this.prisma.userReport.findMany({
      select: {
        id: true,
        reportId: true,
        reportType: true,
        reportContent: true,
        user: {
          select: {
            id: true,
            username: true,
          },
        },
      },
      where: {
        reportStatus: false,
      },
    });
  }

  async addUserReport(dto: AddUserReportDto) {
    return await this.prisma.userReport.create({
      data: {
        user_id: dto.user_id,
        reportId: dto.reportId,
        reportType: dto.reportType,
        reportContent: dto.reportContent,
      },
    });
  }

  async ignoreUserReport(reportId: string) {
    if (!reportId) {
      throw new BadRequestException('Report ID is required');
    }

    return await this.prisma.userReport.update({
      where: {
        id: reportId,
      },
      data: {
        reportStatus: true,
      },
    });
  }

  async actionUserReport(reportId: string, reportType: ReportType) {
    if (!reportId) {
      throw new BadRequestException('Report ID is required');
    }

    const check = await this.prisma.userReport.findUnique({
      where: {
        id: reportId,
      },
    });

    if (!check) {
      throw new BadRequestException('Report not found');
    }

    switch (reportType) {
      case 'USER_AVATAR':
        await this.prisma.users.update({
          where: {
            id: check.reportId,
          },
          data: {
            avatar:
              'https://lh3.googleusercontent.com/d/1yhM-tDrQwh166RGAqTGzLKPvVri7jAKD',
          },
        });
        break;
      case 'USER_USERNAME':
        const randomUsername = Math.random().toString(36).substring(7);
        await this.prisma.users.update({
          where: {
            id: check.reportId,
          },
          data: {
            username: randomUsername,
          },
        });
        break;
      case 'USER_BIOGRAPHY':
        await this.prisma.users.update({
          where: {
            id: check.reportId,
          },
          data: {
            biography: null,
          },
        });
        break;
      case 'USER_FILM_COMMENT':
        const review = await this.prisma.userFilmReview.findMany({
          where: {
            id: check.reportId,
          },
        });

        if (review.length > 0) {
          for (const r of review) {
            await this.usersService.removeFilmReview(check.user_id, r.film_id);
          }
        }
        break;
      case 'USER_FORUM_PARENT_TITLE':
        await this.prisma.forumChild.deleteMany({
          where: {
            forum_parent_id: check.reportId,
          },
        });
        await this.prisma.forumParent.delete({
          where: {
            id: check.reportId,
          },
        });
        break;
      case 'USER_FORUM_PARENT_CONTENT':
        await this.prisma.forumChild.deleteMany({
          where: {
            forum_parent_id: check.reportId,
          },
        });
        await this.prisma.forumParent.delete({
          where: {
            id: check.reportId,
          },
        });
        break;
      case 'USER_FORUM_CHILD_CONTENT':
        await this.prisma.forumChild.deleteMany({
          where: {
            id: check.reportId,
          },
        });
        break;

      default:
        throw new BadRequestException('Report type not found');
    }

    return await this.prisma.userReport.update({
      where: {
        id: reportId,
      },
      data: {
        reportStatus: true,
      },
    });
  }
}
