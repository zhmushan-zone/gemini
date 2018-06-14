import {IsEnum, IsInt, IsJSON, IsString} from 'class-validator';
import {CourseDifficulty, CourseDirection, CourseType} from '../course.entity';

export class CreateCourseDTO {
  @IsString() readonly title;
  @IsEnum(CourseDirection) readonly direction;
  @IsEnum(CourseType) readonly tyle;
  @IsEnum(CourseDifficulty) readonly difficulty;
  @IsInt() readonly price;
  @IsJSON({each: true}) readonly section;
}
