<template>
  <div class="flex justify-center">

    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891"> Registrar Doctor (a)</h1>
      </div>

      <!-- Contenedor registrar doctor -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <p class="text-[#163891] text-lg mb-8"> Completa los campos a continuación para agregar un nuevo doctor al
            sistema.</p>

          <!-- Campo Nombre -->
          <label class="text-[#163891] font-semibold mb-2 block text-lg">Nombre:</label>
          <input v-model="nombre" type="text"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-8 border-2 border-transparent focus:border-transparent focus:outline-none" />

          <!-- Campo Vinculación -->
          <label class="text-[#163891] font-semibold mb-2 block text-lg">Vinculación:</label>
          <div class="relative mb-8">
            <div class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full border-2 border-transparent cursor-pointer"
              @click="toggleVinculacionDropdown">
              <span v-if="vinculacion">{{ vinculacion }}</span>
              <span v-else>&nbsp;</span> <!-- Espacio en blanco si no hay selección -->
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[#163891]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <ul v-if="isVinculacionDropdownOpen" class="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
              <li v-for="opcion in opcionesVinculacion" :key="opcion" @click="selectVinculacion(opcion)"
                class="text-[#163891] hover:bg-gray-100 p-2 cursor-pointer">
                {{ opcion }}
              </li>
            </ul>
          </div>

          <!-- Campo Recepción -->
          <label class="text-[#163891] font-semibold mb-2 block text-lg">Recepción:</label>
          <div class="relative mb-8">
            <div class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full border-2 border-transparent cursor-pointer"
              @click="toggleRecepcionDropdown">
              <span v-if="recepcion">{{ recepcion }}</span>
              <span v-else>&nbsp;</span> <!-- Espacio en blanco si no hay selección -->
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                <svg class="w-5 h-5 text-[#163891]" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
            <ul v-if="isRecepcionDropdownOpen" class="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
              <li v-for="opcion in opcionesRecepcion" :key="opcion" @click="selectRecepcion(opcion)"
                class="text-[#163891] hover:bg-gray-100 p-2 cursor-pointer">
                {{ opcion.numero }}
              </li>
            </ul>
          </div>

          <!-- Botón Guardar -->
          <button @click="registrarDoctor" class="bg-[#2B3674] text-white font-semibold py-2 px-4 rounded-lg w-full"> Guardar</button>
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
      vinculacion: '',
      nombre:null,
      recepcion: '',
      opcionesVinculacion: ['Renta', 'No renta'],
      opcionesRecepcion: [],
      isVinculacionDropdownOpen: false,
      isRecepcionDropdownOpen: false,
    };
  },
  methods: {
    toggleVinculacionDropdown() {
      this.isVinculacionDropdownOpen = !this.isVinculacionDropdownOpen;
      this.isRecepcionDropdownOpen = false; // Cierra el otro dropdown
    },
    toggleRecepcionDropdown() {
      this.isRecepcionDropdownOpen = !this.isRecepcionDropdownOpen;
      this.isVinculacionDropdownOpen = false; // Cierra el otro dropdown
    },
    selectVinculacion(opcion) {
      this.vinculacion = opcion;
      this.isVinculacionDropdownOpen = false;
    },
    selectRecepcion(opcion) {
      this.recepcion = opcion.numero;
      this.$auxiliar.recepcion = opcion.id;
      this.isRecepcionDropdownOpen = false;
    },
    obtenerRecepciones() {
      let token = localStorage.getItem('token');
      axios
        .get(`${this.$apiRoute}/mostrar-recepciones`, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        })
        .then(response => {
          this.opcionesRecepcion = response.data.recepciones;
        })
        .catch(error => {
          console.error('Error al realizar la peticion:', error);
        });
    },
    registrarDoctor() {
      let token = localStorage.getItem('token');
      let vinculacion = false;
      if (this.vinculacion === 'Renta')
        vinculacion = true;
      axios
        .post(`${this.$apiRoute}/registrar-doctor`,
          {
            nombre: this.nombre,
            reception_id: this.$auxiliar.recepcion,
            vinculacion: vinculacion,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            }
          })
        .then(response => {
          alert(response.data.message);
          methods.deleteAuxProperties(this.$auxiliar);
          this.$router.go(-1);
        })
        .catch(error => {
          console.error(error);
          alert(error.response.data.message);
        });
    }
  },
  mounted() {
    this.obtenerRecepciones();
  }
};
</script>

<style scoped>
.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
