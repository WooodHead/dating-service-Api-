import { Injectable } from '@nestjs/common';

import { UserNotificationType } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

import { UserNotificationsService } from 'src/user-notifications/user-notifications.service';

import { CreateFriendshipDto } from './dto/create-friendship.dto';
import { ListFriendshipDto } from './dto/list-friendship.dto';

@Injectable()
export class FriendshipsService {
  constructor(
    private prisma: PrismaService,
    private userNotificationService: UserNotificationsService,
  ) {}

  async create(data: CreateFriendshipDto) {
    const resp = await this.prisma.friendship.create({
      data: {
        userId: data.userId,
        friendId: data.friendId,
      },
      include: {
        users: true,
        friend: true,
      },
    });
    this.userNotificationService.create({
      userId: data.userId,
      type: UserNotificationType.FRIEND_REQUEST_ACCEPTED,
      content: `${resp.friend.firstName} ${resp.friend.lastName} accepted your friend request`,
      meta: {
        friendRequestId: (await resp).id,
        acceptorId: resp.friendId,
        acceptorName: resp.friend.firstName,
      },
      createdAt: resp.createdAt,
    });
    return resp;
  }

  findAllOfSelf(requestUserId: string, query: ListFriendshipDto) {
    return this.prisma.friendship.findMany({
      skip: +query.offset,
      take: +query.limit,
      where: {
        isActive: true,
        OR: [
          {
            userId: requestUserId,
          },
          {
            friendId: requestUserId,
          },
        ],
      },
      select: {
        id: true,
        createdAt: true,
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        friend: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  findAllOfUser(
    requestUserId: string,
    userId: string,
    query: ListFriendshipDto,
  ) {
    return this.prisma.friendship.findMany({
      skip: +query.offset,
      take: +query.limit,
      where: {
        isActive: true,
        OR: [
          {
            userId: requestUserId,
            friendId: userId,
          },
          {
            userId,
            friendId: requestUserId,
          },
        ],
      },
      select: {
        id: true,
        createdAt: true,
        users: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        friend: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }

  remove(id: string, requestUserId: string) {
    return this.prisma.friendship.deleteMany({
      where: {
        id,
        OR: [
          {
            userId: requestUserId,
          },
          {
            friendId: requestUserId,
          },
        ],
      },
    });
  }

  removeOnBlock(args: { requestUserId: string; userId: string }) {
    const { requestUserId, userId } = args;
    return this.prisma.friendship.deleteMany({
      where: {
        OR: [
          {
            userId: requestUserId,
            friendId: userId,
          },
          {
            userId,
            friendId: requestUserId,
          },
        ],
      },
    });
  }
}
