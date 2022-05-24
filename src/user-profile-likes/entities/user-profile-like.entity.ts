import { UserProfileLike } from '@prisma/client';

export class UserProfileLikeEntity implements Partial<UserProfileLike> {
  id: string;
  likedBy: {
    id: string;
    firstName: string;
    lastName: string;
  };
  liked: {
    id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
}

export class UserProfileLikeSummaryEntity {
  count: number;
  recent: UserProfileLikeEntity[];
}
