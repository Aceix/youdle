<template>
  <div class="container">
    <section id="search-section">
      <input type="text" name="search-box" id="search-box" placeholder="YouTube Video URL" autofocus v-model="downloadURL" @keypress="onSearchBoxKeyPress">
      <button id="search-btn" @click="downloadFromURL">&gt;</button>
    </section>
    <section id="active-downloads-section" class="section">
      <div class="section-header">Active Downloads</div>
      <img v-if="!activeDownloads" src="static/loading.png" alt="loading" class="loading" style="margin: auto;">
      
      <div v-for="(dl, i) in activeDownloads" :key="i" class="active-downloads-item">{{dl}}</div>
    </section>
    <section id="my-downloads-section" class="section">
      <div class="section-header">My Downloads</div>
      <img v-if="!isDownloadsReady" src="static/loading.png" alt="loading" class="loading" style="margin: auto;">
      <p v-if="isDownloadsReady && downloads.length == 0" style="margin: auto; width: fit-content;">No downloads yet</p>
      <table v-else id="my-downloads-table">
        <tr v-for="(dl, i) in downloads" :key="'dl-' + i">
          <td>&nbsp;> {{dl.filename}}</td>
        </tr>
      </table>
    </section>
    <section id="trending-section" class="section">
      <div class="section-header">Trending</div>
      <div id="trending-section-content">
        <img v-if="!isTopTrendingVideosReady" src="static/loading.png" alt="loading" class="loading" style="margin: auto;">
        <p v-if="isTopTrendingVideosReady && topTrendingVideos.length == 0">No information on trending videos available</p>
        <template v-else>
          <div v-for="(vid, i) in topTrendingVideos" :key="i" class="trending-video-thumbnail">
            <img :src="vid.imgSrc" :alt="vid.title">
          </div>
        </template>
      </div>
    </section>
    <transition name="fade">
      <VideoPreview v-if="showVideoPreview" :videoID="videoID" class="video-preview"/>
    </transition>
  </div>
</template>

<script>
import {URL} from 'url';
import {fail} from 'assert';
// import {ipcRenderer} from 'electron';
import VideoPreview from '@/components/VideoPreview.vue';

export default {
  name: 'home-view',
  components: {
    VideoPreview
  },
  data: () => ({
    isDownloadsReady: true,
    isTopTrendingVideosReady: true,
    downloadURL: '',
    downloads: [
      // limit to 10
      {filename: 'Better UI/UX design'},
      {filename: 'How to speedcube(F2L)'},
      {filename: 'The Future: Blockchain, ML, Quantum Computing'},
      {filename: 'Better UI/UX design'},
      {filename: 'How to speedcube(F2L)'},
      {filename: 'The Future: Blockchain, ML, Quantum Computing'},
      {filename: 'Better UI/UX design'}
    ],
    topTrendingVideos: [/*
      {imgSrc: 'http://placekitten.com/250/200', title: 'How to do the Trinity Flip'},
      {imgSrc: 'http://placekitten.com/250/200', title: 'How to do the Trinity Flip'},
      {imgSrc: 'http://placekitten.com/250/200', title: 'How to do the Trinity Flip'}
    */]
  }),
  computed: {
    showVideoPreview(){
      return this.$store.getters.isVideoPreviewShowing();
    },
    activeDownloads(){
      if(this.$store)
        return this.$store.getters.getActiveDownloadsList();
      else 
        return [];
    },
    videoID(){
      try{
        const u = new URL(this.downloadURL);
        if(u){
          if(u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com'){
            // check if a video has been specified
            const videoID = u.searchParams.get('v');
            if(videoID)
              return videoID;
            else
              return null;
          }
        }
        else{
          return null;
        }
      }
      catch(e){
        console.log(e.code);
        return null;
      }
    }
  },
  methods: {
    toggleVideoPreview(){
      this.VideoPreview = !this.VideoPreview;
    },
    downloadFromURL(){
      // trim input
      this.downloadURL = this.downloadURL.trim();
      // check url
      if(this.downloadURL.length === 0)
        return;
      try{
        const u = new URL(this.downloadURL);
        if(u){
          if(u.hostname === 'www.youtube.com' || u.hostname === 'youtube.com'){
            // check if a video has been specified
            const videoID = u.searchParams.get('v');
            if(videoID){
              // this.$store.commit('setCurrentDownloadURL', u.href);
              if(this.$store){
                if(this.$store.getters.isActiveDownload(u.href)){
                  this.$electron.ipcRenderer.send('download', u.href);
                }
                else{
                  this.$parent.currentStatusText = `Already downloading: ${u.href}`;
                }
              }
              else
                this.$electron.ipcRenderer.send('download', u.href);
            }
            else{
              this.downloadURL = '';
              window.alert('Please specify the URL of a YouTube video');
            }
          }
          else{
            this.downloadURL = '';
            window.alert('Only YouTube video URLs please!');
          }
        }
        // commit to store
        // use actions to call backend
      }
      catch(e){
        console.log(e.code);
        if(e.code === 'ERR_INVALID_URL'){
          this.downloadURL = '';
          window.alert('Only YouTube video URLs please!');
        }
      }
    },
    onSearchBoxKeyPress(ev){
      if(ev.key === 'Enter'){
        this.downloadFromURL();
      }
    }
  },
  created(){}
}
</script>

<style scoped>
.container{
  display: flex;
  flex-flow: column nowrap;
}
#search-section{
  align-self: center;
  margin: 30px;
}
#search-box{
  height: 70px;
  width: 600px;
  border-radius: 7px;
  font-size: 2em;
  padding: 3px;
  position: relative;
}
#search-btn{
  height: 70px;
  width: 70px;
  border: none;
  background-color: transparent;
  border: 1px solid var(--accent-color);
  border-radius: 7px;
  font-size: 2em;
  color: var(--primary-text-color);
  transition: color, background-color 200ms ease-out;
}
#search-btn:hover{
  background-color: var(--primary-text-color);
  color: var(--primary-color);
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
#my-downloads-section{
  max-height: 400px;
}
#my-downloads-table{
  height: 100%;
  display: block;
  width: 100%;
  overflow-y: auto;
  text-overflow: ellipsis;
  border-spacing: 0px;
}
#my-downloads-table tr{
  display: inline-block;
  width: 100%;
}
#my-downloads-table td{
  width: 100%;
  display: inline-block;
  border-bottom: 1px solid var(--accent-color);
  user-select: auto;
  cursor: pointer;
  transition: transform 150ms ease-out;
}
#my-downloads-table td:hover{
  transform: scaleX(0.96);
  color: var(--primary-text-color);
}
#my-downloads-table :nth-child(2n){
  background-color: var(--accent-color);
}
#trending-section-content{
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-around;
}
.trending-video-thumbnail{
  display: inline-block;
  border: 1px solid transparent;
  border-radius: 7px;
}
.trending-video-thumbnail > img{
  border: 1px solid transparent;
  border-radius: 7px;
  box-shadow: 1px 2px 5px var(--accent-color);
}
.active-downloads-item{
  color: var(--primary-text-color);
}

.loading{
  animation: spin 1.7s linear infinite;
}
@keyframes spin {
  100% {
    transform: rotate(360deg);
  }
}
.fade-enter,
.fade-leave-to{
  opacity: 0;
}
.fade-enter-to,
.fade-leave{
  opacity: 1;
}
.fade-enter-active,
.fade-leave-active{
  transition: opacity 200ms ease-out;
}
</style>
