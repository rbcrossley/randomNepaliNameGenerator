import mongoose from "mongoose"
import {databaseUrl, databaseName} from "./dotenv.js"
import {chalkLog} from "../utils/chalk-log.js"

const databaseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}

export const initMongooseConnection = () => {
    mongoose.connect(databaseUrl + databaseName, databaseOptions)
}

export const closeMongooseConnection = () => {
    mongoose.connect(databaseUrl + databaseName, databaseOptions)
    mongoose.connection.close()
    chalkLog("Disconnected from MongoDB", "success")
}
