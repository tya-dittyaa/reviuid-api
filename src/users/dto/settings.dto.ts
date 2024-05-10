import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
} from 'class-validator';

export class SettingsDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword()
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  username: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  biography: string;
}
