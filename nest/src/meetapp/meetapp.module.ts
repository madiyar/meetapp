import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

// Entities
import { Category } from './entities/Category';
import { Meeting } from './entities/Meeting';
import { Participan } from './entities/Participan';
import { Room } from './entities/Room';
import { User } from './entities/User';

// Controllers
import { CategoryController } from './controllers/category.controller';
import { MeetingController } from './controllers/meeting.controller';
import { ParticipanController } from './controllers/participan.controller';
import { RoomController } from './controllers/room.controller';
import { UserController } from './controllers/user.controller';
import { UploaderController } from "./controllers/uploader.controller";

// Services
import { CategoryService } from './services/category.service';
import { MeetingService } from './services/meeting.service';
import { ParticipanService } from './services/participan.service';
import { RoomService } from './services/room.service';
import { UserService } from './services/user.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Category, Meeting, Participan, Room, User]),
    ],
    exports: [TypeOrmModule],
    controllers: [
        CategoryController,
        MeetingController,
        ParticipanController,
        RoomController,
        UserController,
        UploaderController
    ],
    providers: [
        CategoryService,
        MeetingService,
        ParticipanService,
        RoomService,
        UserService
    ]
})
export class MeetAppModule {}