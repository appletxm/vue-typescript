<template>
  <div>
    <input v-model="search" />
    <input :value="search" @input="search = $event.target.value" />
    <span>Length: {{ length }}</span>
  </div>
</template>

<script>
import { ref, computed } from "@vue/composition-api";

export default {
  setup(props) {
    const search = ref("");
    const length = computed(() => search.value.length);

    return { search, length };
  },
};
</script>