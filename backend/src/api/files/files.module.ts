import { Module,Scope } from '@nestjs/common';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [ConfigModule],
  controllers: [FilesController],
  providers: [FilesService,ConfigService],
  exports: [FilesService, ConfigService],
})
export class FilesModule {}
