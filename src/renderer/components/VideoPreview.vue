<template>
  <div class="container">
    <img v-if="!videoURL" src="static/video-preview.png" alt="cover" class="cover">
    <iframe v-else :src="videoURL" frameborder="0" class="video"></iframe>
  </div>
</template>

<script>
export default {
  props: {
    videoURL: {
      type: String,
      required: false
    }
  },
  data(){
    return {
    }
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
.cover{
  width: 100%;
  height: 100%;
}
</style>
