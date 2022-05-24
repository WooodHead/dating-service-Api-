import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { PrismaService } from './../prisma/prisma.service';

import { CreateUserSessionDto } from './dto/create-user-session.dto';

@Injectable()
export class UserSessionsService {
  constructor(
    private prisma: PrismaService,
    private configService: ConfigService,
  ) {}

  async create(createUserSessionDto: CreateUserSessionDto) {
    const isSessionActive = await this.prisma.session.create({
      data: {
        userId: createUserSessionDto.userId,
        accessToken: createUserSessionDto.accessToken,
        sessionToken: createUserSessionDto.accessToken,
        expires: new Date(
          Date.now() + parseInt(this.configService.get('JWT_EXPIRY'), 10),
        ),
      },
    });
    return !!isSessionActive;
  }

  async validateOne(accessToken: string) {
    const isSessionActive = await this.prisma.session.findFirst({
      where: {
        // userId,
        accessToken,
        expires: {
          gt: new Date(),
        },
      },
    });
    return !!isSessionActive;
  }

  async remove(accessToken: string) {
    const resp = await this.prisma.session.update({
      where: {
        accessToken,
      },
      data: {
        expires: new Date(Date.now() - 1),
      },
    });
    return resp;
  }

  async removeAllForUser(userId: string) {
    const resp = await this.prisma.session.updateMany({
      where: {
        userId,
      },
      data: {
        expires: new Date(Date.now() - 1),
      },
    });
    return resp;
  }
}
