import {
  IsEmail,
  IsNotEmpty,
  IsStrongPassword,
  NotContains,
} from 'class-validator';

export class SigninDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  @NotContains(' ')
  password: string;
}
