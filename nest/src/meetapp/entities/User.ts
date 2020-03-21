import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Meeting } from "./Meeting";
import { Participan } from "./Participan";

@Entity({name: 'users'})
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    username: string;

    @Column()
    password: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    phone: string;

    @Column({unique: true})
    email: string;

    @Column({type: 'boolean', default: 0})
    isAdmin: boolean;

    @OneToMany(type => Meeting, meeting => meeting.creatorId)
    meetings: Promise<Meeting[]>;

    @OneToMany(type => Participan, participan => participan.meetingId)
    participans: Promise<Participan[]>;

}