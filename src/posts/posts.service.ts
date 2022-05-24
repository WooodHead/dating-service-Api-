import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { ListPostsDto } from './dto/list-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(private prisma: PrismaService) {}

  async create(ownerId: string, createPostDto: CreatePostDto) {
    if (createPostDto.attachmentIds.length > 0) {
      const profilePictureCount = await this.prisma.post.findMany({
        where: {
          ownerId,
          NOT: {
            attachments: {
              none: {},
            },
          },
        },
      });
      if (profilePictureCount.length === 6) {
        throw new UnprocessableEntityException(
          'You cannot upload more than 6 profile pictures',
        );
      }
    }
    return this.prisma.$transaction(async () => {
      const post = await this.prisma.post.create({
        data: {
          content: createPostDto.content,
          ownerId,
          privacyLevel: createPostDto.privacyLevel,
          isPublished: createPostDto.isPublished,
        },
      });
      const attachmentUpdates = createPostDto.attachmentIds.map((id) =>
        this.prisma.attachment.update({
          where: { id},
          data: {
            postId: post.id,
            isActive: true,
          },
          select: {
            id: true,
            url: true,
          },
        }),
      );
      const resp = await Promise.all(attachmentUpdates);
      return { ...post, attachments: resp };
    });
  }

  update(postId: string, ownerId: string, updatePostDto: UpdatePostDto) {
    return this.prisma.$transaction(async () => {
      const post = await this.prisma.post.updateMany({
        where: {
          id: postId,
          ownerId,
        },
        data: {
          content: updatePostDto.content,
          privacyLevel: updatePostDto.privacyLevel,
          isPublished: updatePostDto.isPublished,
        },
      });
      if (updatePostDto?.attachmentIds?.length > 0) {
        const attachmentUpdates = updatePostDto.attachmentIds?.map?.(
          (attachmentId) =>
            this.prisma.attachment.update({
              where: { id: attachmentId },
              data: {
                postId,
                isActive: true,
              },
              select: {
                id: true,
                url: true,
              },
            }),
        );
        await Promise.all(attachmentUpdates);
      }
      if (updatePostDto?.removedAttachmentIds?.length > 0) {
        const removedAttachments = updatePostDto?.removedAttachmentIds?.map?.(
          (attachmentId) =>
            this.prisma.attachment.update({
              where: { id: attachmentId },
              data: {
                postId,
                isActive: false,
              },
            }),
        );
        await Promise.all(removedAttachments);
      }
      return post;
    });
  }

  remove(ownerId: string, id: string) {
    return this.prisma.post.updateMany({
      where: {
        id,
        ownerId,
      },
      data: {
        isDeleted: true,
      },
    });
  }

  findOne(id: string, requesterId: string) {
    return this.prisma.post.findFirst({
      where: {
        id,
        isDeleted: false,
        OR: [
          {
            ownerId: requesterId,
          },
          {
            privacyLevel: 'PUBLIC',
            isPublished: true,
            owner: {
              isPrivate: false,
            },
          },
        ],
      },
    });
  }

  find(requesterId: string, filters?: ListPostsDto) {
    return this.prisma.post.findMany({
      where: {
        isDeleted: false,
        OR: [
          {
            ownerId: requesterId,
          },
          {
            privacyLevel: 'PUBLIC',
            isPublished: true,
            owner: {
              isPrivate: false,
            },
          },
          {
            ownerId: filters?.userId,
            isPublished: true,
            privacyLevel: {
              not: 'PRIVATE',
            },
            owner: {
              isPrivate: false,
            },
          },
        ],
      },
      include: {
        attachments: {
          select: {
            id: true,
            url: true,
          },
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
    });
  }
}
