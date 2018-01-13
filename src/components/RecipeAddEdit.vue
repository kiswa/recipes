<template>
  <form @submit.prevent="addRecipe">
    <h2>Add Recipe <span class="required">= required field</span></h2>
    <div class="row">
      <label class="short-label">
        Name:
        <input
          type="text"
          v-model="recipe.name"
          required>
      </label>

      <label class="short-label">
        Category:
        <select
          v-model="recipe.category"
          required>
          <option>Appetizer</option>
          <option>Beverage</option>
          <option>Dessert</option>
          <option>Dip</option>
          <option>Main Dish</option>
          <option>Sauce</option>
          <option>Side Dish</option>
          <option>Soup</option>
        </select>
      </label>
    </div>

    <div class="row">
      <label class="short-label">
        Prep Time (minutes):
        <input
          type="number"
          step="any"
          min="1"
          required
          v-model="recipe.prepTime">
      </label>

      <label class="short-label">
        Cook Time (minutes):
        <input
          type="text"
          step="any"
          min="1"
          required
          v-model="recipe.cookTime">
      </label>
    </div>

    <div class="row">
      <label>
        Description:
        <textarea v-model="recipe.description"/>
      </label>
    </div>

    <div class="row ingredients">
      <strong>Ingredients:</strong>
      <div
        class="ingredient"
        v-for="(ingredient, index) in recipe.ingredients"
        :key="ingredient.id">
        <label>
          Name:
          <input
            type="text"
            required
            v-model="ingredient.name">
        </label>
        <label>
          Amount:
          <input
            type="text"
            required
            v-model="ingredient.amount">
        </label>
        <label>
          Measure:
          <input
            type="text"
            required
            v-model="ingredient.measure">
        </label>
        <a @click.prevent="removeIngredient(index)">-</a>
      </div>
      <button @click.prevent="addIngredient">Add</button>
    </div>

    <div class="row">
      <label>
        Instructions:
        <textarea
          v-model="recipe.instructions"
          required/>
      </label>
    </div>

    <div class="row">
      <label>
        Image:
        <input
          type="file"
          accept="image/*"
          ref="filer"
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
      <button @click.prevent="addRecipe()">
        Save Recipe
      </button>
      <button @click.prevent="addRecipe();resetForm()">
        Save and New Recipe
      </button>
      <button @click.prevent="cancel()">
        Cancel
      </button>
    </div>
  </form>
</template>

<script>
export default {
  name: 'RecipeAddEdit',

  data () {
    return {
      recipe: {
        category: 'Appetizer',
        ingredients: [{}]
      }
    }
  },

  methods: {
    addRecipe () {
      console.log('add recipe')
    },

    resetForm () {
      this.recipe = {
        category: 'Appetizer',
        ingredients: [{}]
      }
    },

    cancel () {
      console.log('cancel')
    },

    addIngredient () {
      this.recipe.ingredients.push({})
    },

    removeIngredient (index) {
      this.recipe.ingredients.splice(index, 1)
    },

    clearImage () {
      let fileInput = this.$refs.filer

      fileInput.value = ''

      this.recipe.image = undefined
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
          vm.recipe.image = vm.resizeImage(img)
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
