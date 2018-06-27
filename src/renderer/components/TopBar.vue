<template>
  <div id="wrapper">
    <div id="logo">youdle</div>
    <button id="profile-btn">Login</button>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
#wrapper{
  display: flex;
  flex-flow: row nowrap;
  align-items: center;
  height: 100%;
  color: var(--primary-text-color);
  box-shadow: 0px 1px 3px var(--accent-color);
}
#logo{
  user-select: none;
  cursor: default;
  font-size: 1.6em;
  margin: 10px;
}
#profile-btn{
  margin-left: auto;
  margin-right: 10px;
  border: none;
  color: var(--primary-text-color);
  background: transparent;
}
</style>
