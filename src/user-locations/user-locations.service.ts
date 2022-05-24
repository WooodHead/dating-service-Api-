import { Injectable } from '@nestjs/common';
import { NearByUserDto } from './dto/near-by-user.dto';
import { CreateUserLocationDto } from './dto/create-user-location.dto';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { UserEntity } from '../users/entities/user.entity';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UserLocationsService {
  constructor(
    @InjectModel(User.name)
    private readonly UserModel: Model<UserDocument>,
  ) {}

  private getMilesToMeters(miles) {
    return miles * 1609.344;
  }

  private async getNearbyUsersQueryAsync(args: {
    long: number;
    lat: number;
    minDistanceInMiles: number;
    maxDistanceInMiles: number;
    size: number;
    query?: Record<string, unknown>;
  }) {
    const { long, lat, minDistanceInMiles, maxDistanceInMiles, size, query } =
      args;
    return await this.UserModel.aggregate([
      {
        $geoNear: {
          near: { type: 'Point', coordinates: [long, lat] },
          distanceField: 'dist.calculated',
          minDistance: this.getMilesToMeters(minDistanceInMiles),
          maxDistance: this.getMilesToMeters(maxDistanceInMiles),
          includeLocs: 'dist.location',
          spherical: true,
          query,
        },
      },
      { $sample: { size } },
    ]);
  }

  async create(
    userId: string,
    body: CreateUserLocationDto,
  ): Promise<Partial<User>> {
    const updateUser = await this.UserModel.updateOne(
      {
        _id: userId,
      },
      {
        $set: {
          loc: {
            type: 'Point',
            coordinates: [body.long, body.lat],
          },
          updatedAt: Date.now(),
        },
      },
      { new: true },
    );
    return updateUser as Partial<User>;
  }

  async findNearBy(args: {
    user: UserEntity;
    query: NearByUserDto;
    disliked?: string[];
  }) {
    const { query, user, disliked } = args;
    const notStraight =
      user.showMe === user.gender && user.sexualOrientation !== 'straight'
        ? {
            gender: user.gender,
            sexualOrientation: user.sexualOrientation,
          }
        : {
            gender: user.showMe,
          };

    const queryFilterOptions: any =
      user.sexualOrientation === 'straight'
        ? {
            gender: user.gender === 'Men' ? 'Women' : 'Men',
            sexualOrientation: 'straight',
          }
        : notStraight;
    if (disliked && disliked.length > 0) {
      queryFilterOptions.id = {
        $not: {
          $in: disliked,
        },
      };
    }
    const users = [];
    const queries = [];

    queries.push(
      this.getNearbyUsersQueryAsync({
        long: +query.long,
        lat: +query.lat,
        minDistanceInMiles: 0,
        maxDistanceInMiles: 5,
        size: 25,
        query: queryFilterOptions,
      }),
    );

    queries.push(
      this.getNearbyUsersQueryAsync({
        long: +query.long,
        lat: +query.lat,
        minDistanceInMiles: 5,
        maxDistanceInMiles: 15,
        size: 15,
        query: queryFilterOptions,
      }),
    );

    queries.push(
      this.getNearbyUsersQueryAsync({
        long: +query.long,
        lat: +query.lat,
        minDistanceInMiles: 15,
        maxDistanceInMiles: 25,
        size: 10,
        query: queryFilterOptions,
      }),
    );

    const queryResults = await Promise.all(queries);

    queryResults.forEach((queryResult) => {
      queryResult.forEach(function (value) {
        users.push(value);
      });
    });

    return users;
  }

  async findOne(requestUserId: string) {
    const getUserLocation = await this.UserModel.findOne(
      { id: requestUserId },
      ['loc'],
    ).exec();
    return getUserLocation;
  }
}
