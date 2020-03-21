import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { User } from "./User";
import { Meeting } from "./Meeting";

@Entity({name: 'participans'})
export class Participan {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column()
    meetingId: number;

    @ManyToOne(type => User, user => user.id)
    user: User;

    @ManyToOne(type => Meeting, meeting => meeting.id)
    meeting: Meeting;
    
}