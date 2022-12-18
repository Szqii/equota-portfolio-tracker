<template>
  <button
    class="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4focus:ring-green-300 font-medium rounded-lg text-sm p-3"
    :disabled="qty === 0"
    @click="addSymbol({ symbol, qty })"
  >
    Add
  </button>
</template>

<script>
export default {
  props: {
    symbol: {
      type: Object,
      required: true,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  methods: {
    addSymbol(payload) {
      this.$store.dispatch("portfolio/add", payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
