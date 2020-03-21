import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { MeetingService } from "../services/meeting.service";
import { ParticipanService } from "../services/participan.service";

@Controller('meetings')
export class MeetingController {

    constructor(
        private readonly service: MeetingService,
        private readonly participanService: ParticipanService
    ) {}

    // Все встречи
    @Get()
    getAll() {
        return this.service.getAll();
    }

    // Все встречи со свободным входом
    @Get('free-entry')
    getFreeEntry() {
        return this.service.getAll({where: {freeEntry: 1}});
    }

    // Все отмененные встречи
    @Get('canceled')
    getCanceled() {
        return this.service.getAll({where: {canceled: 1}});
    }

    // Информация о встрече
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    // Все участники этой встречи
    @Get(':id/participans')
    getRooms(@Param('id') id: number) {
        return this.participanService.getAll({where: {meetingId: id}});
    }

    // Создать встречу
    @Post()
    create(@Body() data) {
        return this.service.create(data);
    }

    // Изменить встречу
    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    // Удалить встречу
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}