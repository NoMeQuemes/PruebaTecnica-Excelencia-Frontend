<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalUpdate" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Editar Cita</h1>
                    <button type="button" class="btn-close" data-bs-target="#staticListarCitas" data-bs-toggle="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <form>
                        <input type="hidden" v-model="form.idCita">
                        <div class="mb-2">
                            <label class="form-label">Paciente:</label>
                            <select v-model="form.idPaciente" class="form-select" aria-label="Default select example">
                                <option v-for="paciente in pacientes" :key="paciente.idPaciente"
                                    :value="paciente.idPaciente">
                                    {{ paciente.nombre }} {{ paciente.apellido }}
                                </option>
                            </select>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Doctor:</label>
                            <select v-model="form.idDoctor" class="form-select" aria-label="Default select example">
                                <option v-for="doctor in doctores" :key="doctor.idDoctor" :value="doctor.idDoctor">
                                    {{ doctor.nombre }} {{ doctor.apellido }} | {{ doctor.especialidad }}
                                </option>
                            </select>
                        </div>
                        <div class="row mb-2">
                            <div class="col-6">
                                <label class="form-label">Fecha y hora de la cita:</label>
                                <input v-model="form.fechaCita" class="form-control" type="datetime-local">
                            </div>
                            <div class="col-6">
                                <label class="form-label">Motivo de la cita: </label>
                                <input v-model="form.motivo" class="form-control" type="text">
                            </div>
                        </div>
                        <div class="mb-2">
                            <label class="form-label">Estados:</label>
                            <select v-model="form.idEstado" class="form-select" aria-label="Default select example">
                                <option v-for="estado in estados" :key="estado.idEstado"
                                    :value="estado.idEstado">
                                    {{ estado.nombre }}
                                </option>
                            </select>
                        </div>
                    </form>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-target="#staticListarCitas"
                        data-bs-toggle="modal">Cerrar</button>
                    <button @click="actualizarCita(idCita)" type="button" class="btn btn-primary">Editar
                        Cita</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '../../../src/axios';


export default {
    name: 'ModalEditarCita',
    props: {
        idCita: {
            type: Number,
            required: true
        }
    },
    data() {
        return {
            estados: [],
            doctores: [],
            pacientes: [],
            form: {
                "idCita": 0,
                "idPaciente": 0,
                "idDoctor": 0,
                "fechaCita": "",
                "motivo": "",
                "idEstado": 0
            }
        }
    },
    watch: {
        idCita: {
            handler(newIdcita) {
                this.completarDetallesDeLaCita(newIdcita);
            },
            immediate: true // Para que se ejecute al inicio también
        }
    },
    mounted() {
        this.listarDoctores();
        this.listarPacientes();
        this.listarEstados();

    },
    methods: {
        //Método para completar el formulario con los datos de la cita a actualizar
        completarDetallesDeLaCita(idCita) {
            const token = localStorage.getItem('token');
            apiClient.get(`Citas/ListarPorId/${idCita}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    const data = resultado.data.resultado;
                    this.form = {
                        idCita: data.idCita,
                        idPaciente: data.idPaciente,
                        idDoctor: data.idDoctor,
                        fechaCita: data.fechaCita,
                        motivo: data.motivo,
                        idEstado: data.idEstado
                    };
                })
                .catch(error => {
                    console.error(error);
                });
        },

        //Método para actualizar el doctor
        actualizarCita() {
            const token = localStorage.getItem('token');
            apiClient.put(`Citas/ActualizarCita/${this.form.idCita}`, this.form, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    console.log(resultado.data)
                    window.location.reload();

                })
                .catch(error => {
                    console.log(error)
                });
        },

        listarDoctores() {
            const token = localStorage.getItem('token');
            apiClient.get("Doctores/ListarDoctores", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    this.doctores = resultado.data.resultado;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        listarPacientes() {
            const token = localStorage.getItem('token');
            apiClient.get("Citas/ListarPacientes", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    this.pacientes = resultado.data.resultado;
                })
                .catch(error => {
                    console.log(error)
                })
        },
        listarEstados() {
            const token = localStorage.getItem('token');
            apiClient.get("Citas/ListarEstados", {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
                .then(resultado => {
                    this.estados = resultado.data.resultado;
                })
                .catch(error => {
                    console.log(error)
                })
        },

    }
}

</script>