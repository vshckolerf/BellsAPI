import { BaseEntity, Entity, PrimaryGeneratedColumn, Column } from "typeorm";
import { createHash } from "crypto";

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

    // sha256(UUID+SECRET+random)
    static async authorizate(uuid : string, random : string, token : string) : Promise<boolean> {
        const school = await this.findOneBy({uuid:uuid});
        const unhash = school.uuid + school.auth_secret + random
        const hash = createHash('sha256').update(unhash).digest('hex');
        return hash === token;
    }
}
