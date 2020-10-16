import 'core-js/stable'
import 'regenerator-runtime/runtime'

import { checkString } from './test/test.ts'

import { createApp,
  ref,
  computed
} from 'vue'
import App from './app/index.vue'

const res = checkString(123)

console.info('res:', res)

createApp(App).mount('#app')

// import {
//   ref,
//   computed
// } from 'vue'

// const counter = ref(0)
// const twiceTheCounter = computed(() => counter.value * 2)

// counter.value = counter.value + 1
// console.log(counter.value) // 1
// console.log(twiceTheCounter.value) // 2
