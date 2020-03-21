import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { TypeOrmModule } from '@nestjs/typeorm';
import { join } from 'path';

// My imports
import { MeetAppModule } from './meetapp/meetapp.module';
import { AppService } from './app.service';
import { AppController } from './app.controller';

// Entities
import { Category } from './meetapp/entities/Category';
import { Meeting } from './meetapp/entities/Meeting';
import { Participan } from './meetapp/entities/Participan';
import { Room } from './meetapp/entities/Room';
import { User } from './meetapp/entities/User';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '127.0.0.1',
      username: 'root',
      password: '',
      database: 'meetapp',
      entities: [Category, Meeting, Participan, Room, User],
      synchronize: false
    }),
    MeetAppModule,
    MulterModule.register({
      dest: './uploads'
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads')
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}