import { createRouter, createWebHistory } from 'vue-router'
import { useStore } from './composables/useStore'

import Catalog from './components/Catalog.vue'
import Item from './components/Item.vue'
import ItemReviews from './components/ItemReviews.vue'

import Admin from './components/Admin.vue'
import AdminList from './components/AdminList.vue'
import AdminAdd from './components/AdminAdd.vue'
import AdminEdit from './components/AdminEdit.vue'

import Login from './components/Login.vue'
import Register from './components/Register.vue'
import Profile from './components/Profile.vue'
import Cart from './components/Cart.vue'
import Favorites from './components/Favorites.vue'
import About from './components/About.vue'

import NotFound from './components/NotFound.vue'

const routes = [
  { path: '/', component: Catalog, name: 'Catalog' },
  { path: '/about', component: About, name: 'About' },
  { path: '/login', component: Login, name: 'Login' },
  { path: '/register', component: Register, name: 'Register' },
  { path: '/profile', component: Profile, name: 'Profile', meta: { requiresAuth: true } },
  { path: '/cart', component: Cart, name: 'Cart' },
  { path: '/favorites', component: Favorites, name: 'Favorites' },

  {
    path: '/item/:id',
    component: Item,
    name: 'Item'
  },

  {
    path: '/admin',
    component: Admin,
    name: 'Admin',
    meta: { admin: true },
    children: [
      { path: 'list', component: AdminList, name: 'AdminList' },
      { path: 'add', component: AdminAdd, name: 'AdminAdd' },
      { path: 'edit/:id', component: AdminEdit, name: 'AdminEdit' },
      { path: 'reviews', component: ItemReviews, name: 'ItemReviews' }
    ]
  },

  { path: '/:pathMatch(.*)*', component: NotFound, name: 'NotFound' }
]

export const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.name === from.name) {
      return false 
    }
  
    return { top: 0, behavior: 'smooth' }
  }
})

router.beforeEach((to, from, next) => {
  const store = useStore()
  
  if (to.meta.admin && !store.isAdmin.value) {
    next({ name: 'Catalog' })
    return
  }
  
  if (to.meta.requiresAuth && !store.currentUser.value) {
    next({ name: 'Login' })
    return
  }
  
  next()
})