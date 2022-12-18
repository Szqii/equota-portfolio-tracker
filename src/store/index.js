import Vue from "vue";
import Vuex, { Store } from "vuex";
import SymbolsModule from "./modules/symbols";
import PortfolioModule from "./modules/portfolio";
import GlobalModule from "./modules/global";

Vue.use(Vuex);

const store = new Store({
  modules: {
    symbols: SymbolsModule,
    portfolio: PortfolioModule,
    global: GlobalModule,
  },
});

export default store;
