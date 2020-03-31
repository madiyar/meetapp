import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { RoomService } from '../services/room.service';
import { MeetingService } from '../services/meeting.service';
import { Not, Any, In } from "typeorm";

@Controller('rooms')
export class RoomController {

    constructor(
        private readonly service: RoomService,
        private readonly meetingService: MeetingService
    ) {}

    // Все комнаты
    @Get()
    getAll() {
        return this.service.getAll({order: {id: 'ASC'}});
    }

    // Одна комната
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    // Все встречи в этой комнате
    @Get(':id/meetings')
    getMeetings(@Param('id') id: number) {
        return this.meetingService.getAll({where: {roomId: id, isCanceled: 0}});
    }

    // Все комнаты кроме ids: [?, ?, ?]
    @Post('free')
    getFreeRooms(@Body() data) {
        return this.service.getAll({where: {id: Not(In(data.ids))}})
    }

    // Создать комнату
    @Post()
    create(@Body() data) {
        return this.service.create(data);
    }

    // Изменить комнату
    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    // Удалить комнату
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}