import Vue from "vue";

export default {
  state: {
    display: {
      // columnCount: 1,
      columnWidth: 200,
      navBarHeight: 0
    }
  },
  mutations: {
    // setColumnCount(state, columnCount) {
    //   Vue.set(state.display, "columnCount", columnCount);
    // },
    setColumnWidth(state, columnWidth) {
      Vue.set(state.display, "columnWidth", columnWidth);
    },
    setNavBarHeight(state, navBarHeight) {
      Vue.set(state.display, "navBarHeight", navBarHeight);
    }
  },
  actions: {
    setColumnWidth({ commit, dispatch, state }, columnWidth) {
      if (columnWidth < 200) {
        commit("setColumnWidth", 200);
        return;
      };

      commit("setColumnWidth", columnWidth);
      // dispatch("resizeWindow");
    },
    // setColumnCount({ commit, state }) {
    //   let columnCount = Math.floor(window.innerWidth / state.display.columnWidth);
    //   commit("setColumnCount", columnCount);
    // },
    // setUserViewColumnCount({ commit, state }) {
    //   let width = document.getElementById("user-keeps").clientWidth;
    //   let columnCount = Math.floor(width / state.display.columnWidth);
    //   commit("setColumnCount", columnCount);
    // },
    // resizeWindow({ commit, dispatch, state }) {
    //   // Get the current column count
    //   let columnCount = state.display.columnCount;

    //   // Set the column count for the current window size
    //   dispatch("setColumnCount");

    //   // check if the column count changed
    //   if (columnCount == state.display.columnCount) {
    //     return;
    //   };
    //   commit("setColumnCount", columnCount);
    //   dispatch("setKeepsColumns"); // store-modules > keeps.js
    // },
    // resizeUserView({ commit, dispatch, state }) {
    //   // Get the current column count
    //   let columnCount = state.display.columnCount;

    //   // Set the column count for the current window size
    //   dispatch("setUserViewColumnCount");

    //   // check if the column count changed
    //   if (columnCount == state.display.columnCount) {
    //     return;
    //   };
    //   commit("setColumnCount", columnCount);
    //   dispatch("setUserKeepsColumns") // store-modulse > user-keeps.js
    // }
  }

}