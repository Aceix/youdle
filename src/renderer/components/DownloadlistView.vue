<template>
  <div id="downloadlistview">
    <div class="section" id="dl-section">
      <div class="section-header">Download List</div>
      <ul id="list">
        <li class="list-item" v-for="(url, i) in playlist" :key="i">
          <div class="list-item-url" :title="url">{{url}}</div>
          <button class="remove-btn" title="remove from list" @click="removeFromPlaylist(i)"> - </button>
        </li>
      </ul>
    </div>
    <div id="controls">
      <!-- <button class="transform" id="add-btn">Add To List</button> -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadlistView',
  data: () => ({
    playlist: ['dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs','dfdsfdfsdfs', 'fr3443f', 'aaasdsdfs', 'xxxxxxxxxx']
  }),
  methods: {
    removeFromPlaylist(i){
      this.playlist.splice(i, 1);
    }
  }
}
</script>

<style scoped>
#downloadlistview{
  position: absolute;
  overflow: hidden;
  height: 100%;
  /* display: flex; */
  /* flex-flow: column nowrap; */
}
.section{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid;
}
.section-header{
  margin: -10px auto 7px auto;
  padding: 0px 7px;
  width: fit-content;
  background-color: var(--background-color);
  cursor: default;
  border: 1px solid transparent;
  border-radius: 7px;
}
#dl-section{
  height: 90%;
  user-select: text;
  /* flex: 1 0 auto; */
}
#list{
  list-style: none;
  padding: 0px 7px;
  height: 100%;
  overflow: auto;
}
.list-item{
  border-bottom: 1px solid var(--accent-color);
  margin: 4px 0px;
  display: flex;
  flex-flow: row nowrap;
  padding-bottom: 4px;
  transition: color 200ms ease-out, transform 200ms ease-out;
}
.list-item:hover{
  color: var(--primary-text-color);
  transform: translateX(4px);
}
.list-item .list-item-url{
  flex: 9 0 auto;
}
.list-item .remove-btn{
  border: 1px solid var(--accent-color);
  border-radius: 5px;
  background-color: var(--background-color);
  color: var(--primary-text-color);
  transition: color, background-color 200ms ease-out;
}
.list-item .remove-btn:hover{
  background-color: var(--primary-text-color);
  color: var(--primary-color);
}
#controls{
  /* margin-top: auto; */
  /* flex: 1 0 0; */
}
</style>
