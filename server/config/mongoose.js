import mongoose from "mongoose"
import {databaseUrl, databaseName} from "./dotenv.js"
import {chalkLog} from "../utils/chalk-log.js"

export const initMongooseConnection = () => {
    mongoose.connect(databaseUrl + databaseName)
}

export const closeMongooseConnection = () => {
    mongoose.connect(databaseUrl + databaseName)
    mongoose.connection.close()
    chalkLog("Disconnected from MongoDB", "success")
}
