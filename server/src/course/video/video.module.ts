import { Module } from '@nestjs/common';
import { VideoController } from './video.controller';
import { VideoService } from './video.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Video } from './video.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Video])
  ],
  controllers: [VideoController],
  providers: [VideoService]
})
export class VideoModule {}
