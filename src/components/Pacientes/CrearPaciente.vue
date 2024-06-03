<template>
    <!-- Modal -->
    <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Crear Paciente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" v-model="form.nombre">
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">Apellido:</label>
                            <input type="text" class="form-control" id="apellido" v-model="form.apellido">
                        </div>
                        <div class="">
                            <label for="recipient-name" class="col-form-label">Fecha de Nacimiento:</label>
                            <input type="date" class="form-control" id="fechaNacimiento" v-model="form.fechaNacimiento">
                        </div>
                        <div class="select">
                            <label class="form-label">Genero:</label>
                            <select v-model="form.idGenero" class="form-select" aria-label="Default select example">
                                <option v-for="genero in listarGeneros" :key="genero.idGenero" :value="genero.idGenero">
                                    {{ genero.nombre }}
                                </option>
                            </select>
                        </div>
                        <div class="">
                            <label for="recipient-name" class="col-form-label">Email:</label>
                            <input type="text" class="form-control" id="email" v-model="form.email">
                        </div>
                        <div class="">
                            <label for="recipient-name" class="col-form-label">Número de celular:</label>
                            <input type="number" class="form-control" id="numCelular" v-model="form.numCelular">
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="crearPaciente()" type="button" class="btn btn-primary">Guardar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '../../../src/axios';

export default {
    name: "ModalCrearDoctor",
    data() {
        return {
            listarGeneros: [],
            form: {
                "nombre": "",
                "apellido": "",
                "fechaNacimiento": "",
                "idGenero": 1,
                "email": "",
                "numCelular": ""
            }
        }
    },
    mounted: function () {
        const token = localStorage.getItem('token');
        apiClient.get("Pacientes/ListarGeneros", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resultado => {
                this.listarGeneros = resultado.data.resultado;
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
        }
    }
}
</script>