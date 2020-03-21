import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Room } from "../entities/Room";

@Injectable()
export class RoomService {

    constructor(
        @InjectRepository(Room)
        private readonly repository: Repository<Room>
    ) {}

    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    create(data: Room) {
        return this.repository.save(data);
    }

    update(id: number, data: Partial<Room>) {
        return this.repository.update(id, data);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

}