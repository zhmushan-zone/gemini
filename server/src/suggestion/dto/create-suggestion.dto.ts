import { Suggestion } from '../suggestion.entity';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateSuggestionDTO extends Suggestion {
  @IsString() @IsNotEmpty() readonly msg: string;
}
