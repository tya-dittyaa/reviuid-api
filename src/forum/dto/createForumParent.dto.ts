import { IsNotEmpty, IsString } from 'class-validator';

export class CreateForumParentDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
