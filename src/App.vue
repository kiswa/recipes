<template>
  <div id="container">
    <top-navigation></top-navigation>
    <router-view></router-view>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation'

export default {
  name: 'app',
  components: {
    TopNavigation
  }
}
</script>
<style lang="scss">
html {
  box-sizing: border-box;
}

*, *:before, *:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

#container {
  display: flex;
  flex-direction: column;
  font-family: "Oxygen", sans-serif;
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin: 0 auto;
  width: 60%;
}
</style>
