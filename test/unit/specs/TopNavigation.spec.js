import Vue from 'vue'
import VueRouter from 'vue-router'
import TopNavigation from '@/components/TopNavigation'

describe('TopNavigation', () => {
  let vm

  beforeEach(() => {
    Vue.use(VueRouter)

    const router = new VueRouter({
      routes: [
        { path: '/', name: 'home', component: TopNavigation },
        { path: '/list', name: 'recipe-list' },
        { path: '/add', name: 'recipe-add' }
      ]
    })

    router.push({ name: 'home' })

    vm = new Vue({
      el: document.createElement('div'),
      router,
      render: h => h('router-view')
    }).$mount()
  })

  it('should be named "TopNavigation"', () => {
    expect(TopNavigation.name).to.equal('TopNavigation')
  })

  it('should compute the isHome property', () => {
    expect(vm.$children[0].isHome).to.equal(true)
  })
})
