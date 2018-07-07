<template>
  <div class="container">
    <img v-if="!computedVideoID" src="static/video-preview.png" alt="vid-cover" class="vid-cover">
    <iframe v-else :src="'https://www.youtube.com/embed/' + computedVideoID" frameborder="0" allow="autoplay; encrypted-media" class="vid"></iframe>

    <!-- <iframe class="vid" src="https://www.youtube.com/embed/JoWg0XNE7TQ" frameborder="0" allow="autoplay; encrypted-media"></iframe> -->
  </div>
</template>

<script>
export default {
  props: {
    videoID: {
      type: String,
      required: false
    }
  },
  computed:{
    computedVideoID(){
      if(!window.navigator.onLine){
        // compter is offline
        return null;
      }
      else if(this.videoID){
        // computer is online and video id is sent
        return this.videoID
      }
      else{
        // computer is online but video id is not sent
        return null;
      }
    }
  },
  data(){
    return {}
  }
}
</script>

<style scoped>
.container{
  z-index: 2;
  width: 300px;
  height: 170px;
  border: 1px solid var(--accent-color);
  border-radius: 7px;
  background-color: var(--secondary-color);
  position: absolute;
  bottom: 70px;
  right: 10px;
  box-shadow: 1px 1.3px 3px var(--accent-color);
}
.vid-cover{
  width: 100%;
  height: 100%;
}
.vid{
  width: 100%;
  height: 100%;
}
</style>
