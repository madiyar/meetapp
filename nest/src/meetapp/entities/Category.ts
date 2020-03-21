import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Room } from './Room';

@Entity({name: 'categories'})
export class Category {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    capacity: number;

    @OneToMany(type => Room, room => room.categoryId)
    rooms: Promise<Room[]>;
    
}