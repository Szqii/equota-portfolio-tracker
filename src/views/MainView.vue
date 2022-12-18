<template>
  <div>
    <Transition name="fade" appear>
      <StockModal v-show="isModalOpen" :symbols="symbols" />
    </Transition>
    <div class="container mx-auto flex flex-col">
      <div class="button-container w-100 border-b border-white py-6">
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
          @click="showModal"
        >
          {{ portfolio.length === 0 ? "Add Stock" : "Add / Update" }}
        </button>
        <button
          class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          @click="refresh"
        >
          Refresh
        </button>
      </div>
      <div class="stock-container flex h-[95%] grow overflow-hidden">
        <div class="stock flex-1 border-r border-white p-3 mt-5">
          <template v-if="portfolio.length === 0">
            <div class="flex items-center justify-center">
              <h2 class="text-white">
                Add coins to your portfolio to see them here.
              </h2>
            </div>
          </template>
          <template v-else>
            <div class="stock-card-list h-full overflow-y-scroll">
              <StockCard
                v-for="(symbol, index) in portfolio"
                :key="index"
                :symbol="symbol"
                :add="false"
                weightedAvgPrice
              />
            </div>
          </template>
        </div>
        <div class="pie-chart max-h-full flex-1 p-16 relative">
          <Chart />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import StockModal from "@/components/StockModal.vue";
import StockCard from "@/components/StockCard.vue";
import Chart from "@/components/Chart.vue";

export default {
  name: "MainView",
  components: {
    StockModal,
    StockCard,
    Chart,
  },
  methods: {
    showModal() {
      this.$store.dispatch("global/updateModalStatus", true);
    },

    async refresh() {
      await this.$store.dispatch("symbols/updateSymbols");
      await this.$store.dispatch("portfolio/init", {
        portfolio: this.portfolio,
        symbols: this.symbols,
      });
    },
  },

  async created() {
    await this.$store.dispatch("symbols/updateSymbols");
    const portfolio = JSON.parse(localStorage.getItem("portfolio"));
    if (portfolio) {
      this.$store.dispatch("portfolio/init", {
        portfolio: portfolio,
        symbols: this.symbols,
      });
    }
  },

  async mounted() {
    window.setInterval(() => {
      this.refresh();
    }, 1000 * 20 * 60);
  },

  computed: {
    symbols() {
      return this.$store.getters["symbols/getSymbols"];
    },
    portfolio() {
      return this.$store.getters["portfolio/getPortfolio"];
    },
    isModalOpen() {
      return this.$store.getters["global/getModalStatus"];
    },
  },

  watch: {
    portfolio: {
      intemmediate: true,
      deep: true,
      handler() {
        localStorage.setItem("portfolio", JSON.stringify(this.portfolio));
      },
    },
  },
};
</script>

<style scoped>
.container {
  height: calc(100vh - 10rem);
}

.stock-card-list::-webkit-scrollbar {
  display: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease-in-out;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
