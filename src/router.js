import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Posts from './views/Posts'
import Images from './views/Images'
import Upload from './views/Upload'
import Form from './views/Form'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/posts',
      name: 'posts',
      component: Posts,
    },
    {
      path: '/images',
      name: 'images',
      component: Images,
    },
    {
      path: '/upload',
      name: 'upload',
      component: Upload,
    },
    {
      path: '/form',
      name: 'form',
      component: Form,
    },
  ],
})
