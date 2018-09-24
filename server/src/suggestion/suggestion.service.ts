import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class SuggestionService {

  save(userId: string, suggestion: Suggestion) {
    const obj = this.suggestionRepository.create(suggestion);
    return this.suggestionRepository.save(obj);
  }

  findAll() {
    return this.suggestionRepository.find();
  }

  findById(id: string) {
    return this.suggestionRepository.findOne(id);
  }

  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: MongoRepository<Suggestion>
  ) {}
}
