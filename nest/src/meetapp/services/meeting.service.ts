import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Meeting } from "../entities/Meeting";

@Injectable()
export class MeetingService {

    constructor(
        @InjectRepository(Meeting)
        private readonly repository: Repository<Meeting>
    ) {}

    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    create(data: Meeting) {
        return this.repository.save(data);
    }

    update(id: number, data: Partial<Meeting>) {
        return this.repository.update(id, data);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

}