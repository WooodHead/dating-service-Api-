import { ConfigService } from '@nestjs/config';
import { PrismaService } from './../../prisma/prisma.service';
import { PhoneAuthService } from './../phone.service';
import { JwtStrategy } from './../jwt.strategy';
import { LocalStrategy } from './../local.strategy';
import { jwtConstants } from './../constants';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserSessionsModule } from './../../user-sessions/user-sessions.module';
import { UsersModule } from './../../users/users.module';
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from '../auth.controller';
import { AuthService } from '../auth.service';

describe('AuthController', () => {
  let controller: AuthController;

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
      controllers: [AuthController],
      providers: [
        AuthService,
        LocalStrategy,
        JwtStrategy,
        PhoneAuthService,
        PrismaService,
        ConfigService,
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
