import { createRouter, createWebHistory } from 'vue-router';
import ProductList from '../components/ProductList.vue';
import Admin from '../components/Admin.vue';
import ProductDetail from '../components/ProductDetail.vue';

const routes = [
  { path: '/', component: ProductList },
  { path: '/admin', component: Admin },
  { path: '/product/:id', component: ProductDetail, name: 'ProductDetail' },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
