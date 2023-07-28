import {Entity, PrimaryGeneratedColumn, Column, ManyToOne} from "typeorm";
import {School} from "./School";
import {Sound} from "./Sound";

@Entity()
export class Lesson {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    start_hour: number

    @Column()
    start_minute: number

    @Column()
    end_hour: number

    @Column()
    end_minute: number

    @ManyToOne(() => School, (school) => school.lessons)
    school: School

    @ManyToOne(() => Sound, (sound) => sound.lessons)
    sound: Sound
}