import { Friendship } from '@prisma/client';

export class FriendshipEntity implements Friendship {
  friendRequestId: number;
  removedById: string;
  id: string;
  userId: string;
  friendId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}
