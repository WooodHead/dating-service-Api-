import { Injectable, UnprocessableEntityException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTopicDto } from './dto/create-topic.dto';
import { QueryTopicDto } from './dto/query-topic.dto';

@Injectable()
export class TopicsService {
  constructor(private prisma: PrismaService) {}

  async create(createTopicDto: CreateTopicDto) {
    const { title, content, endDate} = createTopicDto
    const createTopic = await this.prisma.topic.create({
      data: {
       title,
       content,
       endDate: new Date(endDate)
      },
      select: {
        id: true,
        title: true,
        endDate: true,
      },
    });
    if (!createTopic.id) {
      throw new UnprocessableEntityException('Topic is not created!');
    }
    return createTopic;
  }


  findAll(query: QueryTopicDto) {
    
    const today = new Date();
    return this.prisma.topic.findMany({
      where: {
        endDate: {
          gte: today,
        },
      },
      skip: +query.offset || 0,
      take: +query.limit || 50,
    });
  }

  remove(topicId: string){
    return this.prisma.topic.delete({
      where: {
        id: topicId
      }
    })
  }
}
