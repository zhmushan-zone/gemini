import { Module } from '@nestjs/common';
import { FileController } from './file.controller';
import { CommonModule } from '../common/common.module';

@Module({
  imports: [
    CommonModule
  ],
  controllers: [FileController]
})
export class FileModule { }
