import { IsIn, IsInt, IsString, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  readonly title: string;

  @IsIn(['fiction', 'science', 'history'])
  readonly genre: string;

  @IsInt()
  readonly publishedYear: number;
}
