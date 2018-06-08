import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { config } from './config';
import { VideoModule } from './video/video.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(config.typeorm),
    UserModule,
    VideoModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {
  constructor() { }
}