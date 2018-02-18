import Vue from 'vue'
import VueRouter from 'vue-router'

import router from '@/router'
import TopNavigation from '@/components/TopNavigation'

describe('TopNavigation', () => {
  let vm

  beforeEach(() => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(TopNavigation)
    vm = new Constructor({ router }).$mount()

    Object.defineProperty(vm, '$route', {
      get() {
        return { path: '/' }
      }
    })
  })

  it('should be named "TopNavigation"', () => {
    expect(TopNavigation.name).to.equal('TopNavigation')
  })

  it('should compute the isHome property', () => {
    expect(vm.isHome).to.equal(true)
  })
})
