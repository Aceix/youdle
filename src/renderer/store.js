import Vue from 'vue';
import Vuex from 'vuex';
import url from 'url';

Vue.use(Vuex, {
  strict: process.env.NODE_ENV !== 'production'
});

const store = new Vuex.Store({
  state: {
    busy: true,
    currentDownloadURL: '',
    isVideoPreviewShowing: false,
    appConfig: null
  },
  getters: {
    getCurrentDownloadURL: state => () => state.currentDownloadURL,
    isVideoPreviewShowing: state => () => state.isVideoPreviewShowing,
    getAppConfig: state => () => state.appConfig
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
    },
    setVideoPreviewShowingState(state, st){
      state.isVideoPreviewShowing = st;
    },
    updateAppConfig(state, nc){
      state.appConfig = nc;
    }
  }
});

export default store;
