import {Factory, Route} from 'vue-routisan'

Factory.withNameSeparator(' ')

import LandingIndex from '../views/LandingIndex.vue'

Route.view('/', LandingIndex).name('dashboard')


export default Factory.routes()
