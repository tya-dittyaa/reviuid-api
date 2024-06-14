import { OTPType } from '@prisma/client';
import { IsEmail, IsEnum, IsNotEmpty } from 'class-validator';

export class CreateOtpDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsEnum(OTPType)
  type: OTPType;
}
