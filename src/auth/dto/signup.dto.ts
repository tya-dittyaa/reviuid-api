import {
  IsBooleanString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MinLength,
  NotContains,
} from 'class-validator';

export class SignupDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @NotContains(' ')
  username: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @NotContains(' ')
  password: string;

  @IsOptional()
  @IsBooleanString()
  isAdmin: string;

  @IsOptional()
  @IsStrongPassword()
  @NotContains(' ')
  adminPassword: string;
}
