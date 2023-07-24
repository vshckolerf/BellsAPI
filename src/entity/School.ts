import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import bcrypt from "bcrypt";

@Entity()
export class School extends BaseEntity {
    @PrimaryGeneratedColumn("uuid")
    uuid: string;

    @Column()
    name: string;

    @Column()
    director_id: number;

    @Column()
    auth_secret: string;

    // bcrypt(UUID+SECRET+random)
    static async authorizate(uuid : string, random : string, token : string) : Promise<boolean> {
        const school = await this.findOneBy({uuid:uuid});
        return await bcrypt.compare(school.uuid + school.auth_secret + random, token);
    }
}
