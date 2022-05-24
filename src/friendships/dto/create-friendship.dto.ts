import { ApiProperty } from '@nestjs/swagger';
import { Friendship } from '@prisma/client';
import { IsNumber, IsString } from 'class-validator';

export class CreateFriendshipDto implements Partial<Friendship> {
  // id: number;
  // createdAt: Date;
  // updatedAt: Date;
  // isActive: boolean;
  /** usedId here will be the initiator id, i.e the senderId of friendRequest */
  @IsString()
  @ApiProperty()
  userId: string;

  /** friendId here will be the receiver id, i.e the receiverId of friendRequest */
  @IsString()
  @ApiProperty()
  friendId: string;

  /** friendId here will be the receiver id, i.e the receiverId of friendRequest */
  @IsNumber()
  @ApiProperty()
  friendRequestId: number;
}
