import Vue from 'vue'
import RecipeAddEdit from '@/components/RecipeAddEdit'

describe('RecipeAddEdit', () => {
  const singlePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
  let vm

  beforeEach(() => {
    vm = new Vue(RecipeAddEdit).$mount()
  })

  it('should be named "RecipeAddEdit"', () => {
    expect(RecipeAddEdit.name).to.equal('RecipeAddEdit')
  })

  it('should have a default recipe object', () => {
    const data = RecipeAddEdit.data()

    expect(data.recipe).to.be.a('object')
    expect(data.recipe.category).to.equal('Appetizer')
    expect(data.recipe.ingredients.length).to.equal(1)
  })

  it('should have an addRecipe method', () => {
    expect(RecipeAddEdit.methods.addRecipe).to.be.a('function')

    let routerUsed = false
    let httpUsed = false
    let called = false

    Object.defineProperty(vm, '$http', {
      get: () => {
        return {
          post: () => {
            httpUsed = true

            return {
              then: func => {
                if (called) {
                  func(JSON.stringify({ message: 'success' }))
                } else {
                  func(JSON.stringify({ message: 'error' }))
                }

                called = true

                return {
                  catch: func => func()
                }
              }
            }
          }
        }
      }
    })

    Object.defineProperty(vm, '$router', {
      get: () => {
        return {
          push: () => {
            routerUsed = true
          }
        }
      }
    })

    vm.addRecipe(false)
    vm.addRecipe(true)

    expect(routerUsed).to.equal(true)
    expect(httpUsed).to.equal(true)
  })

  it('should have a resetForm method', () => {
    expect(RecipeAddEdit.methods.resetForm).to.be.a('function')

    vm.$data.recipe.category = 'Not Right'
    vm.resetForm()

    expect(vm.$data.recipe.category).to.equal('Appetizer')
  })

  it('should have a cancel method', () => {
    expect(RecipeAddEdit.methods.cancel).to.be.a('function')

    let routerUsed = false

    Object.defineProperty(vm, '$router', {
      get: () => {
        return {
          go: function () { routerUsed = true }
        }
      }
    })

    vm.cancel()
    expect(routerUsed).to.equal(true)
  })

  it('should have an addIngredient method', done => {
    expect(RecipeAddEdit.methods.addIngredient).to.be.a('function')
    expect(vm.$data.recipe.ingredients.length).to.equal(1)

    vm.addIngredient()

    Vue.nextTick(() => {
      expect(vm.$data.recipe.ingredients.length).to.equal(2)
      done()
    })
  })

  it('should have a removeIngredient method', () => {
    expect(RecipeAddEdit.methods.removeIngredient).to.be.a('function')

    expect(vm.$data.recipe.ingredients.length).to.equal(1)
    vm.removeIngredient()
    expect(vm.$data.recipe.ingredients.length).to.equal(0)
  })

  it('should have a clearImage method', () => {
    expect(RecipeAddEdit.methods.clearImage).to.be.a('function')

    vm.$data.recipe.image = 'somedata'
    vm.clearImage()

    expect(vm.$data.recipe.image).to.equal(undefined)
  })

  it('should have an onFileChange method', done => {
    expect(RecipeAddEdit.methods.onFileChange).to.be.a('function')

    let file = new Blob([singlePixel])
    file.name = 'testing.jpg'
    file.lastModifiedDate = new Date()

    const mockEvent = {
      target: {
        files: [file]
      }
    }
    const otherMockEvent = {
      target: {},
      dataTransfer: {
        files: [file]
      }
    }
    const badMockEvent = {
      target: { files: [] }
    }

    vm.onFileChange(mockEvent)
    vm.onFileChange(otherMockEvent)
    vm.onFileChange(badMockEvent)

    Vue.nextTick(() => {
      expect(vm.$data.recipe.image.toString())
        .to.equal('[object HTMLImageElement]')
      done()
    })
  })

  it('should have a resizeImage method', done => {
    expect(RecipeAddEdit.methods.resizeImage).to.be.a('function')

    let img = new Image(350, 350)
    img.onload = () => {
      let finalImg = new Image()

      finalImg.onload = () => {
        expect(finalImg.height).to.equal(240)
        expect(finalImg.width).to.equal(240)
        done()
      }
      finalImg.src = vm.resizeImage(img)
    }
    img.src = singlePixel
  })
})
