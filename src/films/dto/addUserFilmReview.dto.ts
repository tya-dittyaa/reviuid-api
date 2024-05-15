import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class AddUserFilmReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  review: string;
}
