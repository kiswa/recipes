<template>
  <nav>
    <router-link :to="{ name: 'recipe-list' }">Recipe List</router-link>
    <router-link :to="{ name: 'recipe-add' }">Add New Recipe</router-link>

    <div class="spacer"></div>
    <input type="text" placeholder="Search Recipes...">
  </nav>
</template>

<script>
export default {
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
    outline: 0;
    padding: 7px;
  }
}
</style>
