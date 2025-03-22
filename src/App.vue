<template>
  <div id="app">
    <div class='header'>
      <router-link to="/"><img src="@/assets/logo.png"></router-link>
    </div>
  </div>
  <router-view></router-view>
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.header {
  background-color: transparent;
}
img {
  width: 200px;
  height: auto;
}
</style>
