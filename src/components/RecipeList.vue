<template>
  <div>
    <div
      v-if="!isLoading && !noRecipes"
      id="filter">
      Show:
      <select v-model="filterCategory">
        <option>All Recipes</option>
        <option
          v-for="type in recipeTypes"
          :key="type">{{ type }}</option>
      </select>
    </div>

    <div
      v-if="isLoading"
      class="loading">
      Loading Recipes...
    </div>

    <div
      v-if="noRecipes"
      class="no-recipes"
      @click="addRecipe()">
      <h3>No recipes found.</h3>
      Click this card to add one.
    </div>

    <div id="recipes">
      <recipe-card
        v-for="recipe in filteredRecipes"
        :key="recipe.id"
        :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import { showNoty, RECIPE_TYPES } from '../utility'
import RecipeCard from './RecipeCard.vue'

export default {
  name: 'RecipeList',

  components: {
    RecipeCard
  },

  props: {
    search: {
      type: String,
      default: ''
    }
  },

  data () {
    return {
      isLoading: true,
      recipes: [],
      filteredRecipes: [],
      filterCategory: 'All Recipes',
      recipeTypes: RECIPE_TYPES
    }
  },

  computed: {
    noRecipes () {
      return this.isLoading === false &&
        (this.recipes && this.recipes.length === 0)
    }
  },

  watch: {
    'filterCategory': function () {
      this.filteredRecipes = this.recipes.filter(this.filterRecipe)
    },

    'search': function () {
      this.filteredRecipes = this.recipes.filter(this.filterSearch)
    }
  },

  mounted() {
    this.getRecipes()
  },

  methods: {
    async getRecipes () {
      try {
        const response = await this.$http.get('recipes')
        this.recipes = response.data
        this.filteredRecipes = this.recipes.slice()
      } catch (error) {
        showNoty(error)
      }

      this.isLoading = false
    },

    filterRecipe (recipe) {
      return recipe.category.toString() === this.filterCategory.toString()
    },

    filterSearch (recipe) {
      return recipe.name.toLowerCase().includes(this.search)
    },

    addRecipe () {
      this.$router.push('recipe-add')
    }
  }
}
</script>

<style lang="scss" scoped>
#filter {
  margin-bottom: 1em;
  text-align: center;

  select {
    border-radius: 3px;
    outline: 0;
    padding: 5px;
    width: 25%;
  }
}

@media screen and (max-width: 800px) {
  #filter {
    select {
      width: 40%;
    }
  }
}

@media screen and (max-width: 550px) {
  #filter {
    select {
      width: 60%;
    }
  }
}

.no-recipes {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  text-align: center;
}

.loading {
  text-align: center;
}

#recipes {
  display: flex;
  flex-wrap: wrap;

  .card:nth-child(3n) {
    margin-right: 0;
  }

  @media screen and (max-width: 800px) {
    .card:nth-child(3n) {
      margin-right: 1em;
    }

    .card:nth-child(2n) {
      margin-right: 0;
    }
  }
}
</style>
