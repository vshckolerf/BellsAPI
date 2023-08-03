import 'dotenv/config'
import {AppDataSource} from "./data-source"
import {ConnectionManager} from "./classes/ConnectionManager";
import {NtpTimeSync} from "ntp-time-sync";
import {Lesson} from "./entity/Lesson";

const ws_server_properties = {port: process.env.WS_SERVER_PORT};
const timeSync = NtpTimeSync.getInstance();

const getTime = async () => {
    let now = new Date()
    try{
        const ntpTime = await timeSync.getTime();
        now = ntpTime.now
    } catch (e) {
        console.error("NTP", e);
    }
    const hour = now.getHours();
    const minute = now.getMinutes();
    const seconds = now.getSeconds();

    console.log({hour, minute, seconds})
    return {hour, minute, seconds};
}

AppDataSource.initialize().then(async () => {
    const getSoundsByTime = async ({hour, minute}) => {
        const start_lessons = await Lesson.getLessonsByStartTime(hour, minute);
        const end_lessons = await Lesson.getLessonsByEndTime(hour, minute);

        console.log("lessons",start_lessons,end_lessons)

        const start_sounds = start_lessons.map(l => l.class_range.start_sound);
        const end_sounds = end_lessons.map(l=> l.class_range.end_sound);

        return start_sounds.concat(end_sounds);
    }
    const check = async () => {
        const time = await getTime();
        const sounds = await getSoundsByTime(time);
        sounds.map(async (sound) => {
            const school_uuid = sound.school.uuid;
            console.log(school_uuid, "PLAY "+ sound.uuid)
            await connectionManager.sendToSchool(school_uuid, "PLAY "+ sound.uuid)
        });

        const preSounds = await getSoundsByTime({hour: time.hour, minute: time.minute + 1});
        preSounds.map(async (sound) => {
            const school_uuid = sound.school.uuid;
            console.log(school_uuid, "WARN "+ sound.uuid)
            await connectionManager.sendToSchool(school_uuid, "WARN "+ sound.uuid)
        });
    }

    const connectionManager = new ConnectionManager(ws_server_properties, ()=> {
        getTime().then(({seconds})=>{
            setTimeout(()=>{
                console.log("Успешный запуск")
                check()
                setInterval(check, 60000);
            },seconds == 0 ? 1 : (60 - seconds) * 1000);
        })
    });
}).catch(console.error)


