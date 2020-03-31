import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { MeetingService } from "../services/meeting.service";
import { ParticipanService } from "../services/participan.service";
import { Between, MoreThanOrEqual, LessThanOrEqual } from "typeorm";

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

    // Найти все ID's занятых комнат между датами startDate & endDate: 'yyyy-mm-dd HH:ii:ss'
    @Post('find-room')
    findRoom(@Body() data) {
        return this.service.getAll({where: [
            { startDate: Between(data.startDate, data.endDate) },
            { endDate: Between(data.startDate, data.endDate) }
        ]});
    }

    // Сегодняшние встречи
    @Get('today')
    getToday() {
        const today = new Date(Date.now());
        const mm = today.getMonth() + 1;
        const dd = today.getDate();
        const todayString = [today.getFullYear(), (mm>9?'':'0')+mm, (dd>9?'':'0')+dd].join('-');
        return this.service.getAll({where: {
            startDate: Between(todayString+' 00:00:00', todayString+' 23:59:59')
        }});
    }

    // Последние 5 встреч
    @Get('last')
    getLast() {
        return this.service.getAll({where: {canceled: 0}, order: {startDate: "DESC"}, take: 5});
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