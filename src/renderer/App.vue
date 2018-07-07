<template>
  <div id="app">
    <top-bar></top-bar>
    <keep-alive include="home-view">
    <!-- <transition name="page" mode="in-out"> -->
      <router-view class="main-view" @yt-status="onYtStatus(st)"></router-view>
    <!-- </transition> -->
    </keep-alive>
    <status-bar :statusText="currentStatusText"></status-bar>
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
  },
  data: () => ({
    currentStatusText: ''
  }),
  methods: {},
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
  height: 100%;
  width: 100%;
  position: absolute;
  overflow: hidden;
  background-color: var(--background-color);
}
.main-view{
  width: 100%;
  overflow-y: auto;
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
