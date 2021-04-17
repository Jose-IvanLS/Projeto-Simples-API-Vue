import Vue from 'vue'
import VueRouter from 'vue-router'
import Pessoas from "@/views/Pessoas";
import Figurinhas from "@/views/Figurinhas";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Pessoas',
    component: Pessoas
  },
  {
    path: '/:usuario',
    name: 'Figurinhas',
    component: Figurinhas
  }
]
const router = new VueRouter({
  routes
})

export default router
