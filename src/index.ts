import 'dotenv/config'
import { AppDataSource } from "./data-source"
import {ConnectionManager} from "./classes/ConnectionManager";
import { NtpTimeSync } from "ntp-time-sync";
import {Lesson} from "./entity/Lesson";

const ws_server_properties = {port: process.env.WS_SERVER_PORT};
const timeSync = NtpTimeSync.getInstance();

AppDataSource.initialize().then(async () => {
    const connectionManager = new ConnectionManager(ws_server_properties);

    const checker = async () => {
        console.log("CHECK");
        const {now} = await timeSync.getTime();

        const hour = now.getHours(),
            minute = now.getMinutes();

        const start_lessons = await Lesson.getLessonsByStartTime(hour, minute),
                end_lessons = await Lesson.getLessonsByEndTime(hour, minute);



        console.log(start_lessons,end_lessons)
    }

    setInterval(checker, 1000);
}).catch(error => console.log(error))


