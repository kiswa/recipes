import Vue from 'vue'
import RecipeList from '@/components/RecipeList'

describe('RecipeList', () => {
  let vm

  beforeEach(() => {
    vm = new Vue(RecipeList).$mount()
  })

  it('should be named "RecipeList"', () => {
    expect(RecipeList.name).to.equal('RecipeList')
  })

  it('should have a RecipeCard component', () => {
    expect(RecipeList.components.RecipeCard).to.be.an('object')
  })

  it('should have a recipes array', () => {
    const data = RecipeList.data()

    expect(data.recipes).to.be.an('array')
  })

  it('should compute a noRecipes property', () => {
    vm.isLoading = false

    expect(vm.noRecipes).to.equal(true)
  })

  it('should watch the filterCategory property', () => {
    vm.filterCategory = 'test'

    expect(vm.recipes.length).to.equal(0)
  })

  it('should watch the search property', () => {
    vm.search = 'a'

    expect(vm.recipes.length).to.equal(0)
  })

  it('should have a getRecipes method', async () => {
    let httpUsed = false

    Object.defineProperty(vm, '$http', {
      get: () => {
        return {
          get: async () => {
            httpUsed = true

            return {
              then: func => {
                  func({ data: [{ test: true }] })

                return {
                  catch: func => func()
                }
              }
            }
          }
        }
      }
    })

    await vm.getRecipes()

    expect(httpUsed).to.equal(true)
    expect(vm.recipes[0].test).to.equal(true)
  })

  it('should have a filterRecipe method', () => {
    const recipe = { category: 'Test' }
    let result = vm.filterRecipe(recipe)

    expect(result).to.equal(false)

    vm.filterCategory = 'Test'
    result = vm.filterRecipe(recipe)

    expect(result).to.equal(true)
  })

  it('should have a filterSearch method', () => {
    vm.search = 'a'

    const recipe = { name: 'test' }
    let result = vm.filterSearch(recipe)

    expect(result).to.equal(false)
  })

  it('should have an addRecipe method', () => {
    let routerUsed = false

    Object.defineProperty(vm, '$router', {
      get: () => {
        return {
          push: () => {
            routerUsed = true
          }
        }
      }
    })

    vm.addRecipe()
    expect(routerUsed).to.equal(true)
  })
})
