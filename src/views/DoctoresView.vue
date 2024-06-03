<template>
    <navbar></navbar>

    <div class="container">
        <div class="encabezado">
            <p class="titulo">DOCTORES</p>
        </div>
        <div class="opciones">
            <button @click="showCreateModal()" type="button" class="btn btn-primary">Crear Doctor</button>
        </div>
        <div class="lista">
            <table class="table table-striped">
                <thead>
                    <tr style="text-align: center;">
                        <th scope="col">#</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Apellido</th>
                        <th scope="col">Email</th>
                        <th scope="col">N° celular</th>
                        <th scope="col">Especialidad</th>
                        <th scope="col">Creación</th>
                        <th scope="col">Acciones</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="doctor in listaDoctores" :key="doctor.idDoctor"  style="text-align: center;">
                        <th>{{ doctor.idDoctor }}</th>
                        <td>{{ doctor.nombre }}</td>
                        <td>{{ doctor.apellido }}</td>
                        <td>{{ doctor.email }}</td>
                        <td>{{ doctor.numCelular }}</td>
                        <td>{{ doctor.especialidad }}</td>
                        <td>{{ $formatDate(doctor.fechaCreacion) }}</td>
                        <td>
                            <button class="btn btn-danger m-1" @click="showDeleteModal(doctor.idDoctor)">
                                <img src="../../public/img/borrar.png" width="20px">
                            </button>
                            <button class="btn btn-primary" @click="showUpdateModal(doctor.idDoctor)">
                                <img src="../../public/img/editar.png" width="20px">
                            </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <!-- MODAL PARA CREAR DOCTOR -->
    <modalcreardoctor></modalcreardoctor>
    <!-- MODAL PARA ELIMINAR DOCTOR -->
    <modaleliminardoctor :idDoctor="idDoctor"></modaleliminardoctor>
    <!-- MODAL PARA EDITAR DOCTOR -->
    <modaleditardoctor :idDoctor="idDoctor"></modaleditardoctor>
</template>

<script>
import NavBar from '@/components/NavBar.vue';
import CrearDoctor from '@/components/Doctores/CrearDoctor.vue';
import EliminarDoctor from '@/components/Doctores/EliminarDoctor.vue';
import ModalEditarDoctor from '@/components/Doctores/EditarDoctor.vue';
// import axios from 'axios';
import Modal from 'bootstrap/js/dist/modal';
import apiClient from '../axios';


export default {
    name: 'DoctoresView',
    data() {
        return {
            listaDoctores: [],
            idDoctor: null
        };
    },
    components: {
        'navbar': NavBar,
        'modalcreardoctor': CrearDoctor,
        'modaleliminardoctor': EliminarDoctor,
        'modaleditardoctor': ModalEditarDoctor
    },
    mounted: function () {
        const token = localStorage.getItem('token');
        apiClient.get("Doctores/ListarDoctores", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resultado => {
                this.listaDoctores = resultado.data.resultado;
            });
    },
    methods: {
        //Método para mostrar el modal para crear doctor
        showCreateModal() {
            const modal = new Modal(document.getElementById('staticBackdrop'));
            modal.show();
        },

        //Método para mostrar el modal para eliminar doctor
        showDeleteModal(id) {
            this.idDoctor = id;
            const modal = new Modal(document.getElementById('staticModalDelete'));
            modal.show();
        },
        // Método para mostrar el modal para editar al doctor
        showUpdateModal(id){
            this.idDoctor = id;
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