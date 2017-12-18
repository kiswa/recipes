import Vue from 'vue'
import Router from 'vue-router'

import RecipeList from '../components/RecipeList.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'recipe-list',
      component: RecipeList
    },
    {
      path: '/recipe-add',
      name: 'recipe-add'
    }
  ]
})