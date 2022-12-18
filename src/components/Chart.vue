<template>
  <div class="h-full flex items-center justify-center">
    <Pie :data="chartData" v-if="pieChartToggle" />
    <Bar :data="chartData" v-else />
    <div class="absolute bottom-10 left-10 flex items-center">
      <span class="mr-3 text-sm font-medium text-gray-900 dark:text-gray-300"
        >Bar Chart</span
      >
      <label class="inline-flex relative items-center cursor-pointer">
        <input type="checkbox" v-model="pieChartToggle" class="sr-only peer" />
        <div
          class="w-14 h-7 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[4px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-6 after:w-6 after:transition-all peer-checked:bg-blue-600"
        ></div>
        <span class="ml-3 text-sm font-medium text-gray-900 dark:text-gray-300"
          >Pie Chart</span
        >
      </label>
    </div>
  </div>
</template>

<script>
import { Chart as PieChartJS, ArcElement } from "chart.js";
import {
  Chart as BarChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Pie, Bar } from "vue-chartjs";

PieChartJS.register(ArcElement, Tooltip, Legend);
BarChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export default {
  name: "PieChart",
  components: { Pie, Bar },
  data() {
    return {
      pieChartToggle: true,
      chartData: {
        labels: [],
        datasets: [
          {
            label: "",
            backgroundColor: "",
            data: [],
          },
        ],
      },
    };
  },

  computed: {
    portfolio() {
      return this.$store.getters["portfolio/getPortfolio"];
    },
  },
  watch: {
    portfolio: {
      intemmediate: true,
      deep: true,
      handler() {
        this.chartData = this.updateChartData();
      },
    },
  },

  methods: {
    updateChartData() {
      const labels = [];
      const data = [];
      this.portfolio.forEach((el) => {
        labels.push(el.symbol);
        data.push(el.qty);
      });
      return {
        labels,
        datasets: [
          {
            label: "Quantity",
            backgroundColor: this.genHexString(data),
            data,
          },
        ],
      };
    },
    genHexString(data) {
      const bgColorArray = [];
      data.forEach(() => {
        let output = "";
        for (let i = 0; i < 6; ++i) {
          output += Math.floor(Math.random() * 16).toString(16);
        }
        bgColorArray.push(`#${output}`);
      });

      return bgColorArray;
    },
  },
};
</script>
