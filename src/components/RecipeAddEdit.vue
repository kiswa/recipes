<template>
  <form
    v-if="recipe"
    @submit.prevent="addRecipe">
    <h2 v-if="!isEdit">
      Add Recipe <span class="required">= required field</span>
    </h2>
    <h2 v-else>
      Edit Recipe <span class="required">= required field</span>
    </h2>

    <div class="row">
      <label class="short-label">
        Name:
        <input
          id="recipe-name"
          v-model="recipe.name"
          type="text"
          required>
      </label>

      <label class="short-label">
        Category:
        <select
          id="recipe-category"
          v-model="recipe.category"
          required>
          <option
            v-for="type in recipeTypes"
            :key="type">{{ type }}</option>
        </select>
      </label>
    </div>

    <div class="row">
      <label class="short-label">
        Prep Time (minutes):
        <input
          id="recipe-prep"
          v-model="recipe.prepTime"
          type="number"
          step="any"
          min="1"
          required>
      </label>

      <label class="short-label">
        Cook Time (minutes):
        <input
          id="recipe-cook"
          v-model="recipe.cookTime"
          type="text"
          step="any"
          min="1"
          required>
      </label>
    </div>

    <div class="row">
      <label>
        Description:
        <textarea
          id="recipe-description"
          v-model="recipe.description"/>
      </label>
    </div>

    <div class="row ingredients">
      <strong>Ingredients:</strong>
      <div
        v-for="(ingredient, index) in recipe.ingredients"
        :key="ingredient.id"
        class="ingredient">
        <label>
          Name:
          <input
            v-model="ingredient.name"
            class="name"
            type="text"
            required>
        </label>

        <label>
          Amount:
          <input
            v-model="ingredient.amount"
            class="amount"
            type="text"
            required>
        </label>

        <label>
          Measure:
          <input
            v-model="ingredient.measure"
            class="measure"
            type="text"
            required>
        </label>
        <a @click.prevent="removeIngredient(index)">-</a>
      </div>
      <button @click.prevent="addIngredient">Add Ingredient</button>
    </div>

    <div class="row">
      <label>
        Instructions:
        <textarea
          id="recipe-instructions"
          v-model="recipe.instructions"
          required/>
      </label>
    </div>

    <div class="row">
      <label>
        Image:
        <input
          ref="filer"
          type="file"
          accept="image/*"
          @change="onFileChange">
      </label>

      <button
        v-if="recipe.image"
        @click.prevent="clearImage()">
        Clear Image
      </button>

      <span
        v-if="recipe.image"
        class="preview">
        Preview:
        <img :src="recipe.image">
      </span>
    </div>

    <div>
      <button
        id="save"
        @click.prevent="saveRecipe(true)">
        Save Recipe
      </button>
      <button
        id="save-new"
        @click.prevent="saveRecipe(false)">
        Save and New Recipe
      </button>
      <button
        id="cancel"
        @click.prevent="cancel()">
        Cancel
      </button>
    </div>

  </form>
</template>

<script>
import { RECIPE_TYPES, showNoty } from '../utility'

export default {
  name: 'RecipeAddEdit',

  data () {
    return {
      recipe: {
        category: 'Appetizer',
        ingredients: [{}]
      },
      recipeTypes: RECIPE_TYPES
    }
  },

  computed: {
    isEdit () { return (this.$route.params && this.$route.params.id) }
  },

  async mounted () {
    if (this.isEdit) {
      await this.getRecipe()
    }
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
        /* istanbul ignore next */
        showNoty(error)
      }
    },

    async saveRecipe (isComplete) {
      try {
        const response = this.isEdit
          ? await this.$http.put('recipes', this.recipe)
          : await this.$http.post('recipes', this.recipe)

        if (this.checkErrors(response) && isComplete) {
          this.$router.push({
            path: this.isEdit
              /* istanbul ignore next */
              ? '/recipe/' + this.recipe.id
              : '/'
          })
          showNoty(`Recipe ${response.data.name} ` + (this.isEdit
                  /* istanbul ignore next */
                   ? 'edited'
                   : 'added'),
                   'success')
          return
        }
      } catch(e) {
        showNoty('There was an error saving the recipe. Please try again.')
        return
      }

      this.resetForm()
    },

    resetForm () {
      this.recipe = {
        category: 'Appetizer',
        ingredients: [{}]
      }
    },

    cancel () {
      this.$router.go(-1)
    },

    addIngredient () {
      this.recipe.ingredients.push({})

      setTimeout(() => {
        let names = document.getElementsByClassName('name')

        names[names.length - 1].focus()
      }, 10)
    },

    removeIngredient (index) {
      this.recipe.ingredients.splice(index, 1)
    },

    clearImage () {
      let fileInput = this.$refs.filer

      fileInput.value = ''

      this.recipe.image = ''
      this.$forceUpdate()
    },

    onFileChange (e) {
      const files = e.target.files || e.dataTransfer.files

      if (!files.length) return

      let reader = new FileReader()
      let vm = this

      vm.recipe.image = new Image()

      reader.onload = e => {
        let img = new Image()

        img.onload = () => {
          /* istanbul ignore next */
          vm.recipe.image = vm.resizeImage(img)
          /* istanbul ignore next */
          vm.$forceUpdate()
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(files[0])
    },

    resizeImage (img) {
      const resizeHeight = 240

      let canvas = document.createElement('canvas')
      let ctx = canvas.getContext('2d')
      let aspectRatio = img.width / img.height

      canvas.height = resizeHeight
      canvas.width = resizeHeight * aspectRatio

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height)

      return canvas.toDataURL('image/jpeg', 0.7)
    },

    checkErrors (response) {
      if (response.data.message === 'success') {
        return true
      }

      response.data.errors
        .forEach(error => showNoty(this.transformErrorMessage(error.message)))

      return false
    },

    transformErrorMessage (message) {
      message = message.replace('.', ' ')
      message = message
        .replace(/([A-Z])/, (match, p1) => ' ' + p1.toLowerCase())
      message = message.charAt(0).toUpperCase() + message.slice(1) + '.'

      return message
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.14),
              0 1px 5px 0 rgba(0, 0, 0, 0.12),
              0 3px 1px -2px rgba(0, 0, 0, 0.2);
  padding: 1rem;

  h2 {
    margin-bottom: 1rem;

    span {
      border-left: 2px solid #841c26;
      color: #999;
      font-size: .7rem;
      font-weight: normal;
      margin-left: 2rem;
      padding-left: .4rem;
    }
  }

  [required] {
    border-left: 3px solid #841c26 !important;
  }

  .row {
    border-bottom: 1px solid #ccc;
    line-height: 3rem;
    padding-bottom: 3px;

    .ingredient:first-of-type {
      a {
        display: none;
      }
    }
  }

  .short-label {
    display: inline-block;
    width: 49%;
  }

  .ingredients {
    overflow: hidden;
    padding-bottom: 1rem;

    button {
      float: right;
    }
  }

  .ingredient {
    label {
      display: inline-block;
      width: 32%;
    }

    input[type="text"] {
      float: none;
      margin-left: 1rem;
      width: 60%;
    }

    a {
      background-color:#2b87d8;
      border: 1px solid #1c5f9a;
      border-radius: 3px;
      color: #fff;
      cursor: pointer;
      padding: 0 5px;
      text-decoration: none;
    }

    @media screen and (max-width: 800px) {
      label {
        width: 31.5%;
      }

      input[type="text"] {
        margin-right: 0;
        width: 55%;
      }
    }

    @media screen and (max-width: 500px) {
      label {
        width: 100%;
      }

      input[type="text"] {
        float: right;
      }
    }
  }

  input,
  select,
  textarea {
    background: #fff;
    border: 1px solid #aaa;
    border-radius: 3px;
    height: 2rem;
    font-size: 1rem;
    line-height: 1.5rem;
    max-width: 100%;
    outline: 0;
    padding: 2px 7px;
  }

  input:hover,
  select:hover,
  textarea:hover {
    border-color: #777;
  }

  input:active,
  input:focus,
  select:active,
  select:focus,
  textarea:active,
  textarea:focus {
    border-color: #333;
  }

  textarea {
    display: block;
    height: 100px;
    margin-bottom: 1rem;
    width: 100%;
  }

  input[type="text"],
  input[type="number"],
  select {
    float: right;
    margin-right: 1rem;
    margin-top: 9px;
    width: 45%;
  }

  .preview {
    display: block;

    img {
      vertical-align: top;
    }
  }

  button {
    background-color: #2b87d8;
    border: 1px solid #1c5f9a;
    border-radius: 3px;
    color: #fff;
    cursor: pointer;
    font-size: 1rem;
    margin-top: 1rem;
    outline: 0;
    padding: 10px;
    transition: all .2s ease-in-out;
  }

  button:hover {
    background-color: darken(#2b87d8, 5%);
  }

  button:active {
    background-color: darken(#2b87d8, 10%);
  }

  @media screen and (max-width: 725px) {
    .short-label {
      width: 100%;
    }

    input[type="text"],
    input[type="number"],
    select {
      margin-right: 0;
    }
  }
}
</style>
