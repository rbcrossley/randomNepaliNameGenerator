import express from "express"
import Name from "../../models/Name.js"

const router = express.Router()

router.get('/random', async (request, response) => {
    let gender = request.query.gender ?? 'male'

    const pipelines = [
        { $match: { gender: gender } },
        { $sample: { size: 10 } },
        { $project: { _id: 1, name: 1, name_np: 1, meaning: 1, meaning_np: 1, gender: 1 } }
    ]

    let names = await Name.aggregate(pipelines)

    return response.send(names)
})

export { router as namesRouter }
