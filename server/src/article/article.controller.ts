import { Body, Controller, Post, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { success, response, ResponseCode } from '../common/utils';
import { User } from '../user/user.entity';
import { CreateArticleDTO, UpdateArticleDTO, CreateCommentDTO } from './dto';
import { ArticleService } from './article.service';
import { GeminiError } from '../common/error';
import { CommentVO, ArticleVO } from './vo';
import { Article, ArticleCategory } from './article.entity';
import { UserService } from '../user/user.service';

@Controller('/api/articles')
export class ArticleController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createArticleDTO: CreateArticleDTO) {
    const article = await this.articleService.save(user.id.toHexString(), createArticleDTO);
    return success(new ArticleVO(article));
  }

  @Delete(':id')
  @UseGuards(AuthGuard('jwt'))
  delete(@Usr() user: User, @Param('id') id) {
    this.articleService.delete(user.id.toHexString(), id);
    return success();
  }

  @Get()
  async findAll() {
    const articles = await this.articleService.findAll();
    const res: ArticleVO[] = [];
    for (const a of articles) {
      const author = await this.userService.findById(a.authorId);
      res.push({
        ...new ArticleVO(a),
        authorUsername: author.username,
        authorAvatar: author.avatar
      } as ArticleVO);
    }
    return success(res);
  }

  @Get('author/:id')
  async findByAuthorId(@Param('id') id: string) {
    const articles = await this.articleService.findByAuthorId(id);
    const author = await this.userService.findById(id);
    return success(articles.map(a => {
      return {
        ...new ArticleVO(a),
        authorUsername: author.username,
        authorAvatar: author.avatar
      } as ArticleVO;
    }));
  }

  @Get('category/:category')
  async findByCategory(@Param('category') category: ArticleCategory) {
    const articles = await this.articleService.findByCategory(category);
    const res = [] as ArticleVO[];
    for (const a of articles) {
      const author = await this.userService.findById(a.authorId);
      res.push({
        ...new ArticleVO(a),
        authorUsername: author.username,
        authorAvatar: author.avatar
      } as ArticleVO);
    }
    return success(res);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findById(id);
    if (!article) return response(ResponseCode.NOT_EXISIT);
    const author = await this.userService.findById(article.authorId);
    return success({
      ...new ArticleVO(article),
      authorUsername: author.username,
      authorAvatar: author.avatar
    } as ArticleVO);
  }

  @Put(':id')
  @UseGuards(AuthGuard('jwt'))
  async updateOne(
    @Usr() user: User,
    @Body() updateArticleDTO: UpdateArticleDTO,
    @Param('id') id: string
  ) {
    const res = await this.articleService.updateById(user.id.toHexString(), id, updateArticleDTO);
    if (res instanceof GeminiError) return response(res.code);
    return success(new ArticleVO(res));
  }

  @Put(':id/up')
  @UseGuards(AuthGuard('jwt'))
  async replyUp(@Usr() user: User, @Param('id') id: string) {
    const article = await this.articleService.findById(id);
    if (!article) return response(ResponseCode.NOT_EXISIT);
    const index = article.upersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      article.upersId.push(user.id.toHexString());
    } else {
      article.upersId.splice(index, 1);
    }
    const res = await this.articleService.updateById(article.authorId, id, { upersId: article.upersId } as Article);
    if (res instanceof GeminiError) return response(res.code);
    return success(res.upersId.length);
  }

  @Post(':id/comment')
  @UseGuards(AuthGuard('jwt'))
  async createComment(
    @Usr() user: User,
    @Body() createCommentDTO: CreateCommentDTO,
    @Param('id') id: string
  ) {
    const article = await this.articleService.findById(id);
    if (!article) return response(ResponseCode.NOT_EXISIT);
    const comment = await this.articleService.createComment(user.id.toHexString(), createCommentDTO);
    if (!comment) return response(ResponseCode.UNKNOWN);
    article.commentsId.push(comment.id.toHexString());
    const res = await this.articleService.updateById(article.authorId, id, { commentsId: article.commentsId } as Article);
    if (res instanceof GeminiError) return response(res.code);
    return success(new CommentVO(comment));
  }

  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService
  ) { }
}
