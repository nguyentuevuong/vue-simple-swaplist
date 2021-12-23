<template>
  <div class="container pt-5">
    <swap-list v-model="model" :filter="true" />
  </div>
</template>

<script>
import SwapList from "./components/swaplist.vue";

const randomId = () => Math.random().toString(36).slice(2, 12);

const mockData = () =>
  [...Array(150).keys()].map(({}, index) => ({
    state: index < 45 ? "left" : "right",
    id: randomId(),
    title: `Options ${index}`,
  }));

export default {
  components: {
    SwapList,
  },
  data: () => ({
    model: mockData(),
  })
};
</script>
