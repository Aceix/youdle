<template>
  <div id="app">
    <top-bar></top-bar>
    <router-view class="main-view" @ytStatus="onYtStatus(st)"></router-view>
    <status-bar :statusText="currentStatusText"></status-bar>
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
  methods: {
    onYtStatus(st){
      console.log('evt received');
      this.currentStatusText = st;
    }
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
</style>
