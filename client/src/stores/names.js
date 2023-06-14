import { defineStore } from "pinia"
import axios from "axios"

export const useNameStore = defineStore('names', {
    state: () => ({
        currentName: {
            name: "Random Name",
            name_np: "",
            meaning: "",
            meaning_np: "",
        },
        previousNames: [],
        names: [],
    }),
    getters: {
        previousName: (state) => {
            return state.previousNames[state.previousNames.length - 1]
        },
    },
    actions: {
        getRandomName(gender = "male") {
            const url = import.meta.env.VITE_API_URL

            return new Promise((resolve, reject) => {
                return axios.get(url + "/names/random", { params: { gender } })
                    .then((response) => {
                        this.currentName = response.data

                        if (this.previousNames.length >= 10) {
                            this.previousNames.shift()
                        }

                        this.previousNames.push(response.data)
                        resolve(response)
                    })
                    .catch((error) => {
                        reject(error)
                    })
            })
        }
    }
})
