import { Article, ArticleType } from '../article.entity';
import { IsString, IsEnum, IsNotEmpty, ArrayNotEmpty } from 'class-validator';

export class UpdateArticleDTO extends Article {
  @IsNotEmpty() @IsString() readonly title;
  @IsNotEmpty() @IsString() readonly coverImg;
  @ArrayNotEmpty() @IsEnum(ArticleType, { each: true }) readonly type;
  @IsNotEmpty() @IsString() readonly content;
}
