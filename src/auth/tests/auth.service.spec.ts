import { jwtConstants } from './../constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserSessionsModule } from './../../user-sessions/user-sessions.module';

import { PrismaService } from './../../prisma/prisma.service';
import { UsersModule } from './../../users/users.module';
import { PhoneAuthService } from './../phone.service';
import { JwtStrategy } from './../jwt.strategy';
import { LocalStrategy } from './../local.strategy';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

describe('AuthService', () => {
  let service: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        UsersModule,
        UserSessionsModule,
        PassportModule,
        JwtModule.register({
          secret: jwtConstants.secret,
          signOptions: { expiresIn: '1y' },
        }),
      ],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        PhoneAuthService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
