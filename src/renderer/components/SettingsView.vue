<template>
  <div id="settingsview">
    <h2 class="heading">Application Settings</h2>
    <div class="section" style="border: none">
      <div class="setting">
        <label for="download-directory">Download Directory:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <div>
          
          <!-- needs working on!! caching not wanted -->
          <span type="text" name="downloads-directory" id="downloads-directory" ref="downloads-directory">{{newDownloadsDirectory || appConfig.downloadsDirectory}}</span>

          <button id="change-downloads-directory-btn" ref="change-downloads-directory-btn" @click="onChangeDownloadsDirectoryButtonClick">Change</button>
        </div>
      </div>
    </div>
    <section class="section" id="video-settings-section">
      <div class="section-header">Video Settings</div>
      <div class="setting">
        <label for="video-quality">Video Quality - work:</label>
        <select name="video-quality" id="video-quality" ref="video-quality" v-model="newVideoQualityCode">
          <option value="">144p</option>
          <option value="">240p</option>
          <option value="">360p</option>
          <option value="">480p</option>
          <option value="22">720p</option>
          <option value="">1080p</option>
          <option value="">2440p</option>
        </select>
      </div>
    </section>
    <section class="section" id="confirm-section">
      <button id="save-btn" @click="onSave">Save</button>
      <button id="default-btn" title="coming soon..">Default</button>
    </section>
  </div>
</template>

<script>
export default {
  name: 'settings-view',
  data: () => ({
    newDownloadsDirectory: '',
    newVideoQualityCode: null
  }),
  computed: {
    appConfig(){
      return this.$store.getters.getAppConfig();
    }
  },
  methods: {
    onSave(){
      let newAppConfig = {};
      newAppConfig.downloadsDirectory = this.newDownloadsDirectory || this.appConfig.downloadsDirectory;
      if(this.newVideoQuality)
        newAppConfig.videoQuality = {code: this.newVideoQualityCode, name: this.$refs.videoQuality.options[this.$refs.videoQuality.selectedIndex].textContent};
      // console.log(newAppConfig);
      this.$electron.ipcRenderer.send('update-config', newAppConfig);
    },
    onChangeDownloadsDirectoryButtonClick(){
      this.$electron.ipcRenderer.send('change-downloads-directory');
    }
  },
  created(){
    this.$electron.ipcRenderer.on('update-config-error', (evt, err) => {
      window.alert('===========\n' + err.toString());
    });
    this.$electron.ipcRenderer.on('change-downloads-directory-path', (evt, dirPath) => {
      this.newDownloadsDirectory = dirPath;
    });
    console.log('settings-view created!! newdf: ' + this.newDownloadsDirectory);
  },
  mounted(){
    setTimeout(() => {
      // this.$refs['downloads-directory'].textContent = this.appConfig.downloadsDirectory;
      let o = this.$refs['video-quality'].options;
      for(let i = 0; i < o.length; i++){
        if(o[i].value === this.appConfig.videoQuality.code){
          this.$refs['video-quality'].selectedIndex = i;
          break;
        }
      }
    }, 300);
  },
  destroyed(){
    console.log('settings-view destroyed!! newdf: ' + this.newDownloadsDirectory);
  }
}
</script>

<style scoped>
.heading{
  cursor: default;
  text-align: center;
  text-decoration-line: underline;
  text-decoration-style: dotted;
  text-decoration-color: var(--secondary-text-color);
  color: var(--primary-text-color);
}
.section{
  margin-top: 40px;
  margin-left: 30px;
  margin-right: 30px;
  border-top: 2px solid;
  padding: 0px 20px;
}
.section-header{
  margin: -10px 10px 7px 20px;
  padding: 0px 7px;
  width: fit-content;
  background-color: var(--background-color);
  cursor: default;
}
.setting{
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
}
.setting :nth-child(1){
  flex: 1 0 auto;
}
.setting :nth-child(2){
  flex: 4 0 auto;
}
#confirm-section{
  float: right;
  padding-top: 10px;
}
#confirm-section button{
  border: 1px solid var(--accent-color);
  border-radius: 7px;
  height: 40px;
  width: 100px;
  background-color: var(--background-color);
  color: var(--primary-text-color);
  transition: background-color 200ms linear;
}
#confirm-section button:hover{
  background-color: var(--primary-text-color);
  color: var(--accent-color);
  transition: background-color 100ms ease-out;
}
#confirm-section button:active{
  background-color: var(--background-color);
}
#save-btn{
  font-weight: 900;
}
#downloads-directory{
  color: var(--primary-text-color);
}
#change-downloads-directory-btn{
  float: right;
  border: 1px solid var(--accent-color);
  border-radius: 7px;
  /* height: 40px; */
  width: 100px;
  background-color: var(--background-color);
  color: var(--primary-text-color);
  transition: background-color 200ms linear;
}
#change-downloads-directory-btn:hover{
  background-color: var(--primary-text-color);
  color: var(--accent-color);
  transition: background-color 100ms ease-out;
}
#change-downloads-directory-btn:active{
  background-color: var(--background-color);
}
</style>
