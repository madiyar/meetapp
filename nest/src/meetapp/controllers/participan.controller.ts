import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { ParticipanService } from "../services/participan.service";

@Controller('participans')
export class ParticipanController {

    constructor(
        private readonly service: ParticipanService
    ) {}

    @Get()
    getAll() {
        return this.service.getAll();
    }

    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    @Post()
    create(@Body() data) {
        return this.service.create(data);
    }

    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}