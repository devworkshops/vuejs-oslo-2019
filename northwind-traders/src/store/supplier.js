import { SuppliersService } from "@/services/NorthwindService.js";

export default {
  state: {
    suppliers: []
  },
  mutations: {
    SET_SUPPLIERS(state, payload) {
      state.suppliers = payload;
    }
  },
  actions: {
    fetchSuppliers({ commit, state }, force) {
      if (state.suppliers.length > 0 && !force) return;
      SuppliersService.getAll()
        .then(r => commit("SET_SUPPLIERS", r.data))
        .catch(err => console.log(err));
    }
  }
};
