import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AttachmentsService {
  constructor(private prisma: PrismaService) {}

  create(userId: string, url: string) {
    return this.prisma.attachment.create({
      data: {
        url,
        ownerId: userId,
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
      },
    });
  }

  findOne(id: string) {
    return this.prisma.attachment.findUnique({
      where: {
        id,
      },
      select: {
        id: true,
        url: true,
        createdAt: true,
      },
    });
  }

  remove(id: string) {
    return this.prisma.attachment.update({
      where: { id },
      data: { isActive: false },
    });
  }
}
