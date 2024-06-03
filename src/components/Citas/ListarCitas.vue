<template>
    <!-- Modal -->
    <div class="modal fade" id="staticListarCitas" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl modal-dialog modal-dialog-scrollable">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Lista de Citas</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <table class="table table-striped">
                        <thead>
                            <tr style="text-align: center;">
                                <th scope="col">#</th>
                                <th scope="col">Paciente</th>
                                <th scope="col">Doctor</th>
                                <th scope="col">Fecha de la Cita</th>
                                <th scope="col">Motivo</th>
                                <th scope="col">Estado</th>
                                <th scope="col">Fecha Creación de la Cita</th>
                                <th scope="col">Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="cita in listarCitas" :key="cita.idCita" style="text-align: center;">
                                <th>{{ cita.idCita }}</th>
                                <td>{{ cita.paciente }}</td>
                                <td>{{ cita.doctor }}</td>
                                <td>{{ $formatDateTime(cita.fechaCita) }}</td>
                                <td>{{ cita.motivo }}</td>
                                <td>{{ cita.estado }}</td>
                                <td>{{ $formatDate(cita.fechaCreacion) }}</td>
                                <td>
                                    <button class="btn btn-danger m-1" @click="showDeleteModal(cita.idCita)"
                                    data-bs-target="#staticModalDelete" data-bs-toggle="modal">
                                        <img src="../../../public/img/borrar.png" width="20px">
                                    </button>
                                    <button class="btn btn-primary" @click="showUpdateModal(cita.idCita)"
                                    data-bs-target="#staticModalUpdate" data-bs-toggle="modal">
                                        <img src="../../../public/img/editar.png" width="20px">
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>

    <modaleliminarcita :idCita="idCita"></modaleliminarcita>
    <modaleditarcita :idCita="idCita"></modaleditarcita>

</template>

<script>
import apiClient from '../../../src/axios';
import Modal from 'bootstrap/js/dist/modal';
import EliminarCita from '@/components/Citas/EliminarCita.vue';
import EditarCita from '@/components/Citas/EditarCita.vue';

export default {
    name: "ModalListarCitas",
    data() {
        return {
            listarCitas: [],
            form: {},
            idCita: null
        }
    },
    components: {
        'modaleliminarcita': EliminarCita,
        'modaleditarcita': EditarCita
    },
    mounted: function () {
        const token = localStorage.getItem('token');
        apiClient.get("Citas/ListarCitas", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resultado => {
                this.listarCitas = resultado.data.resultado;
            });
    },
    methods: {
        crearPaciente() {
            const token = localStorage.getItem('token')
            apiClient.post("Pacientes/CrearPaciente", this.form, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(response => {
                    console.log(response);
                    window.location.reload();
                })
                .catch(error => {
                    console.log(error)
                })
        },

        showDeleteModal(id) {
            this.idCita = id;
            const modal = new Modal(document.getElementById('staticModalDelete'));
            modal.show();
        },
        
        showUpdateModal(id) {
            this.idCita = id;
            const modal = new Modal(document.getElementById('staticModalUpdate'));
            modal.show();
        },
    }
}
</script>