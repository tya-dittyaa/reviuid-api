import { FilmGenre } from '@prisma/client';
import {
  IsDateString,
  IsEnum,
  IsOptional,
  IsString,
  IsUrl,
} from 'class-validator';

export class UpdateFilmDto {
  @IsOptional()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  synopsis: string;

  @IsOptional()
  @IsEnum(FilmGenre, { each: true })
  genre: FilmGenre[];

  @IsOptional()
  @IsUrl()
  poster: string;

  @IsOptional()
  @IsUrl()
  trailer: string;

  @IsOptional()
  @IsDateString()
  releaseDate: Date;

  @IsOptional()
  @IsDateString()
  finishDate: Date;
}
