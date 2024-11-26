<template>
  <div class="flex">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar" ></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891"> Formulario Ingreso </h1>
      </div>

      <!-- Contenedor del formulario -->
      <div class="bg-white rounded-2xl p-8 w-full max-w-xl mx-auto mt-10">
        <p class="text-gray-700 text-lg mb-7" style="color: #163891"> Completa el siguiente formulario para registrar un nuevo caso. Asegúrate de ingresar correctamente los datos antes de guardar.</p>

        <!-- Formulario -->
        <form @submit.prevent="guardarCaso">
          <!-- Campo Número de Pacientes -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-4 text-lg"  for="numeroPacientes" style="color: #163891"> Número de pacientes: </label>
            <input type="number"
              id="numeroPacientes"
              v-model="form.numeroPacientes"
              min="1"
              class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-3 border-2 border-transparent focus:border-transparent focus:outline-none"
            />
          </div>

          <!-- Campo Desglose -->
          <div class="mb-7">
            <label class="block text-gray-700 font-semibold mb-4 text-lg" for="desglose" style="color: #163891"> Desglose:</label>
            <div class="relative">
              <div class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full border-2 border-transparent cursor-pointer"
                @click="toggleDesgloseDropdown"
              >
                <span v-if="form.desglose">{{ form.desglose }}</span>
                <span v-else>&nbsp;</span> 
              </div>
              <ul v-if="isDesgloseDropdownOpen" class="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
                <li
                  v-for="opcion in opcionesDesglose"
                  :key="opcion"
                  @click="selectDesglose(opcion)"
                  class="text-[#163891] hover:bg-gray-100 p-2 cursor-pointer"
                >
                  {{ opcion }}
                </li>
              </ul>
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-2">
                <svg class="w-5 h-5 text-[#163891] -mt-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Campo Doctor(a) -->
          <div class="mb-4">
            <label class="block text-gray-700 font-semibold mb-4 text-lg"  for="doctor" style="color: #163891">Doctor(a):</label>
            <div class="relative mb-6">
              <div class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full border-2 border-transparent cursor-pointer"
                @click="toggleDoctorDropdown"
              >
                <span v-if="form.doctor">{{ form.doctor }}</span>
                <span v-else>&nbsp;</span> 
              </div>
              <ul v-if="isDoctorDropdownOpen" class="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg">
                <li
                  v-for="doctor in doctores"
                  :key="doctor.id"
                  @click="selectDoctor(doctor.nombre)"
                  class="text-[#163891] hover:bg-gray-100 p-2 cursor-pointer"
                >
                  {{ doctor.nombre }}
                </li>
              </ul>
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-2">
                <svg class="w-5 h-5 text-[#163891] -mt-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

          <!-- Botón Guardar -->
          <div class="text-center">
            <button type="submit" class="bg-[#2B3674] text-white font-semibold py-2 w-full rounded-lg">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        numeroPacientes: '',
        desglose: '',
        doctor: '',
      },
      doctores: [
        { id: 1, nombre: "Dr. Pérez" },
        { id: 2, nombre: "Dra. Gómez" },
        { id: 3, nombre: "Dr. López" },
      ],
      opcionesDesglose: ['Consulta', 'Revisión', 'Ingreso', 'Espontáneo', 'Seguro'],
      isDoctorDropdownOpen: false,
      isDesgloseDropdownOpen: false,
    };
  },
  methods: {
    toggleDoctorDropdown() {
      this.isDoctorDropdownOpen = !this.isDoctorDropdownOpen;
    },
    toggleDesgloseDropdown() {
      this.isDesgloseDropdownOpen = !this.isDesgloseDropdownOpen;
    },
    selectDoctor(opcion) {
      this.form.doctor = opcion;
      this.isDoctorDropdownOpen = false;
    },
    selectDesglose(opcion) {
      this.form.desglose = opcion;
      this.isDesgloseDropdownOpen = false;
    },
    guardarCaso() {
    },
  },
};
</script>

<style scoped>
input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
select {
  -webkit-appearance: none; /* Oculta la flecha en Safari */
  -moz-appearance: none; /* Oculta la flecha en Firefox */
  appearance: none; /* Oculta la flecha en otros navegadores */
}
</style>

