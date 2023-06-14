import * as NameSeeder from "./NameSeeder.js"
import * as Database from "../config/database.js"
import {chalkLog, LOG_TYPE} from "../utils/chalk-log.js"

Database.connect()

const run = async () => {
    await NameSeeder.run()
}

run()
    .then(() => {
        chalkLog("Seeding completed successfully", LOG_TYPE.SUCCESS)
        Database.close()
        process.exit()
    })
    .catch(e => {
        chalkLog(e.message, LOG_TYPE.ERROR)
        Database.close()
        process.exit()
    })
