import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Category } from "../entities/Category";

@Injectable()
export class CategoryService {

    constructor(
        @InjectRepository(Category)
        private readonly repository: Repository<Category>
    ) {}

    getAll(criteria = {}) {
        return this.repository.find(criteria);
    }

    getById(id: number) {
        return this.repository.findOne(id);
    }

    create(data: Category) {
        return this.repository.save(data);
    }

    update(id: number, data: Partial<Category>) {
        return this.repository.update(id, data);
    }

    delete(id: number) {
        return this.repository.delete(id);
    }

}