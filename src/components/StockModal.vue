<template>
  <div
    class="container absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#053241] md:p-10 flex flex-col gap-5 items-center z-10"
  >
    <h2 class="text-white text-2xl">Add Stock</h2>
    <div
      class="close-btn absolute cursor-pointer transition-all top-7 right-7 translate-x-1/2 -translate-y-1/2 hover:bg-[#28D7BE] hover:text-[#053241] text-[#28D7BE] font-bold text-xl rounded-full w-8 h-8 flex items-center justify-center"
      @click="closeModal"
    >
      X
    </div>
    <div class="input-container w-full flex justify-center">
      <label for="search-input" class="sr-only">Search</label>
      <div class="relative w-3/5">
        <input
          type="text"
          id="search-input"
          class="bg-transparent border border-white text-white text-sm font-semibold rounded-lg focus:ring-blue-500 focus:border-blue-500 block outline-none w-full pl-10 p-2.5"
          placeholder="Search"
          v-model="searchText"
          @input="searchPairs"
        />
        <div
          class="icon-container absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none"
        >
          <svg
            aria-hidden="true"
            class="search-icon w-5 h-5 text-white"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fill-rule="evenodd"
              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
              clip-rule="evenodd"
            ></path>
          </svg>
        </div>
      </div>
      <button
        type="submit"
        class="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        <svg
          class="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          ></path>
        </svg>
        <span class="sr-only">Search</span>
      </button>
    </div>
    <div class="coin-list w-full p-4 grow overflow-y-scroll ::">
      <StockCard
        v-for="(symbol, index) in searchResults"
        :key="index"
        :symbol="symbol"
        :add="!symbol.qty"
      />
    </div>
  </div>
</template>

<script>
import StockCard from "./StockCard.vue";

export default {
  name: "StockModal",
  components: { StockCard },
  data() {
    return {
      searchResults: [],
      searchText: "",
    };
  },
  computed: {
    portfolio() {
      return this.$store.getters["portfolio/getPortfolio"];
    },
  },
  watch: {
    portfolio() {
      this.searchResults = this.updateSearchResults(this.searchResults);
    },
  },
  props: {
    symbols: {
      type: Array,
      required: true,
    },
  },
  methods: {
    closeModal() {
      this.$store.dispatch("global/updateModalStatus", false);
    },
    searchPairs() {
      if (this.searchText) {
        const searchResults = this.symbols.filter((el) =>
          el.symbol.includes(this.searchText.toUpperCase())
        );
        this.searchResults = this.updateSearchResults(searchResults);
      } else {
        this.searchResults = [];
      }
    },
    updateSearchResults(searchResults) {
      return searchResults?.map((el) => {
        const findInPortfolio = this.portfolio?.find(
          (e) => e.symbol === el.symbol
        );
        if (findInPortfolio) {
          return findInPortfolio;
        } else {
          return el;
        }
      });
    },
  },
};
</script>

<style scoped>
.coin-list::-webkit-scrollbar {
  display: none;
}
</style>
