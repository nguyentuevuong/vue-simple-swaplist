<template>
  <div class="row">
    <div class="col-5">
      <search-box v-if="filter" v-model="leftFilter" />
      <template v-else />
      <select
        title="Left panel"
        class="custom-select"
        multiple
        size="10"
        v-model="leftSelecteds"
        v-on:click="() => (rightSelecteds = [])"
      >
        <option
          v-for="item in leftDataSources"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          {{ item.title }}
        </option>
      </select>
    </div>
    <div class="col-2 d-flex align-items-center">
      <div class="box w-100">
        <div class="mb-2 mt-2">
          <button
            class="btn btn-block btn-primary"
            v-on:click="addOneLeft"
            v-bind:disabled="!leftSelecteds.length"
          >
            &rtrif;
          </button>
        </div>
        <div class="mb-5">
          <button
            class="btn btn-block btn-primary"
            v-on:click="addAllLeft"
            v-bind:disabled="!leftDataSources.length"
          >
            &rtrif;&rtrif;
          </button>
        </div>
        <div class="mb-2">
          <button
            class="btn btn-block btn-primary"
            v-on:click="addAllRight"
            v-bind:disabled="!rightDataSources.length"
          >
            &ltrif;&ltrif;
          </button>
        </div>
        <div class="mb-2">
          <button
            class="btn btn-block btn-primary"
            v-on:click="addOneRight"
            v-bind:disabled="!rightSelecteds.length"
          >
            &ltrif;
          </button>
        </div>
      </div>
    </div>
    <div class="col-5">
      <search-box v-if="filter" v-model="rightFilter" />
      <template v-else />
      <select
        title="Right panel"
        class="custom-select"
        multiple
        size="10"
        v-model="rightSelecteds"
        v-on:click="() => (leftSelecteds = [])"
      >
        <option
          v-for="item in rightDataSources"
          v-bind:key="item.id"
          v-bind:value="item.id"
        >
          {{ item.title }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
import SearchBox from "./searchbox.vue";
const cloneDeep = (items) =>
  items.map(({ id, state, title }) => ({ id, state, title }));

export default {
  components: {
    SearchBox,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    filter: {
      type: Boolean,
      default: () => false,
    },
  },
  computed: {
    leftDataSources() {
      const vm = this;
      const { value, leftFilter } = vm;

      return value.filter(
        ({ state, title }) => state === "left" && title.includes(leftFilter)
      );
    },
    rightDataSources() {
      const vm = this;
      const { value, rightFilter } = vm;

      return value.filter(
        ({ state, title }) => state === "right" && title.includes(rightFilter)
      );
    },
  },
  data: () => ({
    leftFilter: "",
    rightFilter: "",
    leftSelecteds: [],
    rightSelecteds: [],
  }),
  methods: {
    addOneLeft() {
      const vm = this;
      const { value, leftSelecteds } = vm;

      const items = cloneDeep(value);

      items.forEach((item) => {
        if (leftSelecteds.includes(item.id)) {
          item.state = "right";
        }
      });

      vm.$emit("input", items);

      vm.rightSelecteds = [...leftSelecteds];
      vm.leftSelecteds = [];
    },
    addAllLeft() {
      const vm = this;
      const { value } = vm;

      const items = cloneDeep(value);

      items.forEach((item) => {
        item.state = "right";
      });

      vm.$emit("input", items);

      vm.leftSelecteds = [];
      vm.rightSelecteds = [];
    },

    addOneRight() {
      const vm = this;
      const { value, rightSelecteds } = vm;

      const items = cloneDeep(value);

      items.forEach((item) => {
        if (rightSelecteds.includes(item.id)) {
          item.state = "left";
        }
      });

      vm.$emit("input", items);

      vm.leftSelecteds = [...rightSelecteds];
      vm.rightSelecteds = [];
    },

    addAllRight() {
      const vm = this;
      const { value } = vm;

      const items = cloneDeep(value);

      items.forEach((item, index) => {
        item.state = "left";
      });

      vm.$emit("input", items);

      vm.leftSelecteds = [];
      vm.rightSelecteds = [];
    },
  },
};
</script>

<style scoped>
select.custom-select[multiple],
select.custom-select[size]:not([size="1"]) {
  padding: 0;
  padding-right: 0;
  min-height: 382px;
}

select.custom-select option {
  padding: 10px 10px;
}
</style>
