import { Course, CourseDifficulty, CourseDirection, CourseType, Section, Node } from '../course.entity';
import { ArrayNotEmpty, IsEnum, IsNotEmpty, IsNumber, IsString, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNodeDTO extends Node {
  @IsNotEmpty() @IsString() readonly title;
  @IsNotEmpty() @IsString() readonly video;
}

export class UpdateSectionDTO extends Section {
  @IsNotEmpty() @IsString() title;

  @ValidateNested({ each: true })
  @Type(() => UpdateNodeDTO)
  readonly nodes: UpdateNodeDTO[];
}

export class UpdateCourseDTO extends Course {

  @IsString() readonly title;

  @IsNotEmpty() @IsString() readonly desc;

  @IsNotEmpty() @IsString() readonly coverImg;

  @IsEnum(CourseDirection) readonly direction;

  @ArrayNotEmpty() @IsEnum(CourseType, { each: true }) readonly type;

  @IsEnum(CourseDifficulty) readonly difficulty;

  @IsNumber() readonly price;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => UpdateSectionDTO)
  readonly sections: UpdateSectionDTO[];
}
