import { ApiResponseProperty } from '@nestjs/swagger';
import { Attachment } from '@prisma/client';

export class AttachmentEntity implements Attachment {
  postId: string;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;

  @ApiResponseProperty()
  id: string;

  @ApiResponseProperty()
  url: string;
}
