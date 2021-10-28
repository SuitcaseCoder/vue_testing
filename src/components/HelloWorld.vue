<template>
<Nav />
  <h1> using the github api </h1>
  <!-- <Curriculum /> -->
</template>

<script>
// import Curriculum from "../pages/Curriculum.vue"
import Nav from "./Nav.vue"


export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  components: {
    // Curriculum,
    Nav
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
