import express from 'express'
import mongoose from "mongoose"
import dotenv from 'dotenv'
import {namesRouter} from "./routes/v1/names.js"

dotenv.config({
    path: "./server/.env",  // This works
    // path: ".env",        // This doesn't work :(
})

const app = express()
const basePath = process.env.BASE_API_URL
const databaseUrl = process.env.DATABASE_URL

mongoose.connect(databaseUrl)
const db = mongoose.connection

db.on("error", console.error.bind(console, "connection error:"))
db.once("open", () => console.log("Connected to MongoDB"))

app.use(express.json())

// Routes
app.use(`${basePath}/names`, namesRouter)

app.listen(3001)
