<template>
  <form @submit.prevent="addRecipe">
    <h2>Add Recipe</h2>
    <div class="row">
      <label>
        Name:
        <input type="text" v-model="recipe.name">
      </label>

      <label>
        Category:
        <select v-model="recipe.category">
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
      <label>
        Prep Time:
        <input type="number" step="any" min="1"
          v-model="recipe.prepTime"> minutes
      </label>

      <label>
        Cook Time:
        <input type="text" step="any" min="1"
          v-model="recipe.cookTime"> minutes
      </label>
    </div>

    <div class="row">
      <label>
        Description:
        <textarea v-model="recipe.description"></textarea>
      </label>
    </div>

    <div class="row">
      <strong>Ingredients:</strong>
    </div>

    <div class="row">
      Instructions:
      <textarea v-model="recipe.instructions"></textarea>
    </div>

    <div class="row">
      Image: <input type="file">
    </div>

    <div>
      <button>Save Recipe</button>
      <button>Save and New Recipe</button>
      <button>Cancel</button>
    </div>
  </form>
</template>

<script>
export default {
  data () {
    return {
      recipe: {
        category: 'Appetizer'
      }
    }
  },

  methods: {
    addRecipe () {
      console.log('add recipe')
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
  }

  .row {
    border-bottom: 1px solid #ccc;
    line-height: 3rem;
    padding-bottom: 3px;
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
    outline: 0;
    padding: 2px 7px;
  }

  textarea {
    display: block;
    height: 100px;
    margin-bottom: 1rem;
    width: 100%;
  }

  button {
    background-color: #2b87d8;
    border: 1px solid #1c5f9a;
    border-radius: 3px;
    color: #fff;
    font-size: 1rem;
    margin-top: 1rem;
    padding: 10px;
  }
}
</style>
