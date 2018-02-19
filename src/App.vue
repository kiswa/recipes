<template>
  <div id="container">
    <top-navigation
      :search="searchText"
      @search="updateSearch"/>
    <router-view :search="searchText"/>
  </div>
</template>

<script>
import TopNavigation from './components/TopNavigation'

export default {
  name: 'App',

  components: {
    TopNavigation
  },

  data () {
    return {
      searchText: ''
    }
  },

  methods: {
    updateSearch (text) {
      this.searchText = text
    }
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

.noty_type__alert {
  border: none;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);

  button {
    background-color: #fff;
    border: 1px solid #757575;
    border-radius: 3px;
    cursor: pointer;
    line-height: 1rem;
    margin-right: .5rem;
    padding: 3px 7px;

    &.danger {
      background-color: #de636f;
      border: 1px solid #CA5A65;
      color: #fff;
    }
  }
}

</style>
