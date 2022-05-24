import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';

@Injectable()
export class RefreshCountsService {
  constructor(private prisma: PrismaService) {}

  async create(requestUser: UserEntity) {
    // check for refreshcount object exist in database or not

    const dataExist = await this.prisma.refreshCount.findFirst({
      where: {
        userId: requestUser.id,
      },
      select: {
        count: true,
        updatedAt: true,
      },
    });

    // if refreshcount object doesn't exist create new one
    if (!dataExist) {
      return this.prisma.refreshCount.create({
        data: {
          userId: requestUser.id,
          count: 1,
        },
      });
    }

    // if user is not premium subscriber set limit to 6 in a day
    if (!requestUser.isPremium && dataExist.count >= 3) {
      const oneDay: number = 24 * 60 * 60 * 1000;
      const lastDay: Date = new Date(Date.now() - oneDay);
      if (dataExist.updatedAt >= lastDay) {
        throw new UnprocessableEntityException(
          'You have exceeded daily refresh limit!',
        );
      }

      // if 24hr passed after data limit reset the count

      return this.prisma.refreshCount.update({
        where: {
          userId: requestUser.id,
        },
        data: {
          count: 1,
          updatedAt: new Date(),
        },
        select: {
          id: true,
          count: true,
        },
      });
    }
    // update count
    return this.prisma.refreshCount.update({
      where: {
        userId: requestUser.id,
      },
      data: {
        count: dataExist.count + 1,
        updatedAt: new Date(),
      },
      select: {
        id: true,
        count: true,
      },
    });
  }

  findOne(requestUser: UserEntity) {
    return this.prisma.refreshCount.findFirst({
      where: {
        userId: requestUser.id,
      },
      include: {
        users: {
          select: {
            firstName: true,
            lastName: true,
            isPremium: true,
          },
        },
      },
    });
  }
}
