import { Body, Controller, Post, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { success } from '../common/utils';
import { User } from '../user/user.entity';
import { CreateArticleDTO, UpdateArticleDTO } from './dto';
import { ArticleService } from './article.service';
import { ArticleVO } from './vo/article.vs';

@Controller('/api/articles')
export class ArticleController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createArticleDTO: CreateArticleDTO) {
    const article = await this.articleService.save(user.id, createArticleDTO);
    return success(new ArticleVO(article));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id) {
    this.articleService.delete(user.id, id);
    return success();
  }

  @Get()
  async findAll() {
    const articles = await this.articleService.findAll();
    return success(articles.map(article => new ArticleVO(article)));
  }

  @Get(':id')
  async findOne(@Param('id') id) {
    const article = await this.articleService.findById(id);
    return success(new ArticleVO(article));
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(@Usr() user, @Body() updateCourseDTO: UpdateArticleDTO, @Param('id') id) {
    const res = await this.articleService.updateById(id, updateCourseDTO);
    return success();
  }

  constructor(
    private readonly articleService: ArticleService
  ) { }
}
