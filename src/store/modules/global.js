const state = () => ({
  isModalOpen: false,
});

const getters = {
  getModalStatus(state) {
    return state.isModalOpen;
  },
};

const actions = {
  updateModalStatus({ commit }, status) {
    commit("setModalStatus", status);
  },
};

const mutations = {
  setModalStatus(state, status) {
    state.isModalOpen = status;
  },
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
};
