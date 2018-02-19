import Vue from 'vue'
import RecipeDetail from '@/components/RecipeDetail'

describe('RecipeDetail', () => {
  let vm, httpUsed, routerUsed, called

  beforeEach(() => {
    vm = new Vue(RecipeDetail).$mount()

    Object.defineProperty(vm, '$route', {
      get: () => {
        return { params: { id: 1 } }
      }
    })

    Object.defineProperty(vm, '$router', {
      get: () => {
        return {
          push: function () { routerUsed = true }
        }
      }
    })

    Object.defineProperty(vm, '$http', {
      get: () => {
        return {
          get: async () => {
            httpUsed = true

            return {
              then: func => {
                if (called) {
                  func({
                    data: {
                      test: true,
                      instructions: ''
                    }
                  })
                } else {
                  func({ data: null })
                }

                return { catch: func => func() }
              }
            }
          },

          delete: async () => {
            httpUsed = true

            return {
              then: func => {
                func({})

                return { catch: func => func() }
              }
            }
          }
        }
      }
    })
  })

  it('should be named "RecipeList"', () => {
    expect(RecipeDetail.name).to.equal('RecipeDetail')
  })

  it('should have a default recipe object', () => {
    expect(vm.recipe.name).to.equal('Invalid Recipe')
    expect(vm.recipe.category).to.equal('')
    expect(vm.recipe.image).to.equal('')
    expect(vm.recipe.description).to.equal('Try the Recipe List instead.')
    expect(vm.recipe.prepTime).to.equal(0)
    expect(vm.recipe.cookTime).to.equal(0)
    expect(vm.recipe.ingredients.length).to.equal(0)
    expect(vm.recipe.instructions).to.equal('')
  })

  it('should compute an imageStyle property', () => {
    vm.recipe.image = 'test.jpg'

    expect(vm.imageStyle).to.equal('background-image: url(test.jpg);')
  })

  it('should have a getRecipe method', async () => {
    httpUsed = false
    called = true

    await vm.getRecipe()

    expect(httpUsed).to.equal(true)
    expect(vm.recipe.test).to.equal(true)
  })

  it('should handle null returns in getRecipe', async () => {
    httpUsed = false
    routerUsed = false
    called = false

    await vm.getRecipe()

    expect(httpUsed).to.equal(true)
    expect(routerUsed).to.equal(true)
  })

  it('should have a deleteRecipe method', () => {
    vm.deleteRecipe()

    const noty = document.getElementById('noty_layout__topCenter')

    expect(noty.children.length > 0).to.equal(true)
  })

  it('should have an editRecipe method', () => {
    routerUsed = false

    vm.editRecipe()

    expect(routerUsed).to.equal(true)
  })

  it('should have a closeCheck method', () => {
    let closed = false

    vm.closeCheck()

    vm.check = { close: () => closed = true}
    vm.closeCheck()

    expect(closed).to.equal(true)
  })

  it('should have a realDelete method', async () => {
    httpUsed = false
    routerUsed = false

    let notyClosed = false
    let called = false

    vm.check = {
      close: () => {
        notyClosed = true
      }
    }

    await vm.realDelete()
    expect(notyClosed).to.equal(true)

    vm.check.close = () => {
      if (!called) {
        called = true
        throw new Exception()
      }
    }
    await vm.realDelete()

    expect(httpUsed).to.equal(true)
    expect(routerUsed).to.equal(true)
  })
})
