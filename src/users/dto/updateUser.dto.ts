import {
  IsEmail,
  IsOptional,
  IsString,
  IsStrongPassword,
  Length,
  MinLength,
  NotContains,
} from 'class-validator';

export class UpdateUserDto {
  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsStrongPassword()
  @NotContains(' ')
  password: string;

  @IsOptional()
  @IsString()
  @MinLength(3)
  @NotContains(' ')
  username: string;

  @IsOptional()
  @IsString()
  @Length(0, 255)
  biography: string;
}
