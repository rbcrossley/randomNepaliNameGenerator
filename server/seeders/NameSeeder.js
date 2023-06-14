import Name from "../models/Name.js"

import femaleNames from "../data/filtered-female-names.json" assert {type: "json"}
import maleNames from "../data/filtered-male-names.json" assert {type: "json"}
import chalk from "chalk"
import {chalkLog} from "../utils/chalk-log.js"

export async function run() {
    try {
        await Name.deleteMany()
        chalkLog("Names collection cleared", "info")

        await Name.insertMany(maleNames)
        console.log(chalk.green("Male Names Seeded Successfully"))

        await Name.insertMany(femaleNames)
        console.log(chalk.green("Female Names Seeded Successfully"))
    } catch (error) {
        console.log(error.message)
    }
}
