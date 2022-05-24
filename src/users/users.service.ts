import { PrismaService } from './../prisma/prisma.service';

import { Injectable, UnprocessableEntityException } from '@nestjs/common';

import { Prisma } from '@prisma/client';

import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private readonly userSelect: Prisma.usersSelect = {
    id: true,
    firstName: true,
    lastName: true,
    birthday: true,
    gender: true,
    sexualOrientation: true,
    showMe: true,
    phoneNumber: true,
    isPrivate: true,
    isPhoneVerified: true,
    isPremium: true,
    isBanned: false,
    createdAt: false,
    updatedAt: false,
    loc: true,
    quote: true,
    accounts: {
      select: {
        providerType: true,
      },
    },
  };

  async isPhoneNumberOccupied(phoneNumber: string) {
    const resp = await this.prisma.users.findFirst({
      where: {
        phoneNumber,
      },
    });
    return !!resp?.id;
  }

  /**
   * Check if the any of the unique properties user has is already occupied by other user
   * if so, returns false else true.
   */
  async validateUser(args: { phoneNumber?: string }): Promise<boolean> {
    const resp = await this.prisma.users.findFirst({
      where: {
        OR: [
          {
            phoneNumber: args.phoneNumber,
          },
        ],
      },
    });
    return !resp?.id;
  }

  async isUserUnique(args: { phoneNumber?: string }): Promise<boolean | Error> {
    const resp = await this.prisma.users.findFirst({
      where: {
        OR: [
          {
            phoneNumber: args.phoneNumber,
          },
        ],
      },
    });
    if (!resp) {
      return true;
    }
    if (resp.phoneNumber === args.phoneNumber) {
      throw new UnprocessableEntityException('Phone number already occupied');
    }
    throw new UnprocessableEntityException('Unable to verify user');
  }

  async createLocal(data: CreateUserDto): Promise<UserEntity> {
    await this.isUserUnique(data);
    if (data.birthday) {
      data.birthday = data.birthday;
    }
    const resp = await this.prisma.users.create({
      data,
      select: this.userSelect,
    });
    return resp as UserEntity;
  }

  async findOne(where: {
    id?: string;
    phoneNumber?: string;
  }): Promise<UserEntity> {
    const resp = await this.prisma.users.findFirst({
      where: {
        id: where.id,
        isBanned: false,
        phoneNumber: where.phoneNumber,
      },
      select: this.userSelect,
    });
    return resp as UserEntity;
  }

  async findMany(userIds: string[]) {
    return this.prisma.users.findMany({
      where: {
        id: {
          in: userIds,
        },
      },
    });
  }

  async update(id: string, data: UpdateUserDto) {
    if (
      data.phoneNumber &&
      (await this.isPhoneNumberOccupied(data.phoneNumber))
    ) {
      throw new UnprocessableEntityException('Phone Number already exists');
    }
    if (data.birthday) {
      data.birthday = new Date(data.birthday);
    }
    return this.prisma.users.update({
      where: {
        id,
      },
      data,
      select: this.userSelect,
    });
  }

  // async updateAvatar(id: string, file: any) {
  //   const url = file;
  //   const resp = await this.prisma.user.update({
  //     where: {
  //       id,
  //     },
  //     data: {
  //       avatar: url,
  //     },
  //     select: this.userSelect,
  //   });
  //   return resp;
  // }

  async findUser(where: {
    id: string;
    requestUserId: string;
  }): Promise<UserEntity> {
    const resp = await this.prisma.users.findFirst({
      where: {
        id: where.id,
        blockedUser: {
          none: {
            userId: where.requestUserId,
          },
        },
        blockedBy: {
          none: {
            blockedUserId: where.requestUserId,
          },
        },
        OR: [
          {
            id: where.id,
            addedFriends: {
              some: {
                userId: where.requestUserId,
                friendId: where.id,
              },
            },
            addedByFriends: {
              some: {
                userId: where.id,
                friendId: where.requestUserId,
              },
            },
          },
          {
            isPrivate: false,
          },
        ],
      },
      select: this.userSelect,
    });
    return resp as UserEntity;
  }
}
