import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;

@Module({
  controllers: [AuthController],
  providers: [AuthService],
  imports: [UserModule,
    JwtModule.register({
        global: true,
        secret: JWT_SECRET,
        signOptions: {expiresIn: '1d'}
    }),
    PassportModule
  ],
})
export class AuthModule {}
