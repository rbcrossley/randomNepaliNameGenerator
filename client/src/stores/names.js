import { defineStore } from "pinia"
import axios from "axios"
import _remove from 'lodash/remove.js'

export const useNameStore = defineStore('names', {
    state: () => ({
        currentName: {
            name: "Random Name",
            name_np: "",
            meaning: "",
            meaning_np: "",
        },
        previousNames: [],
        randomNames: [],
        currentGender: "male"
    }),
    getters: {
        previousName: (state) => {
            return state.previousNames[state.previousNames.length - 1]
        },
        nextName: (state) => {
            return state.previousNames[0]
        }
    },
    actions: {
        getRandomName(gender = "male") {
            const url = import.meta.env.VITE_API_URL

            this.currentGender = gender

            return new Promise((resolve, reject) => {
                return axios.get(url + "/names/random", { params: { gender } })
                    .then((response) => {

                        let randomName = response.data[Math.floor(Math.random() * response.data.length)]
                        this.currentName = randomName

                        this.randomNames = response.data.filter((name) => {
                            return name._id !== randomName._id
                        })

                        this.setPreviousName(randomName)

                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        },
        removeItemFromRandomNames(_id) {
            _remove(this.randomNames, (name) => {
                return name._id === _id
            })
        },
        setCurrentName(name) {
            this.currentName = name
        },
        setPreviousName(name) {
            if (this.previousNames.length >= 10) {
                this.previousNames.shift()
            }

            this.previousNames.push(name)
        }
    }
})
