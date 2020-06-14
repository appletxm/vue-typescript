<template>
  <div>
    <h2>{{ formattedMoney }}</h2>
    <input v-model="delta" type="number">
    <button @click="add">Add</button>
  </div>
</template>

<script>
export default {
  data: () => ({
    money: 10,
    delta: 1
  }),
  computed: {
    formattedMoney() {
      return this.money.toFixed(2);
    }
  },
  mounted() {
    console.log("Clock Object mounted!");
  },
  methods: {
    add() {
      this.money += Number(this.delta);
    }
  },
  watch: {
    money(newVal, oldVal) {
      console.log("Money changed", newVal, oldVal);
    }
  }
}
</script>
