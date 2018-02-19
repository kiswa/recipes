import Vue from 'vue'
import VueRouter from 'vue-router'

import router from '@/router'
import RecipeAddEdit from '@/components/RecipeAddEdit'

describe('RecipeAddEdit', () => {
  const singlePixel = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8/x8AAwMCAO+ip1sAAAAASUVORK5CYII='
  let vm, routerUsed, httpUsed, called, throwError

  beforeEach(() => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(RecipeAddEdit)
    vm = new Constructor({
      router,
      params: { id: 0 }
    }).$mount()

    Object.defineProperty(vm, '$route', {
      get() {
        return { params: { id: 0 } }
      }
    })

    Object.defineProperty(vm, '$http', {
      get: () => {
        return {
          post: async () => {
            httpUsed = true

            return {
              then: func => {
                if (called) {
                  func({ data: { message: 'success' } })
                } else {
                  func({
                    data: {
                      message: 'error', errors: [{ message: 'Test' }]
                    }
                  })
                }

                called = true

                return {
                  catch: func => func()
                }
              }
            }
          },

          put: async () => {
            httpUsed = true
            return {
              then: func => {
                func({})

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
          },

          go: () => {
            routerUsed = true
          }
        }
      }
    })
  })

  it('should be named "RecipeAddEdit"', () => {
    expect(RecipeAddEdit.name).to.equal('RecipeAddEdit')
  })

  it('should have a default recipe object', () => {
    expect(vm.recipe).to.be.a('object')
    expect(vm.recipe.category).to.equal('Appetizer')
    expect(vm.recipe.ingredients.length).to.equal(1)
  })

  it('should load a recipe if in edit mode', () => {
    httpUsed = false
    called = 0

    const Constructor = Vue.extend(RecipeAddEdit)
    let lvm = new Constructor({
      router,
      computed: {
        isEdit() { return true }
      }
    })

    Object.defineProperty(lvm, '$http', {
      get: () => {
        return {
          get: async () => {
            httpUsed = true

            return {
              then: func => {
                if (called) {
                  func({ data: null })
                } else {
                  func({ data: { test: true } })
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

    lvm.$mount()
    lvm.$mount()

    expect(httpUsed).to.equal(true)
  })

  it('should have a saveRecipe method', async () => {
    expect(RecipeAddEdit.methods.saveRecipe).to.be.a('function')

    routerUsed = false
    httpUsed = false
    called = false

    await vm.saveRecipe(false)
    await vm.saveRecipe(true)

    expect(routerUsed).to.equal(true)
    expect(httpUsed).to.equal(true)

    httpUsed = false

    await vm.saveRecipe(false)
    expect(httpUsed).to.equal(true)
  })

  it('should update in saveRecipe method', async () => {
    httpUsed = false

    const Constructor = Vue.extend(RecipeAddEdit)
    let lvm = new Constructor({
      router,
      computed: {
        isEdit() { return true }
      }
    }).$mount()

    Object.defineProperty(lvm, '$http', {
      get: () => {
        return {
          put: async () => {
            httpUsed = true

            return {
              then: func => {
                func({ data: { message: 'success' } })
                return {
                  catch: func => func()
                }
              }
            }
          }
        }
      }
    })

    Object.defineProperty(lvm, '$router', {
      get: () => { push: () => {} }
    })

    await lvm.saveRecipe(true)

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

    routerUsed = false

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

    Object.defineProperty(vm, '$refs', {
      get() {
        return { filer: {} }
      }
    })

    vm.recipe.image = 'somedata'
    vm.clearImage()

    expect(vm.recipe.image).to.equal('')
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

  it('should have a checkErrors method', () => {
    const response = {
      data: {
        message: 'test',
        errors: [{ message: 'ooPsie' }]
      }
    }
    let result = vm.checkErrors(response)

    expect(result).to.equal(false)
  })

  it('should have a transformErrorMessage method', () => {
    let result = vm.transformErrorMessage('err.oops')

    expect(result).to.equal('Err oops.')
  })
})
