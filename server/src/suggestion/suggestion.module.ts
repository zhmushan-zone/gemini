import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Suggestion } from './suggestion.entity';
import { SuggestionController } from './suggestion.controller';
import { SuggestionService } from './suggestion.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Suggestion])
  ],
  controllers: [SuggestionController],
  providers: [SuggestionService]
})
export class SuggestionModule {}
