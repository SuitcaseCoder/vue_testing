<template>
  <Nav />
<router-view></router-view>
  <!-- <HelloWorld /> -->
</template>

<script>
// import HelloWorld from './components/HelloWorld.vue'
import Nav from './components/Nav.vue'
export default {
  name: 'App',
  components: {
    // HelloWorld,
    Nav
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 50px; */
}

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
</style>
