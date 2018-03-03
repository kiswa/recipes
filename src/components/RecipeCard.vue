<template>
  <section
    class="card"
    @click="viewRecipe(recipe.id)">
    <header>
      {{ recipe.name }}
      <span>{{ recipe.category }}</span>
    </header>

    <div
      v-if="recipe.image"
      :style="imageStyle"
      class="image"
    />

    <div
      v-else
      class="spacer">
      No Image
    </div>

    <div class="description">{{ recipe.description }}</div>

    <div class="times">
      <div class="center">Total Recipe Time: {{ recipeTime }}</div>
      <div>
        Prep Time: {{ prepTime }}
        <span>Cook Time: {{ cookTime }}</span>
      </div>
    </div>
  </section>
</template>

<script>
import { convertTime } from '../utility'

export default {
  name: 'RecipeCard',

  props: {
    recipe: {
      type: Object,
      default: () => {
        return {
          name: '',
          category: '',
          image: '',
          description: '',
          prepTime: 0,
          cookTime: 0
        }
      }
    }
  },

  computed: {
    imageStyle () {
      return `background-image: url(${this.recipe.image});`
    },

    recipeTime () {
      return convertTime(this.recipe.prepTime + this.recipe.cookTime)
    },

    prepTime () {
      return convertTime(this.recipe.prepTime)
    },

    cookTime () {
      return convertTime(this.recipe.cookTime)
    }
  },

  methods: {
    viewRecipe (id) {
      this.$router.push({ name: 'view-recipe', params: { id } })
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  display: flex;
  flex: 0 0 calc(33.3333% - calc(1rem * .6666));
  flex-direction: column;
  margin-bottom: 1rem;
  margin-right: 1rem;

  header,
  .description,
  .times {
    padding: 1rem;
  }

  header {
    font-weight: bold;

    span {
      color: lighten(#333, 25%);
      float: right;
      font-size: .9rem;
      font-weight: normal;
    }
  }

  .image,
  .spacer {
    background-position: center;
    background-size: cover;
    height: 240px;
    max-width: 100%;
  }

  .spacer {
    border-bottom: 1px solid #eee;
    border-top: 1px solid #eee;
    padding-top: 32%;
    text-align: center;
  }

  .description {
    flex-grow: 1;
  }

  .times {
    font-size: .8rem;
    font-weight: bold;
    width: 100%;

    .center {
      text-align: center;
    }

    span {
      float: right;
    }
  }
}

@media screen and (max-width: 800px) {
  .card {
    flex: 0 0 calc(50% - calc(1rem * .55));
  }
}

@media screen and (max-width: 550px) {
  .card {
    flex: 0 0 100%;
  }
}
</style>
