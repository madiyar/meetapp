import { Controller, Get, Post, Body, Put, Param, Delete, Next } from "@nestjs/common";
import { UserService } from '../services/user.service';
import { MeetingService } from '../services/meeting.service';
import { ParticipanService } from '../services/participan.service';
// import { getHash } from '../shared/password.util';
// import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {

    constructor(
        private readonly service: UserService,
        private readonly meetingService: MeetingService,
        private readonly participanService: ParticipanService
    ) {}

    // Все пользователи
    @Get()
    getAll() {
        return this.service.getAll();
    }

    // Все администраторы
    @Get('admins')
    getAdmins() {
        return this.service.getAll({where: {isAdmin: 1}});
    }

    // Конкретный пользователь
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    // Встречи организованные этим пользователем
    @Get(':id/meetings/created')
    getCreatedMeetings(@Param('id') id: number) {
        return this.meetingService.getAll({where: {creatorId: id}, order: {startDate: 'DESC'}});
    }

    // Встречи где участвовал пользователь
    @Get(':id/meetings')
    getMeetings(@Param('id') id: number) {
        return this.participanService.getAll({where: {userId: id}, order: {id: 'DESC'}});
    }

    // Добавить пользователя
    @Post()
    create(@Body() data) {
        // bcrypt.hash(data.password, 10, (err, hash) => {
        //     if(err) return;
        //     return this.service.create({...data, password: hash});
        // });
        return this.service.create(data);
    }

    @Post('auth')
    auth(@Body() data) {
        // bcrypt.hash(data.password, 10, (err, hash) => {
        //     if(err) return;
        //     return this.service.getOne({where: {username: data.username, password: hash}});
        // });
        return this.service.getOne({where: {username: data.username, password: data.password}});
    }

    // Редактирование пользователя
    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    // Удалить пользователя
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}