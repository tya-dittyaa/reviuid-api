import { IsNotEmpty, IsString } from 'class-validator';

export class AddWatchlistFilmDto {
  @IsString()
  @IsNotEmpty()
  filmId: string;
}
