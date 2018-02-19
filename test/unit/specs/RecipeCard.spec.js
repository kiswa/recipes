import Vue from 'vue'
import RecipeCard from '@/components/RecipeCard'

describe('RecipeCard', () => {
  let vm

  beforeEach(() => {
    const Constructor = Vue.extend(RecipeCard)
    const recipeMock = {
      name: 'testing',
      category: 'test',
      image: 'test.jpg',
      description: 'testing',
      prepTime: 1,
      cookTime: 1
    }

    vm = new Constructor({ propsData: { recipe: recipeMock } }).$mount()
  })

  it('should be named "RecipeCard"', () => {
    expect(RecipeCard.name).to.equal('RecipeCard')
  })

  it('should have a default recipe object if not passed in', () => {
    vm = new Vue(RecipeCard).$mount()

    expect(vm.recipe).to.be.an('object')
    expect(vm.recipe.name).to.equal('')
  })

  it('should load a recipe in props', () => {
    expect(vm.recipe.name).to.equal('testing')
  })

  it('should compute an imageStyle property', () => {
    expect(vm.imageStyle).to.equal('background-image: url(test.jpg);')
  })

  it('should compute a recipeTime property', () => {
    expect(vm.recipeTime).to.equal('2 mins')
  })

  it('should have a viewRecipe method to navigate to a recipe', () => {
    expect(vm.viewRecipe).to.be.a('function')

    let routerUsed = false

    Object.defineProperty(vm, '$router', {
      get: () => {
        return {
          push: function () { routerUsed = true }
        }
      }
    })

    vm.viewRecipe(1)

    expect(routerUsed).to.equal(true)
  })
})
