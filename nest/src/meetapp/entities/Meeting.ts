import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm";
import { Room } from "./Room";
import { User } from "./User";
import { Participan } from "./Participan";

@Entity({name: 'meetings'})
export class Meeting {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column({type: 'text'})
    description: string;

    @Column()
    creatorId: number;

    @Column()
    roomId: number;

    @Column({type: 'datetime'})
    startDate: string;

    @Column({type: 'datetime'})
    endDate: string;

    @Column({type: 'boolean', default: 0})
    freeEntry: boolean;

    @Column({type: 'boolean', default: 0})
    isCanceled: boolean;

    @ManyToOne(type => Room, room => room.id)
    room: Room;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @OneToMany(type => Participan, participan => participan.meetingId)
    participans: Promise<Participan[]>;
}