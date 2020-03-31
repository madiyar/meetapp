import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Category } from './Category';
import { Meeting } from "./Meeting";

@Entity({name: 'rooms'})
export class Room {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    photo: string;

    @Column()
    location: string;

    @Column()
    categoryId: number;

    @ManyToOne(type => Category, category => category.id, {eager: true})
    category: Category;

    @OneToMany(type => Meeting, meeting => meeting.roomId)
    meetings: Promise<Meeting[]>;

}