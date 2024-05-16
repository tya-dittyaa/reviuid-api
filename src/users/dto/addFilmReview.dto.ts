import { IsNotEmpty, IsNumber, IsString, Length } from 'class-validator';

export class AddFilmReviewDto {
  @IsNotEmpty()
  @IsNumber()
  rating: number;

  @IsNotEmpty()
  @IsString()
  @Length(1, 500)
  review: string;
}
