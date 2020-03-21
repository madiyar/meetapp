import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Participan } from "../entities/Participan";

@Injectable()
export class ParticipanService {

    constructor(
        @InjectRepository(Participan)
        private readonly repository: Repository<Participan>
    ) {}

    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    create(data: Participan) {
        return this.repository.save(data);
    }

    update(id: number, data: Partial<Participan>) {
        return this.repository.update(id, data);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

}