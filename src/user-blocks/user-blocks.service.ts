
import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { FriendshipsService } from '../friendships/friendships.service';
import { PrismaService } from '../prisma/prisma.service';

import { CreateUserBlockDto } from './dto/create-user-block.dto';
import { ListUserBlockDto } from './dto/list-user-block.dto';
// import { sendEmail } from '../mailer';

@Injectable()
export class UserBlocksService {
  constructor(
    private prisma: PrismaService,
    private friendshipsService: FriendshipsService,
  ) {}

  async create(requestUserId: string, createUserBlockDto: CreateUserBlockDto) {
    await this.friendshipsService.removeOnBlock({
      requestUserId,
      userId: createUserBlockDto.userId,
    });
    const createBlock = await this.prisma.block.create({
      data: {
        userId: requestUserId,
        blockedUserId: createUserBlockDto.userId,
      },
      include: {
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        blockedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (!createBlock.id) {
      throw new UnprocessableEntityException('Failed to block user');
    }

    // try {
    //   await sendEmail({
    //     to: process.env.ADMIN_EMAIL,
    //     subject: 'Profile report',
    //     text: `${createBlock.user.firstName} ${createBlock.user.lastName} has reported ${createBlock.blockedUser.firstName} ${createBlock.blockedUser.lastName}'s profile.`,
    //     html: `<p>Reported user id: ${createBlock.blockedUserId}</p><br><p> Reported by : ${createBlock.userId}</p>`,
    //   });
    // } catch (error) {
    //   await this.prisma.block.delete({
    //     where: {
    //       userId_blockedUserId: {
    //         userId: requestUserId,
    //         blockedUserId: createUserBlockDto.userId,
    //       },
    //     },
    //   });
    //   throw new UnprocessableEntityException('Email sending error!');
    // }

    return createBlock;
  }

  findAll(args: { requestUserId: string; query: ListUserBlockDto }) {
    const { requestUserId, query } = args;
    return this.prisma.block.findMany({
      where: {
        userId: requestUserId,
      },
      skip: +query.offset,
      take: +query.limit,
      select: {
        id: true,
        blockedUser: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  remove(args: { requestUserId: string; id: string }) {
    return this.prisma.block.deleteMany({
      where: {
        blockedUserId: args.id,
        userId: args.requestUserId,
      },
    });
  }
}
