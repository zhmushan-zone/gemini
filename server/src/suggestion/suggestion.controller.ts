import { Controller, Post, Body, UseGuards, Get, Param } from '@nestjs/common';
import { CreateSuggestionDTO } from './dto/create-suggestion.dto';
import { SuggestionService } from './suggestion.service';
import { AuthGuard } from '@nestjs/passport';
import { Usr } from '../user/user.decorators';
import { User, UserRole } from '../user/user.entity';
import { success } from '../common/utils';
import { RolesGuard } from '../common/role.guard';
import { Allow } from '../user/role.decorators';

@Controller('api/suggestions')
export class SuggestionController {

  constructor(
    private readonly suggestionService: SuggestionService
  ) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  async create(@Usr() user: User, @Body() createSuggestionDTO: CreateSuggestionDTO) {
    const suggestion = await this.suggestionService.save(user.id.toHexString(), createSuggestionDTO);
    return success(suggestion);
  }

  @Get()
  @Allow(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findAll() {
    const suggestions = await this.suggestionService.findAll();
    return success(suggestions);
  }

  @Get(':id')
  @Allow(UserRole.ADMIN)
  @UseGuards(AuthGuard('jwt'), RolesGuard)
  async findOne(@Param('id') id: string) {
    const suggestion = await this.suggestionService.findById(id);
    return success(suggestion);
  }
}
