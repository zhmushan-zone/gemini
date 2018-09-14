import { Body, Controller, Post, UseGuards, Get, Param, Delete, Put } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { success, response, ResponseCode } from '../common/utils';
import { User, UserRole } from '../user/user.entity';
import { CreateArticleDTO, UpdateArticleDTO, CreateCommentDTO } from './dto';
import { ArticleService } from './article.service';
import { GeminiError } from '../common/error';
import { CommentVO, ArticleVO } from './vo';
import { Article, ArticleCategory, Comment, ArticleStatus } from './article.entity';
import { UserService } from '../user/user.service';
import { ObjectId } from 'bson';
import { UserVO } from '../user/vo/user.vo';
import { Allow } from '../user/role.decorators';
import { Common } from '../common/common.entity';

@Controller('/api/articles')
export class ArticleController {

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createArticleDTO: CreateArticleDTO) {
    const article = await this.articleService.save(user.id.toHexString(), createArticleDTO);
    return success(new ArticleVO(article));
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
    const commentVO = new CommentVO(comment);
    commentVO.authorUsername = user.username;
    commentVO.authorAvatar = user.avatar;
    return success(commentVO);
  }

  @Post('comment/ids')
  async findCommentGroup(@Body() ids: string[]) {
    const comments = await this.articleService.findCommentByIds(ids.map(id => new ObjectId(id)));
    const res: CommentVO[] = [];
    for (const c of comments) {
      const author = await this.userService.findById(c.authorId);
      res.push({
        ...new CommentVO(c),
        authorUsername: author.username,
        authorAvatar: author.avatar
      } as CommentVO);
    }
    return success(res);
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
    category = ArticleCategory[ArticleCategory[category]];
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

  @Get('category/:category/author')
  async findAuthorByCategory(@Param('category') category: ArticleCategory) {
    return success((
      await this.userService.findByIds(
        (await this.articleService.findByCategory(category))
          .map(a => new ObjectId(a.authorId)))
    ).map(a => new UserVO(a)));
  }

  @Get('watch-article-type')
  @UseGuards(AuthGuard('jwt'))
  async findByWatchArticleType(@Usr() user: User) {
    return success(
      (await this.articleService.findByArticleTypes(user.watchArticleTypes))
        .map(a => new ArticleVO(a))
    );
  }

  @Get('upped')
  @UseGuards(AuthGuard('jwt'))
  async findByUpped(@Usr() user: User) {
    const articles = await this.articleService.findByUpersId(user.id.toHexString());
    return success(articles.map(a => new ArticleVO(a)));
  }

  @Get('up-weekly')
  async upWeekly() {
    const commonData = await this.commonEntity.get();
    return success(commonData.articleUpNumWeekly);
  }

  @Get('up-monthly')
  async upMonthly() {
    const commonData = await this.commonEntity.get();
    return success(commonData.articleUpNumMonthly);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articleService.findById(id);
    if (!article) return response(ResponseCode.NOT_EXISIT);
    article.viewnum++;
    this.articleService.updateByIdWithoutUpdateDate(id, { viewnum: article.viewnum } as Article);
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
  async up(@Usr() user: User, @Param('id') id: string) {
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

    this.commonEntity.increaseArticleUpNum(id);

    return success(res.upersId.length);
  }

  @Put(':id/status/:status')
  @Allow(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'))
  async changeStatus(@Param('id') id: string, @Param('status') status: ArticleStatus) {
    status = ArticleStatus[ArticleStatus[status]];
    const err = await this.articleService.updateByIdWithAdmin(id, { status } as Article);
    if (err instanceof GeminiError) return response(err.code);
    return success();
  }

  @Put('comment/:id/up')
  @UseGuards(AuthGuard('jwt'))
  async commentUp(@Usr() user: User, @Param('id') id: string) {
    const comment = await this.articleService.findCommentById(id);
    if (!comment) return response(ResponseCode.NOT_EXISIT);
    if (comment.downersId.findIndex(v => v === user.id.toHexString()) !== -1) return response(ResponseCode.REPEAT_OPERATION);
    const index = comment.upersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      comment.upersId.push(user.id.toHexString());
    } else {
      comment.upersId.splice(index, 1);
    }
    const res = await this.articleService.updateCommentById(comment.authorId, id, { upersId: comment.upersId } as Comment);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  @Put('comment/:id/down')
  @UseGuards(AuthGuard('jwt'))
  async commentDown(@Usr() user: User, @Param('id') id: string) {
    const comment = await this.articleService.findCommentById(id);
    if (!comment) return response(ResponseCode.NOT_EXISIT);
    if (comment.upersId.findIndex(v => v === user.id.toHexString()) !== -1) return response(ResponseCode.REPEAT_OPERATION);
    const index = comment.downersId.findIndex(v => v === user.id.toHexString());
    if (index === -1) {
      comment.downersId.push(user.id.toHexString());
    } else {
      comment.downersId.splice(index, 1);
    }
    const res = await this.articleService.updateCommentById(comment.authorId, id, { downersId: comment.downersId } as Comment);
    if (res instanceof GeminiError) return response(res.code);
    return success();
  }

  constructor(
    private readonly articleService: ArticleService,
    private readonly userService: UserService,
    private readonly commonEntity: Common
  ) { }
}
