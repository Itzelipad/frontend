<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891">
          Agregar Recepción
        </h1>
      </div>

      <!-- Formulario para registrar recepcion -->
      <div class="flex justify-center items-center mt-6 md:mt-10 rounded-2xl">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <p class="text-[#163891] text-lg mb-8"> Completa los siguientes campos para registrar una nueva recepción.</p>

          <label class="text-[#163891] font-semibold mb-6 block text-lg">Número de recepción:</label>
          <input type="text" v-model="numero"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-8 border-2 border-transparent focus:border-transparent focus:outline-none" />

          <label class="text-[#163891] font-semibold mb-6 block text-lg">Edificio:</label>
          <input type="text" v-model="edificio"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-8 border-2 border-transparent focus:border-transparent focus:outline-none" />

          <button @click="registrarRecepcion" class="bg-[#2B3674] text-white font-semibold py-2 px-4 rounded-lg w-full">
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
export default {
  data() {
    return {
      numero: null,
      edificio: null,
    }
  },
  methods: {
    registrarRecepcion() {
      let token = localStorage.getItem('token');
      axios
        .post(`${this.$apiRoute}/registrar-recepcion`,
        {
          numero: this.numero,
          edificio: this.edificio,
        },
        {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          alert(response.data.message);
          this.$router.go(-1);
        })
        .catch(error => {
          alert(error.response.data.message);
        });
    }
  }
};
</script>

<style scoped>
.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
