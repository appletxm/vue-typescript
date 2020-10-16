import {
  ref,
  computed
} from 'vue'

const counter = ref(0)
const twiceTheCounter = computed(() => counter.value * 2)

counter.value = counter.value + 1
console.log(counter.value) // 1
console.log(twiceTheCounter.value) // 2

function render() {
  return ( <div>999999999</div>)
}
