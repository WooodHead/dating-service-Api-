import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
// import { UserNotificationsService } from 'src/user-notifications/user-notifications.service';

import { CreateProfileViewDto } from './dto/create-profile-view.dto';
import { ListProfileViewDto } from './dto/list-profile-view.dto';

@Injectable()
export class ProfileViewsService {
  constructor(
    private prisma: PrismaService, // private userNotificationService: UserNotificationsService,
  ) {}

  async create(args: { userId: string; data: CreateProfileViewDto }) {
    const resp = await this.prisma.userProfileView.create({
      data: {
        userId: args.data.userId,
        viewerId: args.userId,
      },
      include: {
        viewer: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
          },
        },
      },
    });
    return resp;

    // if (!resp.user.isPremium) {
    //   return resp;
    // }
    /**
     * For premium users we send a notification to the user who is being viewed
     * so that they can be notified when they are online.
     */
    // const todaysCount = await this.prisma.userProfileView.aggregate({
    //   where: {
    //     userId: args.data.userId,
    //     createdAt: {
    //       gte: new Date(new Date().getMilliseconds() - 24 * 60 * 60 * 1000),
    //     },
    //   },
    // });
    // if (todaysCount > 1) {
    //   this.userNotificationService.create({
    //     userId: args.data.userId,
    //     type: 'PROFILE_VIEW',
    //     content: `${resp.likedBy.name} liked your profile`,
    //     meta: {
    //       likedBy: resp.likedBy,
    //     },
    //     createdAt: resp.createdAt,
    //   });
    // }
    // return resp;
  }

  async findAll(args: {
    user: Record<string, string>;
    query: ListProfileViewDto;
  }) {
    /**
     * For non-premium users, we only return the 1 profileView (recent)
     */
    // if (!args.user.isPremium) {
    //   return this.prisma.userProfileView.findFirst({
    //     where: {
    //       userId: args.user.id,
    //     },
    //     orderBy: {
    //       createdAt: 'desc',
    //     },
    //     include: {
    //       viewer: {
    //         select: {
    //           id: true,
    //           firstName: true,
    //           lastName: true,
    //         },
    //       },
    //     },
    //   });
    // }
    /**
     * For premium users, we return the last all profileViews;
     * Make it unique on the basis of viewer id.
     * So if u1 visit u2 ten times, u1 will only see u3's profileViews
     * once and that will be the most recent one.
     */

    // const todaysCount = await this.prisma.userProfileView.aggregate({
    //   where: {
    //     userId: args.user.userId,
    //     createdAt: {
    //       gte: new Date(new Date().getMilliseconds() - 24 * 60 * 60 * 1000),
    //     },
    //   },
    // });
    const oneDay: number = 24 * 60 * 60 * 1000;
    const lastDay: Date = new Date(Date.now() - oneDay)
    return this.prisma.userProfileView.groupBy({
      by: ['viewerId', 'createdAt'],
      skip: +args.query.offset,
      take: +args.query.limit,
      where: {
        userId: args.user.id,
        createdAt: {
          gte: lastDay,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
