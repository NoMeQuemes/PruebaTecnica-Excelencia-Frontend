// src/components/LogoutButton.vue
<template>
  <button @click="logout">Cerrar Sesión</button>
</template>

<script>
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();

    const logout = () => {
      localStorage.removeItem('token');
      localStorage.removeItem('refresh_token');
      router.push({ name: 'login' });
    };

    return { logout };
  }
};
</script>
