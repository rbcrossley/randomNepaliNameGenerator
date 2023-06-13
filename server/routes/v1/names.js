import express from "express"
const router = express.Router()
import Name from "../../models/Name.js"

router.get('/', async (request, response) => {
    try {
        const names = await Name.find()
        response.send(names)
    } catch (error) {
        await response.status(500)
            .json({
                message: error.message,
            })
    }
})

router.get('/:id', (request, response) => {

})

export {router as namesRouter}
