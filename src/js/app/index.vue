<template>
  <img src="assets/images/chaxunwujieguo_tu.png"/>
  <h1>Hello Vue 3!</h1>
  <div>Hello, {{ name }}!</div>
  <input v-model="name" />
  <button :disabled="!isNamePresent" @click="submitName">Submit</button>
</template>

<script>
import { ref, computed } from 'vue'

export default {
  setup() {
    const name = ref('')
    const kk = name + ' ook'

    const isNamePresent = computed(() => name.value.length > 0, {
      onTrack(e) {
        // triggered when count.value is tracked as a dependency
        // debugger
        console.log('computed onTrack:', e)
      },
      onTrigger(e) {
        // triggered when count.value is mutated
        // debugger
        console.log('computed onTrigger:', e)
      }
    })

    function submitName() {
      console.log(name.value)
    }

    return {
      name,
      isNamePresent,
      submitName
    }
  },

  renderTracked(event) {
    debugger
  },
  renderTriggered(event) {
    debugger
  }
}
</script>

<style scoped>
img {
  width: 100px;
}
h1 {
  font-family: Arial, Helvetica, sans-serif;
}
</style>
