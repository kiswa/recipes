import Vue from 'vue'
import VueRouter from 'vue-router'

import router from '@/router'
import App from '@/App'

describe('App', () => {
  let vm

  beforeEach(() => {
    Vue.use(VueRouter)
    const Constructor = Vue.extend(App)
    vm = new Constructor({ router }).$mount()
  })

  it('should be named "App"', () => {
    expect(App.name).to.equal('App')
  })

  it('should have an updateSearch method', () => {
    vm.updateSearch('test')

    expect(vm.searchText).to.equal('test')
  })
})
