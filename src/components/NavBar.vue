<template>

  <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">TurnosWeb</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarSupportedContent">
        <ul class="navbar-nav ms-auto mb-2 mb-lg-0" style="margin-right: 50px;">
          <li class="nav-item">
            <router-link :to="`/doctores`" class="nav-link active" aria-current="page">Doctores</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/citas`" class="nav-link active" aria-current="page">Citas</router-link>
          </li>
          <li class="nav-item">
            <router-link :to="`/pacientes`" class="nav-link active" aria-current="page">Pacientes</router-link>
          </li>
          <li class="nav-item dropdown">
            <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              <img src="../../public/img/usuario.png" class="d-inline-block align-text-top" width="27px">
            </a>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item" href="#">Perfil</a></li>
              <li><a class="dropdown-item" href="#">Another action</a></li>
              <li>
                <hr class="dropdown-divider">
              </li>
              <li>
                <cerrarsesion class="dropdown-item" href="#"></cerrarsesion>
              </li>
            </ul>
          </li>
          <!-- <li class="nav-item">
          <a class="nav-link disabled" aria-disabled="true">Disabled</a>
        </li> -->
        </ul>
        <!-- <form class="d-flex" role="search">
        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search">
        <button class="btn btn-outline-success" type="submit">Search</button>
      </form> -->
      </div>
    </div>
  </nav>
</template>

<script>
import LogoutButton from './LogoutButton.vue';

export default {
  name: 'NavBar',
  components: {
    'cerrarsesion': LogoutButton
  }
}
</script>