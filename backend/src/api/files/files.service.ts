import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
  constructor(private prisma: PrismaService) {}

  async uploadFile(name: string, tags: string[], uploadedById: string) {
    return this.prisma.file.create({
      data: { name, tags, uploadedById },
    });
  }

  async getFilesForUser(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { interests: true },
    });

    if (!user) {
      throw new Error('User not found');
    }

    return this.prisma.file.findMany({
      where: {
        tags: { hasSome: user.interests },
      },
    });
  }

  async trackFileClick(userId: string, fileId: string) {
    // Find clicked file
    const file = await this.prisma.file.findUnique({
      where: { id: fileId },
      select: { tags: true },
    });

    if (!file) {
      throw new Error('File not found');
    }

    // Update user interests with new tags (merge existing interests)
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        interests: {
          set: Array.from(new Set([...file.tags])),
        },
      },
    });

    // Save click event
    return this.prisma.click.create({
      data: {
        userId,
        fileId,
      },
    });
  }
  async getFileById(userId: string, fileId: string) {
    const file = await this.prisma.file.findUnique({ where: { id: fileId } });
  
    if (!file) {
      throw new Error(`File with ID ${fileId} not found`);
    }
  
    // Register click event
    await this.prisma.click.create({
      data: {
        userId,
        fileId
      }
    });
  
    return file;
  }
  async getAllFiles() {
    return this.prisma.file.findMany(); // Assuming 'file' is your Prisma model
  }
}
