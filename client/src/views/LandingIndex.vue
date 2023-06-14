<script setup>
import { computed, ref } from "vue"
import confetti from "canvas-confetti"

import { useNameStore } from "../stores/names.js"

import BottomBgElement from "../components/Abstract/BottomBgElement.vue"
import SolidButton from "../components/FormElements/SolidButton.vue"

// Names Related
const nameStore = useNameStore()

const currentName = computed(() => nameStore.currentName)
const previousNames = computed(() => nameStore.previousNames)
const randomNames = computed(() => nameStore.randomNames)
const currentGender = computed(() => nameStore.currentGender)

const getRandomName = async (gender = "male") => {

  previousCount.value = 2

  if (randomNames.value.length > 0 && currentGender.value === gender) {
    let newRandomName = randomNames.value[Math.floor(Math.random() * randomNames.value.length)]
    nameStore.removeItemFromRandomNames(newRandomName._id)
    nameStore.setPreviousName(newRandomName)
    nameStore.setCurrentName(newRandomName)

    playConfetti()

    return
  }

  await nameStore.getRandomName(gender)
    .then(() => {
      playConfetti()
    })
}


const previousCount = ref(2)

const getPreviousName = () => {
  if (previousCount.value > previousNames.value.length) {
    return
  }

  let previousName = previousNames.value[previousNames.value.length - previousCount.value]
  if (previousName) {
    nameStore.setCurrentName(previousName)
    previousCount.value++
  }
}

const getNextName = () => {
  if (previousCount.value === 2) {
    return
  }

  previousCount.value--
  let previousName = previousNames.value[previousNames.value.length - (previousCount.value - 1)]
  if (previousName) {
    nameStore.setCurrentName(previousName)
  }
}

const playConfetti = () => {
  confetti({
    particleCount: 100,
    spread: 70,
    origin: { y: 0.8 },
  })
}
</script>

<template>
  <div class="relative px-6 lg:px-8">
    <div class="mx-auto max-w-3xl py-32 sm:py-48 lg:py-56">
      <div class="hidden sm:mb-8 sm:flex sm:justify-center">
        <div class="relative rounded-full py-1 px-3 text-sm leading-6 text-gray-600 dark:text-gray-300 ring-1 ring-gray-900/10 dark:ring-gray-500/50 hover:ring-gray-900/20">
          Nepali Baby Name generator from Parent's Name
          <a class="font-semibold text-indigo-600 ml-2" href="#">
            <span aria-hidden="true" class="absolute inset-0"></span>
            Coming Soon
            <span aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
      <div class="text-center">
        <h1 class="text-4xl font-bold tracking-tight text-gray-900 dark:text-gray-200 sm:text-6xl">Random Nepali Names</h1>

        <div class="mt-8">
          <div class="w-full max-w-2xl mx-auto border-2 border-dashed dark:border-gray-500/50 rounded-lg h-32 p-8 flex items-center justify-center">
            <span id="name-placeholder" class="text-5xl text-black dark:text-white">
              <span>{{ currentName.name }}</span>
            </span>
          </div>
        </div>

        <div class="mt-8 flex flex-col md:flex-row items-center justify-center gap-y-3 gap-x-6">
          <SolidButton title="Generate Male Name" @click="getRandomName('male')"/>
          <SolidButton button-type="secondary" title="Generate Female Name" @click="getRandomName('female')"/>
        </div>

        <div class="mt-4 flex flex-col md:flex-row items-center justify-center gap-y-3 gap-x-6">
          <SolidButton
            v-if="previousNames.length > 1 && previousCount !== previousNames.length + 1"
            button-type="transparent"
            class="md:!w-40 w-full btn dark:bg-black border-transparent dark:border-gray-100/30 dark:text-white"
            @click="getPreviousName"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
            <span>Previous</span>
          </SolidButton>

          <SolidButton
            v-if="previousCount !== 2"
            button-type="transparent"
            class="md:!w-40 w-full btn dark:bg-black border-transparent dark:border-gray-100/30 dark:text-white"
            @click="getNextName"
          >
            <span>Next</span>
            <svg aria-hidden="true" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </SolidButton>
        </div>

      </div>
    </div>

    <BottomBgElement/>

  </div>
</template>
