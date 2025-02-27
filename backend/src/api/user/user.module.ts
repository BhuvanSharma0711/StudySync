import { Module,Scope } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import Redis from 'ioredis';
import { ConfigModule, ConfigService } from '@nestjs/config';

console.log('REDIS_URL:', process.env.REDIS_URL);

@Module({
  imports: [ConfigModule],
  controllers: [UserController],
  providers: [UserService,ConfigService,
    {
      provide: 'REDIS',
      useFactory: () => {
        const client = new Redis("redis://localhost:6379");
        client.on('error', (err) => console.error('Redis error', err));
        return client;
      },
      scope: Scope.DEFAULT,
    }
  ],
  exports: [UserService, ConfigService],
})
export class UserModule {}
