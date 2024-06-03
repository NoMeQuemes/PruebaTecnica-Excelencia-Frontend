<template>
    <navbar></navbar>

    <div class="container">
        <div class="encabezado">
            <p class="titulo">PACIENTES</p>
        </div>
        <div class="opciones">
            <button @click="showCreateModal()" type="button" class="btn btn-primary">Crear Paciente</button>
        </div>
        <div class="lista">
            <table class="table table-striped">
                <thead>
                    <tr style="text-align: center;">
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Fecha Nacimiento</th>
                        <th scope="col">Genero</th>
                        <th scope="col">Email</th>
                        <th scope="col">Numero Celular</th>
                        <th scope="col">Fecha Creacion</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="paciente in listarPacientes" :key="paciente.idPaciente"  style="text-align: center;">
                        <th>{{ paciente.idPaciente }}</th>
                        <td>{{ paciente.nombre }}</td>
                        <td>{{ paciente.apellido }}</td>
                        <td>{{ $formatDate(paciente.fechaNacimiento) }}</td>
                        <td>{{ paciente.genero }}</td>
                        <td>{{ paciente.email }}</td>
                        <td>{{ paciente.numCelular }}</td>
                        <td>{{ $formatDate(paciente.fechaCreacion) }}</td>
                        <td>
                            <button class="btn btn-danger m-1" @click="showDeleteModal(paciente.idPaciente)">
                                <img src="../../public/img/borrar.png" width="20px">
                            </button>
                            <button class="btn btn-primary" @click="showUpdateModal(paciente.idPaciente)">
                                <img src="../../public/img/editar.png" width="20px">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- MODAL PARA CREAR PACIENTE -->
    <modalcrearpaciente></modalcrearpaciente>
    <!-- MODAL PARA ELIMINAR  PACIENTE -->
    <modaleliminarpaciente :idPaciente="idPaciente"></modaleliminarpaciente>
    <!-- MODAL PARA EDITAR PACIENTE -->
    <modaleditarpaciente :idPaciente="idPaciente"></modaleditarpaciente>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import apiClient from '../axios';
import Modal from 'bootstrap/js/dist/modal';
import CrearPaciente from '@/components/Pacientes/CrearPaciente.vue'
import EliminarPaciente from '@/components/Pacientes/EliminarPaciente.vue'
import EditarPaciente from '@/components/Pacientes/EditarPaciente.vue'

export default {
    name: 'PacientesView',
    data() {
        return {
            listarPacientes: [],
            idPaciente: null
        };
    },
    components: {
        'navbar': NavBar,
        'modalcrearpaciente': CrearPaciente,
        'modaleliminarpaciente' : EliminarPaciente,
        'modaleditarpaciente': EditarPaciente
    },
    mounted: function () {
        const token = localStorage.getItem('token');
        apiClient.get("Pacientes/ListarPacientes", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resultado => {
                this.listarPacientes = resultado.data.resultado;
            });
    },
    methods: {
        //Método para mostrar el modal para crear paciente
        showCreateModal() {
            const modal = new Modal(document.getElementById('staticBackdrop'));
            modal.show();
        },

        //Método para mostrar el modal para eliminar paciente
        showDeleteModal(id) {
            this.idPaciente = id;
            const modal = new Modal(document.getElementById('staticModalDelete'));
            modal.show();
        },
        // Método para mostrar el modal para editar al paciente
        showUpdateModal(id){
            this.idPaciente = id;
            const modal = new Modal(document.getElementById('staticModalUpdate'));
            modal.show();
        },
    }
};
</script>

<style scoped>
.container{
    margin-top: 50px 
}

.titulo{
    text-align: center;
    background-color: gray;
    border-radius: 20px;
    color: white;
}
</style>