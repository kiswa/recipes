<template>
  <div>
    <div id="filter">
      Show:
      <select>
        <option>All Recipes</option>
      </select>
    </div>
    <div id="recipes">
      <recipe-card
        v-for="recipe in recipes"
        :key="recipe.id"
        :recipe="recipe"/>
    </div>
  </div>
</template>

<script>
import RecipeCard from './RecipeCard.vue'

export default {
  name: 'RecipeList',

  components: {
    RecipeCard
  },

  data () {
    return {
      recipes: [
        {
          id: 1,
          title: 'Food Thing',
          type: 'Main Dish',
          imgSrc: 'https://loremflickr.com/320/240?random=1',
          description: 'Something interesting about the dish.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 2,
          title: 'Food Thing',
          type: 'Appetizer',
          imgSrc: '',
          description: 'Something interesting about the dish.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 3,
          title: 'Food Thing',
          type: 'Soup',
          imgSrc: 'https://loremflickr.com/320/240?random=3',
          description: 'Something interesting about the dish that takes up more space than the others.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 4,
          title: 'Food Thing',
          type: 'Main Dish',
          imgSrc: 'https://loremflickr.com/320/240?random=4',
          description: 'Something interesting about the dish that takes up more space than the others.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 5,
          title: 'Food Thing',
          type: 'Main Dish',
          imgSrc: 'https://loremflickr.com/320/240?random=5',
          description: 'Something interesting about the dish.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 6,
          title: 'Food Thing',
          type: 'Main Dish',
          imgSrc: 'https://loremflickr.com/320/240?random=6',
          description: 'Something interesting about the dish.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        },
        {
          id: 7,
          title: 'Food Thing',
          type: 'Main Dish',
          imgSrc: 'https://loremflickr.com/320/240?random=7',
          description: 'Something interesting about the dish that takes up more space than the others.',
          recipeTime: '3 years',
          prepTime: '1 year',
          cookTime: '2 years'
        }
      ]
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
