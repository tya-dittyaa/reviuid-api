import { FilmGenre } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class AddFilmDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsString()
  synopsis: string;

  @IsNotEmpty()
  @IsEnum(FilmGenre, { each: true })
  genre: FilmGenre[];

  @IsNotEmpty()
  @IsUrl()
  poster: string;

  @IsNotEmpty()
  @IsUrl()
  trailer: string;

  @IsNotEmpty()
  @IsDateString()
  releaseDate: Date;

  @IsOptional()
  @IsDateString()
  finishDate: Date;
}
