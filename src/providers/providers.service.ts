import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { Provider } from '@prisma/client';
import { CreateProviderDto } from './dto/create-provider.dto';
import { UpdateProviderDto } from './dto/update-provider.dto';

@Injectable()
export class ProvidersService {
  constructor(private prisma: PrismaService) {}

  create(createProviderDto: CreateProviderDto) {
    return this.prisma.provider.create({
      data: createProviderDto,
    });
  }

  async findAll(): Promise<Provider[]> {
    return this.prisma.provider.findMany();
  }

  findOne(id: string): Promise<Provider> {
    return this.prisma.provider.findFirst({
      where: {
        id: id,
      },
    });
  }

  update(id: string, updateProviderDto: UpdateProviderDto) {
    const { name, order, isActive } = updateProviderDto;
    return this.prisma.provider.update({
      where: {
        id: id,
      },
      data: {
        name,
        order,
        isActive,
      },
    });
  }

  remove(id: string) {
    return this.prisma.provider.update({
      where: {
        id: id,
      },
      data: {
        isActive: false,
      },
    });
  }
}
