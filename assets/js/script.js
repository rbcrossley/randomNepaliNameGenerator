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

  femaleNames = []
  maleNames = []
  state = null

  async loadNames() {
    try {
      this.state = NameSelector.STATE_LOADING
      // If using these files be sure to respect the terms of use of jsDelivr
      // https://www.jsdelivr.com/terms and the rights of the author at
      // https://github.com/techgaun/nepali-names.
      ;[this.femaleNames, this.maleNames] = await Promise.all([
        load("https://cdn.jsdelivr.net/gh/techgaun/nepali-names/female.txt"),
        load("https://cdn.jsdelivr.net/gh/techgaun/nepali-names/male.txt"),
      ])
      this.state = NameSelector.STATE_LOADED
    } catch (e) {
      this.state = NameSelector.STATE_ERROR
      this.error = e
    }
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
        //console.log(nameSelector.femaleNames);
        //console.log(nameSelector.maleNames);
        const randomIndex = Math.floor(
          Math.random() * nameSelector.maleNames.length
        )
        const randomName = nameSelector.maleNames[randomIndex]
        randomNameDisplay.textContent = randomName
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.8 },
        })
      })
      .catch((error) => {
        console.error(error)
      })
  })

  generateButton_for_female.addEventListener("click", function () {
    nameSelector
      .loadNames()
      .then(() => {
        //console.log(nameSelector.femaleNames);
        //console.log(nameSelector.maleNames);
        const randomIndex = Math.floor(
          Math.random() * nameSelector.femaleNames.length
        )
        const randomName = nameSelector.femaleNames[randomIndex]
        randomNameDisplay.textContent = randomName
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.8 },
        })
      })
      .catch((error) => {
        console.error(error)
      })
  })
  randomNameGenerator.appendChild(generateButton_for_male)
  randomNameGenerator.appendChild(generateButton_for_female)
})
