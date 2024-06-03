<template>
    <div class="container">
        <div class="login">
            <h4 style="text-align: center">Registrase</h4>
            <form class="mt-5">
                <div class="form-group">
                    <label class="form-label">Nombre de usuario:</label>
                    <input class="form-control" id="nombreUsuario" type="text" v-model="usuario.nombreUsuario">
                </div>
                <div class="form-group">
                    <label class="form-label">Contraseña:</label>
                    <input class="form-control" id="password" type="password" v-model="usuario.password">
                </div>
                <div class="d-grid gap-2 mt-4">
                    <button class="btn btn-success" @click="iniciarSesion()" type="button">Enviar</button>
                </div>
            </form>
        </div>
    </div>

    <!-- <NavBar></NavBar> -->
</template>

<script>
import apiClient from '../axios';

export default {
    name: 'LoginView',
    data() {
        return {
            usuario: {
                nombreUsuario: "",
                password: ""
            }
        }
    },
    methods: {
        async iniciarSesion() {
            try {
                const response = await apiClient.post("Acceso/Login", this.usuario, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                console.log(response.data);
                localStorage.setItem('token', response.data.token);
                localStorage.setItem('refreshToken', response.data.refreshToken);
                this.$router.push({ name: 'doctores' });
            } catch (error) {
                console.error('Login failed', error);
            }
        }
    }

}
</script>

<style scoped>
.container{
    margin-top: 80px
}

.login {
    border: 1px solid black;
    width: 400px;
    height: 450px;
    border-radius: 20px;
    padding: 15px;
    margin: auto;

}
</style>