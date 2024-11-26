<template>
  <div class="container mx-auto bg-white p-6 rounded-2xl mt-10 w-[330px] md:w-[1143px] ml-0 md:ml-10">
    <div class="flex justify-between items-center mb-4">
      <h2 class="text-xl font-semibold text-[#163891] ml-2 md:ml-4"> Doctores</h2>
      <div class="flex items-center space-x-4 relative">

        <!-- Div para el rango de fechas, visible solo cuando se selecciona la opción -->
        <div v-if="selectedOption === 'Rango de fechas'" class="flex items-center space-x-4">
          <div class="bg-white rounded-2xl p-1 h-[35px] flex items-center space-x-2">
            <span class="ml-4 text-[#A3AED0] font-medium text-sm">Inicio:</span>
            <input type="date" v-model="startDate" @change="updateRange" class="border border-transparent rounded-md p-1 text-sm text-[#163891] font-medium focus:outline-none"/>
          </div>

          <div class="bg-white rounded-2xl p-1 h-[35px] flex items-center space-x-2">
            <span class="ml-4 text-[#A3AED0] font-medium text-sm">Fin:</span>
            <input type="date" v-model="endDate" @change="updateRange" class="border border-transparent rounded-md p-1 text-sm text-[#163891] font-medium focus:outline-none"/>
          </div>
        </div>

        <button
          @click="toggleOptions"
          class="flex items-center justify-between rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#163891] focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2"
        >
          {{ selectedTimeLabel }}
          <svg
            class="ml-2 h-4 w-4 text-[#163891] transition-transform"
            :class="{ 'rotate-180': isOpen }"
            fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/>
          </svg>
        </button>

        <div v-if="isOpen" class="absolute right-0 mt-1 w-52 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto z-20"
        >
          <div class="py-1" role="menu" aria-orientation="vertical">
            <button
              v-for="(option, index) in options"
              :key="index"
              class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
              @click.prevent="selectOption(option)"
            >
              {{ option }}
            </button>
            <button
              v-if="isLargeScreen"
              class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
              @click.prevent="selectOption('Rango de fechas')"
            >
              Rango de fechas
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Tabla -->
    <table class="min-w-full border-collapse mt-6">
      <thead>
        <tr class="border-b">
          <th class="text-left py-2 text-center text-[#A3AED0] font-normal w-3/2 md:w-1/4"> Nombre</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Vinculación</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Consulta</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Revisión</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Ingreso</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Espontáneo</th>
          <th class="hidden md:table-cell text-left py-2 text-center text-[#A3AED0] font-normal w-1/8">Seguro</th>
          <th class="text-left py-2 text-center text-[#A3AED0] font-normal w-[100px]">Total</th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(doctor, index) in filteredDoctors"
          :key="index"
          class="text-center text-[#163891] cursor-pointer"
          :class="{
            'hover:bg-gray-100': selectedDoctorIndex !== index, // Fondo gris claro al pasar el mouse
          }"
          @click="selectDoctor(index)"
        >
          <td class="py-2 break-words max-w-[300px] text-center pl-2">{{ doctor.nombre }}</td>
          <!-- Ocultar estas columnas en pantallas pequeñas -->
          <td class="hidden md:table-cell py-2">{{ doctor.vinculacion }}</td>
          <td class="hidden md:table-cell py-2">{{ doctor.consulta }}</td>
          <td class="hidden md:table-cell py-2">{{ doctor.revision }}</td>
          <td class="hidden md:table-cell py-2">{{ doctor.ingreso }}</td>
          <td class="hidden md:table-cell py-2">{{ doctor.espontaneo }}</td>
          <td class="hidden md:table-cell py-2">{{ doctor.seguro }}</td>
        
          <td class="py-2 pr-2 w-[100px]">{{ formatTotal(calculateTotal(doctor)) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedDoctorIndex: null, // Índice del doctor seleccionado
      selectedTime: "Hoy", // Muestra "Hoy" por defecto
      options: ["Hoy", "Esta semana", "Últimos 30 días", "Todo el tiempo"],
      isOpen: false,
      selectedOption: "Hoy",
      startDate: "",
      endDate: "",
      doctorNames: [
        "Itzel Larraga Padilla",
        "Hector de Jesus Vega",
        "Jessica Itzel Montoya",
      ],
      doctorVinculations: [
        "Renta", // Vinculación para el primer doctor
        "No renta", // Vinculación para el segundo doctor
        "Renta", // Vinculación para el tercer doctor
      ],
      doctorData: {
        Hoy: [
          { consulta: 5, revision: 3, ingreso: 4, espontaneo: 2, seguro: 1 },
          { consulta: 4, revision: 2, ingreso: 3, espontaneo: 1, seguro: 2 },
          { consulta: 6, revision: 3, ingreso: 5, espontaneo: 4, seguro: 3 },
        ],
        "Esta semana": [
          { consulta: 10, revision: 5, ingreso: 7, espontaneo: 3, seguro: 2 },
          { consulta: 8, revision: 4, ingreso: 6, espontaneo: 2, seguro: 3 },
          { consulta: 12, revision: 6, ingreso: 9, espontaneo: 5, seguro: 4 },
        ],
        "Últimos 30 días": [
          {
            consulta: 30,
            revision: 15,
            ingreso: 20,
            espontaneo: 10,
            seguro: 5,
          },
          { consulta: 25, revision: 12, ingreso: 18, espontaneo: 8, seguro: 7 },
          {
            consulta: 35,
            revision: 18,
            ingreso: 25,
            espontaneo: 12,
            seguro: 9,
          },
        ],
        "Todo el tiempo": [
          {
            consulta: 100,
            revision: 50,
            ingreso: 70,
            espontaneo: 30,
            seguro: 15,
          },
          {
            consulta: 80,
            revision: 40,
            ingreso: 60,
            espontaneo: 25,
            seguro: 20,
          },
          {
            consulta: 120,
            revision: 60,
            ingreso: 90,
            espontaneo: 40,
            seguro: 30,
          },
        ],
      },
      filteredDoctors: [], // Almacena los datos filtrados según la selección de tiempo
    };
  },
  computed: {
    selectedTimeLabel() {
      return this.selectedOption;
    },
    isLargeScreen() {
      return window.innerWidth >= 768; // 768px es el límite para 'md' en Tailwind CSS
    },
  },
  methods: {
    selectDoctor(index) {
      this.selectedDoctorIndex = index; // Resalta la fila seleccionada
      // Redirige a la ruta de estadísticas del doctor
      this.$router.push({
        path: '/estadisticas-doctor',
      });
    },
    toggleOptions() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.fetchData(); // Actualiza los datos cuando selecciona una opción
    },
    updateRange() {
      this.fetchData();
    },
    fetchData() {
      this.filteredDoctors = this.doctorNames.map((name, index) => ({
        nombre: name,
        vinculacion: this.doctorVinculations[index], // Obtiene la vinculación del arreglo
        consulta: this.doctorData[this.selectedOption][index].consulta,
        revision: this.doctorData[this.selectedOption][index].revision,
        ingreso: this.doctorData[this.selectedOption][index].ingreso,
        espontaneo: this.doctorData[this.selectedOption][index].espontaneo,
        seguro: this.doctorData[this.selectedOption][index].seguro,
      }));
    },
    calculateTotal(doctor) {
      return (
        doctor.consulta +
        doctor.revision +
        doctor.ingreso +
        doctor.espontaneo +
        doctor.seguro
      );
    },
    formatTotal(value) {
      return value >= 1000000 ? `${(value / 1000000).toFixed(1)} M` : value;
    },
  },
  mounted() {
    this.fetchData(); // Cargar datos iniciales al montar el componente
  },
};
</script>
