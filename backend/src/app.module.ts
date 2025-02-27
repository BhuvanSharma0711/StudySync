import { Module,Scope } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './api/user/user.module';
import { PrismaModule } from './prisma/prisma.module';
import Redis from 'ioredis';
import { FilesModule } from './api/files/files.module';

@Module({
  imports: [UserModule,PrismaModule,FilesModule],
  controllers: [AppController],
  providers: [AppService,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis("redis://localhost:6379");
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    },
  ],
})
export class AppModule {}
