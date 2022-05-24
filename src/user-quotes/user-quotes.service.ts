import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserEntity } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { UserLocationsService } from '../user-locations/user-locations.service';
import { CreateUserQuoteDto } from './dto/create-user-quote.dto';

@Injectable()
export class UserQuotesService {
  constructor(
    private prisma: PrismaService,
    private userLocationsService: UserLocationsService,
    private usersService: UsersService,
  ) {}

  async create(
    requestedUser: UserEntity,
    createUserQuoteDto: CreateUserQuoteDto,
  ) {
    const { topicId, quote } = createUserQuoteDto;
    const alereadyJoined = requestedUser.quote;
    if (alereadyJoined) {
      throw new UnprocessableEntityException('You already joined on a topic!');
    }
    return await this.prisma.users.update({
      data: {
        quote: {
          content: quote,
          topicId,
          isActive: true,
        },
      },
      where: {
        id: requestedUser.id,
      },
    });
  }

  async findOne(requestUserId: string) {
    const findQuote = await this.prisma.users.findFirst({
      where: {
        id: requestUserId,
      },
      select: {
        id: true,
        quote: true,
      },
    });
    if (!findQuote.quote) {
      throw new UnprocessableEntityException('You dont have any quote!');
    }
    return findQuote;
  }

  async findNearBy(requestUser: UserEntity) {
    const dislikedQuotes = await this.prisma.users.findMany({
      where: {
        quote: {
          is: {
            disliked: {
              hasSome: requestUser.id,
            },
          },
        },
      },
      select: {
        id: true,
      },
    });
    if (!requestUser.loc) {
      throw new UnprocessableEntityException('User location is undefined!');
    }
    const getNearbyUsers = await this.userLocationsService.findNearBy({
      user: requestUser,
      query: {
        long: requestUser.loc.coordinates[0],
        lat: requestUser.loc.coordinates[1],
      },
      disliked: dislikedQuotes.map((user) => user.id),
    });
    const hasQuote = getNearbyUsers.map((user) => user.quote && user);
    const withCalculatedDistance =
      hasQuote.length > 0 &&
      hasQuote.map((user) => ({
        ...user,
        dist: { calculated: user.dist.calculated / 1609.344 },
      }));
    if (withCalculatedDistance && withCalculatedDistance.length > 0) {
      return withCalculatedDistance;
    }
    return [];
  }

  async likeQuote(args: { requestedUserId: string; quoteUserId: string }) {
    const { requestedUserId, quoteUserId } = args;
    const findQoute = await this.prisma.users.findFirst({
      where: {
        id: quoteUserId,
      },
      select: {
        quote: true,
      },
    });
    if (!findQoute.quote) {
      throw new UnprocessableEntityException('Quote not found!');
    }
    const isLiked =
      findQoute.quote.liked && findQoute.quote.liked.includes(requestedUserId);
    if (isLiked) {
      return;
    }
    if (findQoute.quote.liked) {
      findQoute.quote.liked.push(requestedUserId);
    } else {
      findQoute.quote.liked = [requestedUserId];
    }
    if (!findQoute.quote.disliked) {
      findQoute.quote.disliked = [];
    }
    return this.prisma.users.update({
      where: {
        id: quoteUserId,
      },
      data: {
        quote: {
          set: findQoute.quote,
        },
      },
    });
  }

  async dislikeQuote(args: { requestedUserId: string; quoteUserId: string }) {
    const { requestedUserId, quoteUserId } = args;
    const findQoute = await this.prisma.users.findFirst({
      where: {
        id: quoteUserId,
      },
      select: {
        quote: true,
      },
    });

    if (!findQoute.quote) {
      throw new UnprocessableEntityException('Quote not found!');
    }

    const isLiked =
      findQoute.quote.liked && findQoute.quote.liked.includes(requestedUserId);
    if (isLiked) {
      findQoute.quote.liked = findQoute.quote.liked.filter(
        (id) => id !== requestedUserId,
      );
      await this.prisma.users.update({
        where: {
          id: quoteUserId,
        },
        data: {
          quote: {
            set: findQoute.quote,
          },
        },
      });
    }
    if (!findQoute.quote.liked) {
      findQoute.quote.liked = [];
    }

    const isDisliked =
      findQoute.quote.disliked &&
      findQoute.quote.disliked.includes(requestedUserId);
    if (isDisliked) {
      return;
    }
    if (findQoute.quote.disliked) {
      findQoute.quote.disliked.push(requestedUserId);
    } else {
      findQoute.quote.disliked = [requestedUserId];
    }

    return this.prisma.users.update({
      where: {
        id: quoteUserId,
      },
      data: {
        quote: {
          set: findQoute.quote,
        },
      },
    });
  }

  async matched(requestedUser: UserEntity) {
    const userLikedQuotes = await this.prisma.users.findMany({
      where: {
        quote: {
          is: {
            liked: {
              hasSome: requestedUser.id,
            },
          },
        },
      },
    });

    const authorIds = userLikedQuotes.map((user) => user.id);
    const isLikedArray =
      requestedUser.quote &&
      requestedUser.quote.liked &&
      requestedUser.quote.liked.length > 0;
    const matchedIds =
      isLikedArray &&
      requestedUser.quote.liked.map((id) => authorIds.includes(id) && id);
    return this.usersService.findMany(matchedIds);
  }

  async remove(requestUserId: string) {
    return await this.prisma.users.update({
      where: {
        id: requestUserId,
      },
      data: {
        quote: null,
      },
    });
  }
}
