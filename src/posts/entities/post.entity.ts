import { ApiResponseProperty } from '@nestjs/swagger';
import { Attachment, Post, PostPrivacyLevel } from '@prisma/client';

export class PostEntity implements Partial<Post> {
  @ApiResponseProperty({ type: 'number', format: 'uuid' })
  id: string;

  @ApiResponseProperty({ type: 'string' })
  content: string;

  @ApiResponseProperty({ type: 'date' })
  createdAt: Date;

  @ApiResponseProperty({ type: 'date' })
  updatedAt: Date;

  @ApiResponseProperty({ type: PostPrivacyLevel })
  privacyLevel: PostPrivacyLevel;

  // @ApiResponseProperty({ type: Array<Attachment> })
  attachments: Attachment[];
}
