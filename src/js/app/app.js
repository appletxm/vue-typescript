import { reactive, watchEffect } from 'vue'

const state = reactive({
  count: 0
})

console.info(state)

watchEffect(() => {
  document.body.innerHTML = `count is ${state.count}`
})

function increment() {
  state.count = state.count + 1
}

document.body.addEventListener('click', increment)