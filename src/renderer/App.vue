<template>
  <div id="app">
    <top-bar @set-current-aside-view-component="setCurrentAsideViewComponent"></top-bar>
    <div class="main-view">
      <keep-alive include="home-view">
        <!-- <transition name="page" mode="in-out"> -->
          <router-view ref="main-view" @yt-status="onYtStatus(st)"></router-view>
        <!-- </transition> -->
      </keep-alive>
    </div>
    <component :is="currentAsideViewComponent" ref="aside-view" class="aside-view"></component>
    <status-bar :statusText="currentStatusText" @set-current-aside-view-component="setCurrentAsideViewComponent"></status-bar>
    <!-- <aside class="cover">&nbsp;</aside> -->
  </div>
</template>

<script>
export default {
  name: 'youdle',
  components: {
    TopBar: require('@/components/TopBar').default,
    StatusBar: require('@/components/StatusBar').default,
    HomeView: require('@/components/HomeView').default,
    AdvancedPanel: require('@/components/AdvancedPanel').default,
    DownloadlistView: require('@/components/DownloadlistView').default
  },
  data: () => ({
    currentStatusText: '',
    currentAsideViewComponent: null
  }),
  computed: {},
  watch: {},
  methods: {
    setCurrentAsideViewComponent(comp){
      if(this.$store.getters.isAsideViewOpen() && this.currentAsideViewComponent == comp){
        this.$store.commit('setAsideViewState', false);
      }
      else{
        this.$store.commit('setAsideViewState', true);
      }
      this.currentAsideViewComponent = comp;
    }
  },
  created(){
    this.$electron.ipcRenderer.on('yt-status', (evt, status) => {
      this.currentStatusText = status;
    });
    this.$electron.ipcRenderer.on('config-updated', (evt, newConfig) => {
      this.$store.commit('updateAppConfig', newConfig);
      // console.log('config updated in Vue');
    });
    this.$electron.ipcRenderer.on('download-started', (evt, url) => {
      this.$store.commit('addToActiveDownloadsList', url);
      console.log(`download-started: ${url}`);
    });
    this.$electron.ipcRenderer.on('download-ended', (evt, url) => {
      this.$store.commit('removeFromActiveDownloadsList', url);
      console.log(`download-ended: ${url}`);
    });
    this.$electron.ipcRenderer.on('advanced-command-status', (evt, status) => {
      console.log('adv stats');
      this.currentStatusText = 'ADV :: ' + status;
    });
    const unwatchAsideViewOpen = this.$store.watch((state, getters) => this.$store.state.asideViewOpen, (val) => {
      // console.log(val);
      const mv = window.document.getElementsByClassName('main-view')[0];
      const av = this.$refs['aside-view'] ? window.document.getElementsByClassName('aside-view')[0] : null;
      // console.log(mv);
      if(val){
        mv.style.gridColumn = '1 / span 1';
        av ? av.style.gridColumn = '2 / span 1' : null;
      }
      else{
        mv.style.gridColumn = '1 / span 2';
        av ? av.style.gridColumn = '3 / 3' : null;
      }
    });

    this.$electron.ipcRenderer.send('vue-app-ready');
  }
}
</script>

<style>
*{
  --background-color: #222;
  --primary-color: #097CCC;
  --accent-color: #064E7F;
  --primary-text-color: #FF9C0B;
  --secondary-text-color: #ddd;
}
#app{
  user-select: none;
  color: var(--secondary-text-color);
  display: grid;
  grid-template-rows: 50px auto 60px;
  grid-template-columns: auto 250px;
  height: 100vh;
  width: 100vw;
  position: absolute;
  overflow: hidden;
  background-color: var(--background-color);
}
#top-view{
  grid-row: 1 / span 1;
  grid-column: 1 / span 2;
}
.main-view{
  width: 100%;
  overflow-y: auto;
  grid-row: 2 / span 1;
  grid-column: 1 / span 2;
  transition: all 700ms ease-out;
}
/* .main-view:hover{
  grid-column: 1 / span 2;
} */
.aside-view{
  grid-row: 2 / span 1;
  grid-column: 2 / span 1;
  width: 100%;
  overflow: hidden;
}
#status-bar{
  grid-row: 3 / span 1;
  grid-column: 1 / span 2;
}

::-webkit-scrollbar { 
  display: none; 
}

a,
a:visited,
a:active,
a:hover{
  text-decoration: none;
  color: var(--primary-text-color);
}
.cover{
  z-index: 10;
  position: absolute;
  width: 100vw;
  height: 100vh;
  background-color: var(--background-color);
  opacity: 0;
  display: none;
}

.page-enter-active, .page-leave-active {
  transition: opacity 1s, transform 1s;
  /* height: 300px; */
}
.page-enter, .page-leave-to {
  opacity: 0;
  transform: translateX(-30%);
}
</style>
