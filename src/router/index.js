// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router';
import HomeView from '../views/HomeView.vue';
import LoginView from '../views/LoginView.vue';
import DoctoresView from '../views/DoctoresView.vue';
import PacientesView from '../views/PacientesView.vue';
import CitasView from '../views/CitasView.vue';
import RegisterView from '../views/RegisterView.vue';

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView
  },
  {
    path: '/registro',
    name: 'registro',
    component: RegisterView
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/doctores',
    name: 'doctores',
    component: DoctoresView,
    meta: { requiresAuth: true }
  },
  {
    path: '/pacientes',
    name: 'pacientes',
    component: PacientesView,
    meta: { requiresAuth: true }
  },
  {
    path: '/citas',
    name: 'citas',
    component: CitasView,
    meta: { requiresAuth: true }
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next({ name: 'login' });
  } else {
    next();
  }
});

export default router;
