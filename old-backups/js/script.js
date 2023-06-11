// This is a stand-alone function to do the 'heavy lifting' of loading a remote
// file into an array.
const load = async (url) => {
    const response = await fetch(url)
    if (!response.ok) throw new Error("Not found")
    const fileContent = await response.text()
    return fileContent.split(/[\n\r]+/)
}

class NameSelector {
    static STATE_LOADING = "loading"
    static STATE_LOADED = "loaded"
    static STATE_ERROR = "error"
    static TTL = 86400000 // 1 day

    femaleNames = []
    maleNames = []
    state = null

    async loadNames(name = "male") {
        try {
            this.state = NameSelector.STATE_LOADING;

            let localStorageItem = LocalStorage.getLocalStorageItem(name + "Names")

            if (localStorageItem) {
                name === "male"
                    ? this.maleNames = await JSON.parse(localStorageItem)
                    : this.femaleNames = await JSON.parse(localStorageItem)
            } else {
                await this.setNames(name)
            }

            this.state = NameSelector.STATE_LOADED
        } catch (e) {
            this.state = NameSelector.STATE_ERROR
            this.error = e
        }
    }

    /**
     * Set the names in the local storage and in the class properties
     * @param name
     * @returns {Promise<void>}
     */
    async setNames(name) {
        // If using these files be sure to respect the terms of use of jsDelivr
        // https://www.jsdelivr.com/terms and the rights of the author at
        // https://github.com/techgaun/nepali-names.
        let response = await load("https://cdn.jsdelivr.net/gh/techgaun/nepali-names/" + name + ".txt")
        LocalStorage.setLocalStorage(name + "Names", JSON.stringify(response), NameSelector.TTL)
        name === "male"
            ? this.maleNames = response
            : this.femaleNames = response
    }
}

class LocalStorage {

    static setLocalStorage(key, value, ttl = null) {
        let item = {
            value: value,
            expiry: ttl ? Date.now() + ttl : null
        }

        localStorage.setItem(key, JSON.stringify(item))
    }

    static getLocalStorageItem(key) {
        let item = localStorage.getItem(key);

        if (!item) return null;

        item = JSON.parse(item);
        if (item.expiry && Date.now() > item.expiry) {
            localStorage.removeItem(key);

            return null;
        }

        return item.value;
    }
}

const nameSelector = new NameSelector()

document.addEventListener("DOMContentLoaded", function () {
    const randomNameGenerator = document.getElementById("button-wrapper")

    //create a button to generate random name
    const generateButton_for_male = document.createElement("button")
    generateButton_for_male.textContent = "Generate Random Male Name"
    generateButton_for_male.classList.add("btn-primary")

    const generateButton_for_female = document.createElement("button")
    generateButton_for_female.textContent = "Generate Random Female Name"
    generateButton_for_female.classList.add("btn-secondary")

    const randomNameDisplay = document.getElementById("name-placeholder")

    generateButton_for_male.addEventListener("click", function () {
        nameSelector
            .loadNames()
            .then(() => {
                const randomIndex = Math.floor(
                    Math.random() * nameSelector.maleNames.length
                )
                randomNameDisplay.textContent = nameSelector.maleNames[randomIndex]
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {y: 0.8},
                })
            })
            .catch((error) => {
                console.error(error)
            })
    })

    generateButton_for_female.addEventListener("click", function () {
        nameSelector
            .loadNames("female")
            .then(() => {
                //console.log(nameSelector.femaleNames);
                //console.log(nameSelector.maleNames);
                const randomIndex = Math.floor(
                    Math.random() * nameSelector.femaleNames.length
                )
                randomNameDisplay.textContent = nameSelector.femaleNames[randomIndex]
                confetti({
                    particleCount: 100,
                    spread: 70,
                    origin: {y: 0.8},
                })
            })
            .catch((error) => {
                console.error(error)
            })
    })
    randomNameGenerator.appendChild(generateButton_for_male)
    randomNameGenerator.appendChild(generateButton_for_female)
})
