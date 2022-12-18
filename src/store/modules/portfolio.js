const state = () => ({
  portfolio: [],
});

const getters = {
  getPortfolio(state) {
    return state.portfolio;
  },
};

const actions = {
  init({ commit }, payload) {
    let currentPortfolio = [];
    payload.portfolio.forEach((el) => {
      currentPortfolio.push({
        qty: el.qty,
        ...payload.symbols.find((e) => e.symbol === el.symbol),
      });
    });
    commit("setPortfolio", currentPortfolio);
  },
  add({ commit }, symbol) {
    commit("pushToPortfolio", symbol);
  },
  remove({ commit }, symbol) {
    commit("deleteSymbol", symbol);
  },
  update({ commit }, payload) {
    if (parseFloat(payload.qty) === 0) {
      commit("deleteSymbol", payload.symbol);
    } else {
      commit("updateQty", payload);
    }
  },
};

const mutations = {
  deleteSymbol(state, symbol) {
    const idx = state.portfolio.findIndex((el) => el.symbol === symbol);
    if (idx !== -1) {
      state.portfolio[idx].qty = 0;
      state.portfolio.splice(idx, 1);
    }
  },
  updateQty(state, payload) {
    const idx = state.portfolio.findIndex((el) => el.symbol === payload.symbol);
    if (idx !== -1) {
      state.portfolio[idx].qty = payload.qty;
    }
  },
  setPortfolio(state, payload) {
    state.portfolio = payload;
  },
  pushToPortfolio(state, payload) {
    state.portfolio.push({
      ...payload.symbol,
      qty: payload.qty,
    });
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
