<template>
    <!-- Modal -->
    <div class="modal fade" id="staticModalDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1"
        aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="staticBackdropLabel">Eliminar Cita</h1>
                    <button type="button" class="btn-close" data-bs-target="#staticListarCitas" data-bs-toggle="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <p>¿Estás seguro de querer eliminar esta cita?</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-target="#staticListarCitas" data-bs-toggle="modal">Cerrar</button>
                    <button @click="eliminarCita()" type="button" class="btn btn-primary">Sí, eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import apiClient from '../../../src/axios';

export default {
    name: "ModalEliminarCita",
    props: {
        idCita:{
            type: Number,
            required: true
        }
    },
    data() {
        return{

        }
    },
    methods: {
        eliminarCita(){
            const token = localStorage.getItem('token')
            apiClient.patch(`Citas/EliminarCita/${this.idCita}`, {} ,{
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