import Vue from 'vue';
import Vuex from 'vuex';
import url from 'url';

Vue.use(Vuex, {
  strict: process.env.NODE_ENV !== 'production'
});

const store = new Vuex.Store({
  state: {
    busy: true,
    asideViewOpen: false,
    videoPreviewURL: '',
    isVideoPreviewShowing: false,
    appConfig: null,
    activeDownloadsList: [],
    advancedCommandHistory: [],
    downloadlist: []
  },
  getters: {
    getVideoPreviewURL: state => () => state.videoPreviewURL,
    isVideoPreviewShowing: state => () => state.isVideoPreviewShowing,
    getAppConfig: state => () => state.appConfig,
    getActiveDownloadsList: state => () => state.activeDownloadsList,
    isActiveDownload: state => (u) => {
      let t = new url.URL(u);
      if(t && state.activeDownloadsList.indexOf(u) !== -1)
       return false;
      return true;
    },
    getAdvancedCommandHistory: (state) => () => state.advancedCommandHistory,
    isAsideViewOpen: (state) => () => state.asideViewOpen,
    getDownloadlist: (state) => () => state.downloadlist
  },
  mutations: {
    setBusy(state, b){
      state.busy = true;
    },
    setVideoPreviewURL(state, u){
      // confirm its a valid Youtube URL
      const tmp = new url.URL(url);
      if(tmp && tmp.hostname == 'youtube.com')
        state.videoPreviewURL = tmp.href;
      else
        return false;
    },
    setVideoPreviewShowingState(state, st){
      state.isVideoPreviewShowing = st;
    },
    updateAppConfig(state, nc){
      state.appConfig = nc;
    },
    addToActiveDownloadsList(state, url){
      if(state.activeDownloadsList.includes(url))
        return;  // this should actually send a signal
      else
        state.activeDownloadsList.push(url);
    },
    removeFromActiveDownloadsList(state, url){
      let i = state.activeDownloadsList.findIndex((val) => {val == url});
      state.activeDownloadsList.splice(i, 1);
    },
    addToAdvancedCommandHistory(state, command){
      state.advancedCommandHistory.push(String(command));
    },
    setAsideViewState(state, st){
      // st must be boolean
      if(typeof st === 'boolean')
        state.asideViewOpen = st;
    },
    addToDownloadlist(state, url){}
  }
});

export default store;
