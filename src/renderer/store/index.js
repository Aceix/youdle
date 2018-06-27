import Vue from 'vue';
import Vuex from 'vuex';
import url from 'url';

Vue.use(Vuex);

const store = new Vuex.Store({
  state: {
    busy: true,
    currentDownloadURL: ''
  },
  getters: {
    getCurrentDownloadURL: state => state.currentDownloadURL
  },
  mutations: {
    setBusy(state, b){
      state.busy = true;
    },
    setCurrentDownloadURL(state, u){
      // confirm its a valid Youtube URL
      const tmp = new url.URL(url);
      if(tmp && tmp.hostname == 'youtube.com')
        state.currentDownloadURL = t.href;
      else
        return false;
    }
  }
});

export default store;
