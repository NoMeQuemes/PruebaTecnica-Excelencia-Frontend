<template>

    <navbar></navbar>

    <div class="container">
        <div class="encabezado">
            <div class="d-flex justify-content-between align-items-center">
                <h2>Citas Médicas</h2>
                <button @click="showListarModal()" type="button" class="btn btn-outline-info" data-bs-toggle="tooltip" data-bs-placement="bottom" data-bs-title="Ver agenda de">
                    <img src="../../public/img/agenda.png" width="20px">
                </button>

                <modallistarcitas></modallistarcitas>

            </div>
            <p>Desde acá podrás asignar turnos</p>
        </div>
        <div class="">
            <form>
                <div class="mb-2">
                    <label class="form-label">Paciente:</label>
                    <select v-model="form.idPaciente" class="form-select" aria-label="Default select example">
                        <option v-for="paciente in pacientes" :key="paciente.idPaciente" :value="paciente.idPaciente">
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
                <div class="d-grid gap-2 mt-5">
                    <button @click="guardarCita()" class="btn btn-success m-1">Guardar Cita</button>
                    <button  class="btn btn-secondary m-1" type="reset">Reiniciar</button>
                </div>
            </form>
        </div>

    </div>
</template>

<script>
import apiClient from '../axios';
import NavBar from '@/components/NavBar.vue';
import Modal from 'bootstrap/js/dist/modal';
import ListarCitas from '@/components/Citas/ListarCitas.vue';

export default {
    name: 'CitasView',
    data() {
        return {
            doctores: [],
            pacientes: [],
            form: {
                "idPaciente": 0,
                "idDoctor": 0,
                "fechaCita": "",
                "motivo": "",
            }
        };
    },
    components: {
        'navbar': NavBar,
        'modallistarcitas': ListarCitas
    },
    mounted() {
        this.listarDoctores();
        this.listarPacientes();
    },
    methods: {
        guardarCita() {
            const token = localStorage.getItem('token')
            apiClient.post("Citas/CrearCita", this.form, {
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
        showListarModal(){
            const modal = new Modal(document.getElementById('staticListarCitas'));
            modal.show();
        }
    }
}

</script>

<style scoped>
.container {
    margin-top: 30px;
}
</style>