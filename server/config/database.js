import mongoose from "mongoose"
import { closeMongooseConnection, initMongooseConnection } from "./mongoose.js"
import { chalkLog } from "../utils/chalk-log.js"

export const connect = async () => {
    initMongooseConnection()
    const db = mongoose.connection

    db.once("open", () => chalkLog("Connected to MongoDB", "success"))
    db.on("error", console.error.bind(console, "connection error:"))
}

export const close = () => {
    closeMongooseConnection()
}
