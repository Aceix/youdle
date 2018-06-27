<template>
  <div id="wrapper">
    <button id="settings-btn"><img src="static/st.png" alt="st"></button>
    <button id="playlist-btn"><img src="static/playlist.png" alt="pl"></button>
    <div class="divider"></div>
    <div id="status">{{statusText}}</div>
    <div class="divider"></div>
    <button id="preview-btn"><img src="static/vod.png" alt="vod"></button>
  </div>
</template>

<script>
export default {
  data: () => ({}),
  props: {
    statusText: {
      type: String,
      default: 'Welcome to youdle by @the_aceix'
    }
  }
};
</script>

<style scoped>
#wrapper {
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
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
#playlist-btn{
  margin-right: 10px;
}
#status{
  margin: auto;
  width: 100%;
  margin-right: 10px;
  text-shadow: 1px 0.7px 2px #333;
  user-select: text;
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
