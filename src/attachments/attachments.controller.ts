import {
  Controller,
  Get,
  Post,
  Param,
  UseInterceptors,
  Request,
  UploadedFile,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { ApiBearerAuth, ApiResponse, ApiTags } from '@nestjs/swagger';

import { AmazonS3FileInterceptor } from 'nestjs-multer-extended';

import { JwtAuthGuard } from '../auth/jwt.guard';

import { AttachmentsService } from './attachments.service';
import { AttachmentEntity } from './entities/attachment.entity';

@ApiTags('Post Attachments')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('attachments')
export class AttachmentsController {
  constructor(private readonly attachmentsService: AttachmentsService) {}

  @Post()
  @UseInterceptors(
    AmazonS3FileInterceptor('image', {
      randomFilename: true,
    }),
  )
  create(@Request() req, @UploadedFile() file) {
    if (!file) {
      throw new UnprocessableEntityException('image is required');
    }
    return this.attachmentsService.create(req.user.id, file.Location);
  }

  @Get(':id')
  @ApiResponse({
    status: 200,
    type: AttachmentEntity,
  })
  findOne(@Param('id') id: string) {
    return this.attachmentsService.findOne(id);
  }
}
