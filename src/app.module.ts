import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { DetectionModule } from './detection/detection.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './config/typeorm.config';


@Module({
  imports: [     
    TypeOrmModule.forRoot(typeOrmConfig),
  UserModule, DetectionModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
