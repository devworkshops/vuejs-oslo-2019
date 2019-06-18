import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);
let nextNotificationId = 1;

export default new Vuex.Store({
  state: {
    release: {
      build: "1.0.0",
      environment: "Development"
    },
    healthChecks: [
      { title: "SMTP Check", passed: true },
      { title: "Database Check", passed: true }
    ],
    notifications: []
  },
  mutations: {
    dismissNotification(state, id) {
      state.notifications = state.notifications.filter(n => n.id !== id);
    },
    raiseNotification(state, payload) {
      state.notifications.push({
        id: nextNotificationId++,
        context: payload.context,
        message: payload.message
      });
    }
  },
  actions: {
    raiseSuccessNotification({ commit }, payload) {
      commit("raiseNotification", {
        context: "success",
        message: payload
      });
    },
    raiseErrorNotification({ commit }, payload) {
      commit("raiseNotification", {
        context: "danger",
        message: payload
      });
    }
  },
  getters: {
    failedHealthChecks: state => {
      return state.healthChecks.filter(d => !d.passed).length;
    },
    notificationCount: state => {
      return state.notifications.length;
    }
  }
});
