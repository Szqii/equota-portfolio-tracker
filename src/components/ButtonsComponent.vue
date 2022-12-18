<template>
  <div>
    <button
      class="focus:outline-none text-black bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm p-3 mr-3"
      :disabled="qty === 0"
      @click="
        updateSymbol({
          symbol: symbol.symbol,
          qty,
          lastPrice: symbol.lastPrice,
        })
      "
    >
      Update
    </button>
    <button
      class="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm p-3"
      @click="removeSymbol(symbol.symbol)"
    >
      Remove
    </button>
  </div>
</template>

<script>
export default {
  props: {
    symbol: {
      type: Object,
      required: false,
      default: null,
    },
    qty: {
      type: Number,
      required: true,
    },
  },
  methods: {
    removeSymbol(symbol) {
      this.$store.dispatch("portfolio/remove", symbol);
    },
    updateSymbol(payload) {
      this.$store.dispatch("portfolio/update", payload);
    },
  },
};
</script>

<style lang="scss" scoped></style>
