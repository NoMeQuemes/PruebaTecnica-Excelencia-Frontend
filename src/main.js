// src/main.js
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';
import apiClient from './axios';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.bundle';
import { formatDate } from '@/Functions/FormatDate';
import { formatDateTime } from '@/Functions/FormatDate';

const app = createApp(App);

app.config.globalProperties.$formatDate = formatDate;
app.config.globalProperties.$formatDateTime = formatDateTime;
app.config.globalProperties.$axios = apiClient;

app.use(router).mount('#app');
