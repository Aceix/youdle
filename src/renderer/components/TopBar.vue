<template>
  <div id="top-view">
    <router-link to="/"><div id="logo">youdle</div></router-link>
    <div id="adv-btn" title="for CLI users of youtube-dl" @click="onAdvancedModeClick">Advanced Mode</div>
  </div>
</template>

<script>
export default {
  watch: {
    '$route.path': (newPath, oldPath) => {
      const logo = window.document.getElementById('logo');
      if(newPath !== '/'){
        logo.textContent = ' <';
      }
      else{
        logo.textContent = 'youdle';
      }
    }
  },
  methods: {
    onAdvancedModeClick(){
      this.$emit('set-current-aside-view-component', 'AdvancedPanel');
    }
  },
  mounted(){
    const advBtn = window.document.getElementById('adv-btn');
    advBtn.textContent = '<Advanced Mode />';
  }
};
</script>

<style scoped>
#top-view{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  color: var(--primary-text-color);
  box-shadow: 0px 1px 3px var(--accent-color);
}
#logo{
  user-select: none;
  cursor: pointer;
  font-size: 1.6em;
  margin: 10px;
}
#adv-btn{
  margin-left: auto;
  margin-right: 10px;
  border: none;
  color: var(--primary-text-color);
  background: transparent;
  transition: color 100ms ease-out, transform 300ms linear;
  cursor: pointer;
}
#adv-btn:hover{
  color: var(--secondary-text-color);
  text-decoration: underline;
  transform: scale(1.15, 1.2) rotateZ(-3deg);
}
</style>
