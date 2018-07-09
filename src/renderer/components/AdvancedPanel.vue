<template>
  <div id="adv-panel">
    <section id="output-section" class="section">
      <div class="section-header">Output</div>
      <ul id="output-group">
        <li v-for="(it, i) in commandHistory" :key="i" class="output-item">{{it}}</li>
      </ul>
    </section>
    <section id="input-section" class="section">
      <input type="text" name="prompt" id="prompt" placeholder="youtube-dl -f 22 http://youtube.com/watch?v=" v-model="currentCommand" @keydown="onPromptKeyDown">
    </section>
  </div>
</template>

<script>
export default {
  name: 'AdvancedPanel',
  data: () => ({
    currentCommand: ''
  }),
  computed: {
    commandHistory(){
      if(!this.$store)
        return [];
      return this.$store.getters.getAdvancedCommandHistory();
    }
  },
  methods: {
    onPromptKeyDown(evt){
      if(evt.key === 'Enter' && this.$store){
        this.executeCurrentCommand();
      }
    },
    executeCurrentCommand(){
      // filter input
      this.currentCommand = this.currentCommand.trim();
      if(this.currentCommand.length === 0)
        return;
      // first log comand to vuex
      this.$store.commit('addToAdvancedCommandHistory', this.currentCommand);
      // pass command to main proc for execution
      this.$electron.ipcRenderer.send('execute-advanced-command', this.currentCommand);
      this.currentCommand = '';
    }
  }
}
</script>

<style scoped>
#adv-panel{
  display: flex;
  flex-flow: column nowrap;
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: absolute;
}
.section{
  margin-top: 10px;
  margin-left: 10px;
  margin-right: 10px;
  border-top: 2px solid;
  padding: 0px 20px;
}
.section-header{
  margin: -10px 10px 7px 20px;
  padding: 0px 7px;
  width: fit-content;
  background-color: var(--background-color);
  cursor: default;
  border: 1px solid transparent;
  border-radius: 7px;
}
#output-section{
  height: 88%;
  background: linear-gradient(to bottom, var(--primary-color), transparent 90%);
}
@media screen and (max-height: 300px) {
  #output-section{
    height: 60%;
  }
}
@media screen and (min-height: 300px) and (max-height: 400px) {
  #output-section{
    height: 70%;
  }
}
@media screen and (min-height: 400px) and (max-height: 500px) {
  #output-section{
    height: 80%;
  }
}
@media screen and (min-height: 500px) and (max-height: 600px) {
  #output-section{
    height: 85%;
  }
}
#output-group{
  width: 100%;
  list-style: none;
  padding: 0px;
  display: block;
  height: 100%;
  overflow: auto;
  user-select: text;
}
.output-item{
  width: 100%;
  /* overflow: hidden; */
  border-bottom: 1px solid var(--accent-color);
  transition: all 200ms ease-out;
}
.output-item:hover{
  background-color: var(--accent-color);
}
#input-section{
  border-top: 1px dashed var(--primary-color);
  border-top: none;
  padding: 0px;
  position: absolute;
  bottom: 0px;
  display: inline-block;
  margin-bottom: 0px;
}
#prompt{
  width: 100%;
  background-color: var(--primary-color);
  border-top: 1px solid transparent;
  border-left: none;
  border-right: none;
  border-bottom: 1px solid var(--accent-color);
  border-top-left-radius: 7px;
  border-top-right-radius: 7px;
  color: var(--secondary-text-color);
  font-size: 1.3em;
}
</style>
