import { IsNotEmpty, IsString } from 'class-validator';

export class CreateForumChildDto {
  @IsNotEmpty()
  @IsString()
  forum_parent_id: string;

  @IsNotEmpty()
  @IsString()
  content: string;
}
