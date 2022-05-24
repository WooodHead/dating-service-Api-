import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../prisma/prisma.service';
import { UserSessionsModule } from './../user-sessions/user-sessions.module';
import { UsersModule } from './../users/users.module';
import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

import { JwtStrategy } from './jwt.strategy';
import { LocalStrategy } from './local.strategy';
import { PhoneAuthService } from './phone.service';
import { jwtConstants } from './constants';

@Module({
  imports: [
    UsersModule,
    UserSessionsModule,
    PassportModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1y' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    LocalStrategy,
    JwtStrategy,
    PhoneAuthService,
    PrismaService,
    ConfigService,
  ],
})
export class AuthModule {}
