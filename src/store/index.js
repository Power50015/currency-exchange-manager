import { createStore } from "vuex";

export default createStore({
  state() {
    return {
      isLogin: false,
      userType: "",
      userName: "",
      userEmail: "",
      userCompany: "",
      userImg: "",
    };
  },
  mutations: {
    authUser(state, payload) {
      state.isLogin = true;
      state.userType = payload.userType;
      state.userName = payload.userName;
      state.userEmail = payload.userEmail;
      state.userCompany = payload.companyName;
      state.userImg = payload.userImg;
    },
    authLogout(state) {
      state.isLogin = false;
      state.userType = "";
      state.userName = "";
      state.userEmail = "";
      state.userCompany = "";
      state.userImg = "";
    },
  },
  actions: {},
  modules: {},
});
