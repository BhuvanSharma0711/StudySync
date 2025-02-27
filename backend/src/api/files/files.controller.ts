import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  // Upload a new file
  @Post('upload')
  async uploadFile(
    @Body() { name, tags, uploadedById }: { name: string; tags: string[]; uploadedById: string }
  ) {
    return this.filesService.uploadFile(name, tags, uploadedById);
  }

  @Get('all')
  async getAllFiles() {
    return this.filesService.getAllFiles();
  }
  
  // Get files based on user's interests
  @Get(':userId')
  async getFilesForUser(@Param('userId') userId: string) {
    return this.filesService.getFilesForUser(userId);
  }

  @Post('click')
  async trackFileClick(@Body() { userId, fileId }: { userId: string; fileId: string }) {
    return this.filesService.trackFileClick(userId, fileId);
  }

  @Get('file/:fileId/user/:userId')
  async getFile(@Param('fileId') fileId: string, @Param('userId') userId: string) {
    return this.filesService.getFileById(userId, fileId);
  }
  
}
