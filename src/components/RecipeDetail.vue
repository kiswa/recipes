<template>
  <div>
    <div class="recipe">
      <h3>
        {{ recipe.name }}
        <span>{{ recipe.category }}</span>
      </h3>

      <div class="description">{{ recipe.description }}</div>

      <div class="details">
        <div class="ingredients">
          <div class="times">
            Prep Time: {{ prepTime }} <span>Cook Time: {{ cookTime }}</span><br>
            <strong>Total Recipe Time: {{ recipeTime }}</strong>
          </div>

          <h4>Ingredients</h4>

          <div
            v-for="item in recipe.ingredients"
            :key="item.id"
            class="ingredient">
            {{ item.name }}
            <div>
              {{ item.amount }} <span>{{ item.measure }}</span>
            </div>
          </div>
        </div>

        <div
          v-if="recipe.image"
          :style="imageStyle"
          class="image"
        />
      </div>

      <h4>Instructions</h4>
      <div v-html="instructions"/>
    </div>

    <footer>
      <a
        id="edit"
        @click.prevent="editRecipe()">Edit</a>
      <a
        id="delete"
        @click.prevent="deleteRecipe()">Delete</a>
    </footer>
  </div>
</template>

<script>
import Noty from 'noty'

import { convertTime, showNoty } from '../utility'

export default {
  name: 'RecipeDetail',

  data () {
    return {
      recipe: {
        name: 'Invalid Recipe',
        category: '',
        image: '',
        description: 'Try the Recipe List instead.',
        prepTime: 0,
        cookTime: 0,
        ingredients: [],
        instructions: ''
      },
      check: undefined
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
    },

    instructions () {
      return this.recipe.instructions.replace(/\n/g, '<br>')
    }
  },

  mounted() {
    this.getRecipe()
  },

  methods: {
    async getRecipe () {
      try {
        const response = await this.$http.get('recipes/' + this.$route.params.id)

        if (response.data === null) {
          this.$router.push({ name: 'recipe-list' })
          showNoty('Requested recipe not found.')
          return
        }

        this.recipe = response.data
      } catch (error) {
        showNoty(error)
      }
    },

    editRecipe () {
      this.$router.push({ name: 'recipe-edit', params: { id: this.recipe.id } })
    },

    deleteRecipe () {
      this.check = new Noty({
        text: 'Deleting a recipe cannot be undone.<br>Are you sure?',
        type: 'alert',
        layout: 'topCenter',
        buttons: [
          Noty.button('Yes',
                      'danger',
                      /* istanbul ignore next */ () => this.realDelete(),
                      { id: 'delete-yes' }),
          Noty.button('No',
                      '',
                      /* istanbul ignore next */ () => this.closeCheck(),
                      { id: 'delete-no' })
        ]
      })

      this.check.show()
    },

    closeCheck () {
      if (!this.check) {
        return
      }

      this.check.close()
    },

    async realDelete () {
      try {
        await this.$http.delete('recipes/' + this.recipe.id)

        this.check.close()
        this.$router.push({ name: 'recipe-list' })

        showNoty('Recipe deleted.', 'success')
      } catch (error) {
        this.check.close()
        showNoty(error)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.recipe {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  margin-bottom: 1rem;
  padding: 1rem;

  h3,
  h4 {
    margin-bottom: 1rem;

    span {
      color: #737373;
      float: right;
      font-size: 1rem;
      font-weight: normal;
    }
  }

  .description {
    margin-bottom: 1rem;
  }

  .details {
    display: flex;

    .times {
      font-size: .9rem;
      margin-bottom: 1rem;

      span {
        margin-left: 3rem;
      }
    }

    .ingredients,
    .image {
      flex: 0 0 50%;
    }

    .ingredients {
      padding-right: 1rem;
    }

    .ingredient {
      font-size: .9rem;

      div {
        float: right;
        font-weight: bold;
        text-align: right;
        width: 40%;

        span {
          float: right;
          padding-left: 5px;
          text-align: left;
          width: 60%;
        }
      }
    }

    .image {
      background-position: center;
      background-size: cover;
      min-height: 240px;
    }
  }
}

footer {
  background-color: #2b87d8;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  display: flex;
  margin-bottom: 1em;
  padding: 1em;

  a {
    color: #fff;
    cursor: pointer;
    line-height: 28px;
    margin-right: 1em;
    text-decoration: none;
  }
}
</style>
