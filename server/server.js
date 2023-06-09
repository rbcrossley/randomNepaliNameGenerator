import express from 'express'
import {namesRouter} from "./routes/v1/names.js"
import * as Database from "./config/database.js"
import {baseApiUrl, port} from "./config/dotenv.js"
import cors from "cors"

const app = express()



app.use(express.json())     // to support JSON-encoded bodies
app.use(cors())             // to allow cross-origin requests

// Routes
app.use(`${baseApiUrl}/names`, namesRouter)

app.listen(port, async () => {
    console.log(`Server listening at http://localhost:${port}`)
    await Database.connect()
})

export default app
