import { Controller, Get, Post, Body, Put, Param, Delete } from "@nestjs/common";
import { CategoryService } from "../services/category.service";
import { RoomService } from "../services/room.service";

@Controller('categories')
export class CategoryController {

    constructor(
        private readonly service: CategoryService,
        private readonly roomService: RoomService
    ) {}

    // Все категории
    @Get()
    getAll() {
        return this.service.getAll();
    }

    // Одна категория
    @Get(':id')
    getById(@Param('id') id: number) {
        return this.service.getById(id);
    }

    // Все комнаты под этой категорией
    @Get(':id/rooms')
    getRooms(@Param('id') id: number) {
        return this.roomService.getAll({where: {categoryId: id}});
    }

    // Создать категорию
    @Post()
    create(@Body() data) {
        return this.service.create(data);
    }

    // Изменить категорию
    @Put(':id')
    update(@Param('id') id: number, @Body() data) {
        return this.service.update(id, data);
    }

    // Удалить категорию
    @Delete(':id')
    delete(@Param('id') id: number) {
        return this.service.delete(id);
    }

}