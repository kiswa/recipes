<template>
  <nav>
    <router-link
      id="recipe-list"
      :to="{ name: 'recipe-list' }">Recipe List</router-link>
    <router-link
      id="recipe-add"
      :to="{ name: 'recipe-add' }">Add New Recipe</router-link>

    <div class="spacer"/>
    <input
      v-if="isHome"
      v-model="searchText"
      type="text"
      placeholder="Search Recipes..."
      @input="emitSearch">
  </nav>
</template>

<script>
export default {
  name: 'TopNavigation',

  props: {
    search: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      searchText: this.search
    }
  },

  computed: {
    isHome () {
      return this.$route.path === '/'
    }
  },

  methods: {
    emitSearch (event) {
      this.$emit('search', event.target.value)
    }
  }
}
</script>

<style lang="scss" scoped>
nav {
  background-color: #2b87d8;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 1em;
  padding: 1em;

  a {
    color: #fff;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  }

  .router-link-exact-active {
    color: #86deb7;
  }

  .spacer {
    flex: 1 0;
  }

  input {
    border: 0;
    border-radius: 3px;
    font-size: 1rem;
    outline: 0;
    padding: 7px;
  }
}

@media screen and (max-width: 550px) {
  nav {
    flex-wrap: wrap;

    input {
      margin-top: 1rem;
      width: 100%;
    }
  }
}
</style>
