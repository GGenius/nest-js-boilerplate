import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'nestjs-redis';
import { ConfigModule } from '@nestjs/config';

import AuthModule from '@components/auth/auth.module';
import UsersModule from '@components/users/users.module';

import AppService from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      url: process.env.MYSQL_URL,
      username: process.env.MYSQL_ROOT_USER,
      password: process.env.MYSQL_PASSWORD,
      entities: ['dist/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    RedisModule.register({
      url: process.env.REDIS_URL,
      onClientReady: async (client): Promise<void> => {
        client.on('error', console.error);
        client.on('ready', () => console.log('redis is running on 6379 port'));
        client.on('restart', () => console.log('attempt to restart the redis server'));
      },
      reconnectOnError: (): boolean => true,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [AppService],
})
export default class AppModule {}