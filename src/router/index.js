import Vue from 'vue'
import Router from 'vue-router'

import RecipeList from '../components/RecipeList.vue'
import RecipeAddEdit from '../components/RecipeAddEdit.vue'

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
      path: '/recipe/:id',
      name: 'view-recipe'
    },
    {
      path: '/recipe-add',
      name: 'recipe-add',
      component: RecipeAddEdit
    },
    {
      path: '/recipe-edit/:id',
      name: 'recipe-edit'
    }
  ]
})
