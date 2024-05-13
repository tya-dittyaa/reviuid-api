import { IsNotEmpty, IsString } from 'class-validator';

export class AddFavoriteFilmDto {
  @IsString()
  @IsNotEmpty()
  filmId: string;
}
