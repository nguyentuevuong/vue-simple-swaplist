<template>
  <div class="input-group mb-2">
    <input
      type="text"
      class="form-control"
      placeholder="Type to search..."
      v-on:input="input"
      v-bind:value="value"
    />
    <div class="input-group-append">
      <div class="input-group-text">&#x1F50D;</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: {
      type: String,
      default: () => "",
    },
  },
  methods: {
    input(evt) {
      const vm = this;

      vm.$emit("input", evt.target.value);
    },
  },
};
</script>