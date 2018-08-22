import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Common } from './common.entity';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forFeature([Common])
  ],
  exports: [
    AuthModule,
    Common
  ],
  providers: [
    Common
  ]
})
export class CommonModule {
}
