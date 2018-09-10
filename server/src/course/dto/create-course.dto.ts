import {
  ArrayNotEmpty,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
  ValidateNested
} from 'class-validator';
import { Course, CourseDifficulty, CourseDirection, CourseType, Section } from '../course.entity';
import { Type } from 'class-transformer';

export class CreateSectionDTO extends Section {
  @IsNotEmpty() @IsString() title;
}

export class CreateCourseDTO extends Course {
  @IsNotEmpty() @IsString() readonly title;
  @IsNotEmpty() @IsString() readonly desc;
  @IsNotEmpty() @IsString() readonly coverImg;
  @IsEnum(CourseDirection) readonly direction;
  @ArrayNotEmpty() @IsEnum(CourseType, { each: true }) readonly type;
  @IsEnum(CourseDifficulty) readonly difficulty;
  @IsNumber() readonly price;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateSectionDTO)
  readonly sections: CreateSectionDTO[];
}
