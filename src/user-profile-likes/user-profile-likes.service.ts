import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { UserNotificationsService } from './../user-notifications/user-notifications.service';

import { PrismaService } from './../prisma/prisma.service';
import {
  UserProfileLikeEntity,
  UserProfileLikeSummaryEntity,
} from './entities/user-profile-like.entity';

@Injectable()
export class UserProfileLikesService {
  constructor(
    private prisma: PrismaService,
    private userNotificationService: UserNotificationsService,
  ) {}

  async create(params: { likedId: string; likedById: string }) {
    const likedAlready = await this.prisma.userProfileLike.findFirst({
      where: {
        likedId: params.likedId,
        likedById: params.likedById,
      },
      select: {
        createdAt: true,
      },
    });
    const oneDay: number = 24 * 60 * 60 * 1000;
    const lastDay: Date = new Date(Date.now() - oneDay);
    if (likedAlready && likedAlready.createdAt >= lastDay) {
      throw new UnprocessableEntityException(
        'Can not like within 24hrs more than once',
      );
    }
    const resp = await this.prisma.userProfileLike.upsert({
      where: {
        likedId_likedById: {
          likedId: params.likedId,
          likedById: params.likedById,
        },
      },
      create: {
        likedById: params.likedById,
        likedId: params.likedId,
        isActive: true,
      },
      update: {
        likedById: params.likedById,
        likedId: params.likedId,
        isActive: true,
      },
      include: {
        likedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    if (resp.id) {
      this.userNotificationService.create({
        userId: params.likedId,
        type: 'PROFILE_LIKE',
        content: `${resp.likedBy.firstName} ${resp.likedBy.lastName} liked your profile`,
        meta: {
          likedBy: resp.likedBy,
        },
        createdAt: resp.createdAt,
      });
    }

    return resp;
  }

  async summary(params: { userId }): Promise<UserProfileLikeSummaryEntity> {
    const [count, recent] = await this.prisma.$transaction([
      this.prisma.userProfileLike.count({
        where: {
          likedId: params.userId,
          isActive: true,
        },
      }),
      this.prisma.userProfileLike.findMany({
        where: {
          likedId: params.userId,
          isActive: true,
        },
        orderBy: {
          updatedAt: 'desc',
        },
        skip: 0,
        take: 3,
        include: {
          liked: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
          likedBy: {
            select: {
              id: true,
              firstName: true,
              lastName: true,
            },
          },
        },
      }),
    ]);
    return {
      count,
      recent,
    };
  }

  findAllOnUser(params: {
    userId: string;
    limit: number;
    offset: number;
  }): Promise<UserProfileLikeEntity[]> {
    return this.prisma.userProfileLike.findMany({
      where: {
        likedId: params.userId,
        isActive: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: params.offset,
      take: params.limit,
      include: {
        liked: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        likedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  findAllByUser(params: {
    userId: string;
    limit: number;
    offset: number;
  }): Promise<UserProfileLikeEntity[]> {
    return this.prisma.userProfileLike.findMany({
      where: {
        likedById: params.userId,
        isActive: true,
      },
      orderBy: {
        updatedAt: 'desc',
      },
      skip: params.offset,
      take: params.limit,
      include: {
        liked: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
        likedBy: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
  }

  async remove(id: string, likedById: string) {
    const resp = await this.prisma.userProfileLike.updateMany({
      where: {
        id,
        likedById: likedById,
      },
      data: {
        isActive: false,
      },
    });
    return resp.count > 0;
  }

  async isLikedByUser(params: {
    likedId: string;
    likedById: string;
  }): Promise<boolean> {
    const resp = await this.prisma.userProfileLike.findFirst({
      where: {
        likedById: params.likedById,
        likedId: params.likedId,
      },
    });
    return !!resp.id;
  }
}
