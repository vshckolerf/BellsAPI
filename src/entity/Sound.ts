import {Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn} from "typeorm";
import {School} from "./School";
import {Lesson} from "./Lesson";

@Entity()
export class Sound {
    @PrimaryGeneratedColumn()
    uuid: string;

    @ManyToOne(() => School, (school) => school.sounds)
    school: School

    @OneToMany(()=>Lesson, (lesson) => lesson.sound)
    lessons: Lesson[]
}