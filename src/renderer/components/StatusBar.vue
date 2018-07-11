<template>
  <div id="status-bar">
    <router-link to="/settings"><button id="settings-btn" title="settings"><img src="static/st.png" alt="st"></button></router-link>
    <button id="downloadlist-btn" title="downloadlist" @click="onDownloadListBtnClick"><img src="static/downloadlist.png" alt="pl"></button>
    <div class="divider"></div>
    <div id="status" :title="statusText">{{statusText}}</div>
    <div class="divider"></div>
    <button id="preview-btn" @click="toggleVideoPreview" v-show="canPreviewVideo" title="video preview"><img src="static/vod.png" alt="vod"></button>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  computed: {
    canPreviewVideo(){
      if(this.$route.path === '/')
        return true;
      return false;
    }
  },
  props: {
    statusText: {
      type: String,
      default: 'Welcome to youdle by @the_aceix'
    }
  },
  methods: {
    toggleVideoPreview(){
      const st = this.$store.getters.isVideoPreviewShowing();
      this.$store.commit('setVideoPreviewShowingState', !st);
    },
    onDownloadListBtnClick(){
      this.$emit('set-current-aside-view-component', 'DownloadlistView');
    }
  }
};
</script>

<style scoped>
#status-bar {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  width: 100vw;
  color: var(--secondary-text-color);
  background-color: var(--primary-color);
}
button{
  border: none;
  background: transparent;
  border-radius: 7px;
  padding: 4px;
  color: var(--primary-text-color);
}
button:hover{
  background: var(--accent-color);
}
button:active{
  background: var(--secondary-color);
}
#settings-btn{
  margin: 0px 10px;
}
#downloadlist-btn{
  margin-right: 10px;
}
#status{
  margin: auto;
  width: 100%;
  white-space: nowrap;
  overflow: hidden;
  margin-right: 10px;
  text-shadow: 1px 0.7px 2px #333;
  user-select: text;
  text-overflow: ellipsis;
  /* display: inline-block; */
}
#preview-btn{
  margin-left: auto;
  margin-right: 10px;
}
.divider{
  height: 90%;
  border-left: 2px solid var(--accent-color);
  margin-right: 10px;
}
</style>
