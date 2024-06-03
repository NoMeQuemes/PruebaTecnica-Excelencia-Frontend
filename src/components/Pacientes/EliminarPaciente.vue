<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Paciente</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de querer eliminar este paciente?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                    <button @click="eliminarPaciente()" type="button" class="btn btn-primary">Sí, eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '../../../src/axios';

export default {
    name: "ModalEliminarPaciente",
    props: {
        idPaciente:{
            type: Number,
            required: true
        }
    },
    data() {
        return{

        }
    },
    methods: {
        eliminarPaciente(){
            const token = localStorage.getItem('token')
            apiClient.patch(`Pacientes/EliminarPaciente/${this.idPaciente}`, {} ,{
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