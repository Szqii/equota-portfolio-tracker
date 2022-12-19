<template>
  <div
    class="symbol-card text-white border-b p-3 flex justify-between items-center w-full"
  >
    <div class="symbol-desc flex flex-col">
      <div class="flex flex-col gap-2 text-sm sm:text-md sm:flex-row">
        <h3>{{ symbol.symbol }} -</h3>
        <h4 v-if="weightedAvgPrice">
          {{ symbol.lastPrice }} - {{ symbol.weightedAvgPrice }}
        </h4>
      </div>
      <span>Current quantity: {{ symbol.qty ? symbol.qty : 0 }}</span>
    </div>

    <div class="flex justify-end items-center">
      <input
        type="number"
        class="outline-none p-2 bg-transparent border border-white rounded w-1/4 max-h-11"
        :min="1"
        placeholder="Quantity"
        v-model.number="qty"
      />
      <div class="">
        <AddButton v-if="add" :qty="qty" :symbol="symbol" />
        <ButtonsComponent v-else :qty="qty" :symbol="symbol" />
      </div>
      <slot name="actions" />
    </div>
  </div>
</template>

<script>
import AddButton from "./AddButtonComponent.vue";
import ButtonsComponent from "./ButtonsComponent.vue";
export default {
  components: {
    AddButton,
    ButtonsComponent,
  },
  props: {
    symbol: {
      type: Object,
      required: false,
      default: null,
    },
    weightedAvgPrice: {
      type: Boolean,
      required: false,
      default: false,
    },
    add: {
      type: Boolean,
      required: false,
      default: false,
    },
    update: {
      type: Boolean,
      required: false,
      default: false,
    },
    remove: {
      type: Boolean,
      required: false,
      default: false,
    },
  },
  data() {
    return {
      qty: 1,
    };
  },
};
</script>

<style lang="scss" scoped></style>
