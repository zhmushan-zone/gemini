import { IsString, IsNotEmpty, ArrayNotEmpty, IsEnum } from 'class-validator';
import { Article, ArticleType } from '../article.entity';

export class CreateArticleDTO extends Article {
  @IsNotEmpty() @IsString() readonly title;
  @IsNotEmpty() @IsString() readonly coverImg;
  @ArrayNotEmpty() @IsEnum(ArticleType, { each: true }) readonly type;
  @IsNotEmpty() @IsString() readonly content;
}
