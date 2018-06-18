import {Course, CourseDifficulty, CourseDirection, CourseType, Section} from '../course.entity';
import {Column} from 'typeorm';
import {ArrayNotEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested} from 'class-validator';
import {Type} from 'class-transformer';

export class UpdateSectionDTO extends Section {
  @IsNotEmpty() @IsString() title;
}

export class UpdateCourseDTO extends Course {

  @IsString() readonly title;

  @IsEnum(CourseDirection) readonly direction;

  @IsEnum(CourseType, {each: true}) readonly type;

  @IsEnum(CourseDifficulty) readonly difficulty;

  @IsNumber() readonly price;

  @ArrayNotEmpty()
  @ValidateNested({each: true})
  @Type(() => UpdateSectionDTO)
  readonly sections;
}
