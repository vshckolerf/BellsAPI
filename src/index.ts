import 'dotenv/config'
import { AppDataSource } from "./data-source"
import {ConnectionManager} from "./classes/ConnectionManager";
import { NtpTimeSync } from "ntp-time-sync";
import {Lesson} from "./entity/Lesson";

const ws_server_properties = {port: process.env.WS_SERVER_PORT};
const timeSync = NtpTimeSync.getInstance();

const getTime = async () => {
    const now = new Date()
    try{
        const {now} = await timeSync.getTime();
    } catch (e) {
        // console.error("NTP", e);
    }
    const hour = now.getHours();
    const minute = now.getMinutes();

    console.log({hour, minute})
    return {hour, minute};
}

AppDataSource.initialize().then(async () => {
    const check = async () => {
        const {hour, minute} = await getTime();

        const start_lessons = await Lesson.getLessonsByStartTime(hour, minute);
        const end_lessons = await Lesson.getLessonsByEndTime(hour, minute);

        console.log("lessons",start_lessons,end_lessons)

        const start_sounds = start_lessons.map(l => l.class_range.start_sound);
        const end_sounds = end_lessons.map(l=> l.class_range.end_sound);

        const sounds = start_sounds.concat(end_sounds);

        sounds.map(async (sound) => {
            const school_uuid = sound.school.uuid;
            console.log(school_uuid, "PLAY "+ sound.uuid)
            await connectionManager.sendToSchool(school_uuid, "PLAY "+ sound.uuid)
        });
    }

    const connectionManager = new ConnectionManager(ws_server_properties, ()=> {
        console.log("Успешный запуск")
        setInterval(check, 1000);
    });
}).catch(console.error)


