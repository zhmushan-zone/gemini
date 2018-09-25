import { Injectable } from '@nestjs/common';
import { MongoRepository } from 'typeorm';
import { Suggestion } from './suggestion.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { GeminiError } from '../common/error';
import { ResponseCode } from '../common/utils';

@Injectable()
export class SuggestionService {

  save(username: string, suggestion: Suggestion) {
    const obj = this.suggestionRepository.create(suggestion);
    obj.from = username;
    return this.suggestionRepository.save(obj);
  }

  findAll() {
    return this.suggestionRepository.find();
  }

  findById(id: string) {
    return this.suggestionRepository.findOne(id);
  }

  async updateById(id: string, suggestion: Suggestion) {
    const doc = await this.suggestionRepository.findOne(id);
    if (!doc) return new GeminiError(ResponseCode.NOT_EXISIT);
    for (const key in suggestion) doc[key] = suggestion[key];
    return this.suggestionRepository.save(doc);
  }

  async delete(id: string) {
    const suggestion = await this.suggestionRepository.findOne(id);
    return this.suggestionRepository.delete(suggestion);
  }

  constructor(
    @InjectRepository(Suggestion)
    private readonly suggestionRepository: MongoRepository<Suggestion>
  ) {}
}
