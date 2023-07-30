import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, OneToOne, JoinColumn, BaseEntity} from "typeorm";
import {School} from "./School";
import {Lesson} from "./Lesson";
import {Sound} from "./Sound";

@Entity()
export class ClassRange extends BaseEntity  {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @ManyToOne(() => School, (school) => school.class_ranges)
    school: School

    @OneToMany(()=>Lesson, (lesson) => lesson.class_range)
    lessons: Lesson[]

    @ManyToOne(() => Sound)
    start_sound: Sound

    @ManyToOne(() => Sound)
    end_sound: Sound
}