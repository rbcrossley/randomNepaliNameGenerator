import dotenv from "dotenv"

dotenv.config({
    path: "./server/.env",
})

const databaseUrl = process.env.DATABASE_URL
const databaseName = process.env.DATABASE_NAME
const baseApiUrl = process.env.BASE_API_URL

export {
    databaseUrl,
    databaseName,
    baseApiUrl,
}
