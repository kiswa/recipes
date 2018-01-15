<template>
  <div id="container">
    <top-navigation/>
    <router-view/>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation'

export default {
  name: 'App',
  components: {
    TopNavigation
  }
}
</script>

<style lang="scss">
@import '../node_modules/noty/lib/noty.css';
@import '../node_modules/noty/lib/themes/mint.css';


html {
  box-sizing: border-box;
}

*,
*:before,
*:after {
  box-sizing: inherit;
  margin: 0;
  padding: 0;
}

* {
  font-family: "Oxygen", sans-serif;
}

#container {
  color: #333;
  display: flex;
  flex-direction: column;
  font-size: 1.1rem;
  line-height: 1.6rem;
  margin: 0 auto;
  max-width: 1000px;
}

@media screen and (max-width: 800px) {
  #container {
    max-width: 98%;
  }
}

@media screen and (max-width: 550px) {
  #container {
    max-width: 100%;
  }
}
</style>
