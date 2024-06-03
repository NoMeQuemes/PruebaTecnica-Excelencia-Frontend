<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Doctor</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form class="row g-3">
                        <input type="hidden" v-model="form.idDoctor">
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">Nombre:</label>
                            <input type="text" class="form-control" id="nombre" v-model="form.nombre">
                        </div>
                        <div class="col-md-6">
                            <label for="recipient-name" class="col-form-label">Apellido:</label>
                            <input type="text" class="form-control" id="apellido" v-model="form.apellido">
                        </div>
                        <div class="">
                            <label for="recipient-name" class="col-form-label">Email:</label>
                            <input type="text" class="form-control" id="email" v-model="form.email">
                        </div>
                        <div class="">
                            <label for="recipient-name" class="col-form-label">Número de celular:</label>
                            <input type="number" class="form-control" id="numCelular" v-model="form.numCelular">
                        </div>
                        <div class="select">
                            <label class="form-label">Especialidad:</label>
                            <select v-model="form.idEspecialidad" class="form-select"
                                aria-label="Default select example">
                                <option v-for="especialidad in listaEspecialidades" :key="especialidad.idEspecialidad"
                                    :value="especialidad.idEspecialidad">
                                    {{ especialidad.nombre }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="actualizarDoctor(idDoctores)" type="button" class="btn btn-primary">Editar Doctor</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
// import axios from 'axios'
import apiClient from '../../../src/axios';



export default {
    name: 'ModalEditarDoctor',
    props: {
        idDoctor: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            listaEspecialidades: [],
            form: {
                "idDoctor": 0,
                "nombre": "",
                "apellido": "",
                "email": "",
                "numCelular": "",
                "idEspecialidad": 1
            }
        }
    },
    watch: {
        idDoctor: {
            handler(newIdDoctor) {
                this.completarDetallesDelDoctor(newIdDoctor);
            },
            immediate: true 
        }
    },
    mounted: function () {
        const token = localStorage.getItem('token');
        apiClient.get("Doctores/ListarEspecialidades", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(resultado => {
                this.listaEspecialidades = resultado.data.resultado;
            });
    },
    methods: {
        //Método para completar el formulario con los datos del doctor a actualizar
        completarDetallesDelDoctor(idDoctor) {
            const token = localStorage.getItem('token');
            apiClient.get(`Doctores/ListarPorId/${idDoctor}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    const data = resultado.data.resultado;
                    this.form = {
                        idDoctor: data.idDoctor,
                        nombre: data.nombre,
                        apellido: data.apellido,
                        email: data.email,
                        numCelular: data.numCelular,
                        idEspecialidad: data.idEspecialidad
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        },

        //Método para actualizar el doctor
        actualizarDoctor() {
            const token = localStorage.getItem('token');
            apiClient.put(`Doctores/ActualizarDoctor/${this.form.idDoctor}`, this.form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            .then( resultado => {
                console.log(resultado.data)
                window.location.reload();

            })
            .catch ( error => {
                console.log(error)
            });
        }

    }
}

</script>