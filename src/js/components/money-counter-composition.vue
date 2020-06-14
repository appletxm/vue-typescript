<template>
  <div>
    <h2>{{ formattedMoney }}</h2>
    <input v-model="delta" type="number">
    <button @click="add">Add</button>
  </div>
</template>

<script>
// In Vue 3, you'll import from "vue"
import { ref, computed, watch, onMounted } from "@vue/composition-api";

export default {
  setup() {
    // State
    const money = ref(10);
    const delta = ref(1);

    // Computed props
    const formattedMoney = computed(() => money.value.toFixed(2));

    // Hooks
    onMounted(() => console.log("Clock Object mounted"));

    // Methods
    const add = () => (money.value += Number(delta.value));

    // Watchers
    const moneyWatch = watch(money, (newVal, oldVal) =>
      console.log("Money changed", newVal, oldVal)
    );

    return {
      delta,
      money,
      formattedMoney,
      add,
      moneyWatch
    };
  }
}
</script>
