import axios from "axios";

const http = axios.create({
  baseURL: "https://api2.binance.com/api/v3",
  headers: {
    Accept: "application/json;",
  },
});
const state = () => ({
  symbols: [],
});

const getters = {
  getSymbols(state) {
    return state.symbols;
  },
};

const actions = {
  async updateSymbols({ commit }) {
    await http
      .get("/ticker/24hr")
      .then(async (res) => {
        commit("setSymbols", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },
};

const mutations = {
  setSymbols(state, symbols) {
    state.symbols = [...symbols];
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
