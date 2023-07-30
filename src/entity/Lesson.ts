import {Entity, PrimaryGeneratedColumn, Column, ManyToOne, BaseEntity} from "typeorm";
import {School} from "./School";
import {Sound} from "./Sound";
import {ClassRange} from "./ClassRange";

@Entity()
export class Lesson extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    // All time in UTC
    @Column()
    start_hour: number;

    @Column()
    start_minute: number;

    @Column()
    end_hour: number;

    @Column()
    end_minute: number;

    @ManyToOne(() => ClassRange, (class_range) => class_range.lessons)
    class_range: ClassRange;

    static async getLessonsByStartTime(hour, minute){
        return await this.findBy({ start_hour: hour, start_minute: minute });
    }

    static async getLessonsByEndTime(hour, minute){
        return await this.findBy({ end_hour: hour, end_minute: minute });
    }

    getStartSound =  () => {
        return this.class_range.start_sound
    }

    getEndSound =  () => {
        return this.class_range.end_sound
    }
}