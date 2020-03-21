import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../entities/User";

@Injectable()
export class UserService {

    constructor(
        @InjectRepository(User)
        private readonly repository: Repository<User>
    ) {}

    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    getOne(criteria = {}) {
        return this.repository.findOne(criteria);
    }

    create(data: User) {
        return this.repository.save(data);
    }

    update(id: number, data: Partial<User>) {
        return this.repository.update(id, data);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

}