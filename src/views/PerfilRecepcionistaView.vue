<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891"> Perfil</h1>
      </div>

      <!-- Contenedor del perfil (PARA RECEPCIONISTAS) -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <h1 class="text-[#163891] font-semibold text-center text-xl mb:text-lg mb-3">{{ userName }}</h1>
          <p class="text-[#A3AED0] text-center text-lg mb:text-1sm mt-1">{{ userRole }}</p>
        </div>
      </div>

      <!-- Contenedor de Cerrar Sesión -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <h2 class="text-[#163891] text-xl font-semibold text-center mb-3"> Salir</h2>
          <p class="text-[#163891] text-base text-center mb-4">¿Estás seguro de que deseas salir de esta recepción?</p>

          <div class="flex justify-center">
            <button @click="cerrarSesion"
              class="bg-[#2B3674] text-white font-semibold justify-center px-6 py-2 rounded-lg w-32"> Aceptar</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import methods from '@/methods';

export default {
  data() {
    return {
      usuarios: [
        { nombre: "Juan Pérez", rol: "Administrador" },
        { nombre: "Ana Gómez", rol: "Recepcionista" },
        { nombre: "Carlos Ruiz", rol: "Médico" },
      ],
      userName: "Itzeli Padilla", // Nombre del usuario
      userRole: "Recepcionista", // Rol del usuario
    };
  },
  methods: {
    cerrarSesion() {
      let token = localStorage.getItem('token');
      axios
        .delete(`${this.$apiRoute}/logout`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          methods.deleteProperties(this.$user);
          alert(response.data.message);
          this.$router.push('/');
        })
        .catch(error => {
          if (error.status === 401)
            alert("error al cerrar sesion.");
          console.error("error al cerrar sesion", error);
        });
    },
  },
  mounted() {
    this.userName = this.$user.name;
  }
};
</script>

<style scoped>
.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>