<template>
  <div>
    <div class="flex items-center">
      <div class="flex flex-col md:flex-row">

        <!-- Div para el selector de tiempo -->
        <div class="bg-white rounded-2xl p-1 h-18 flex items-center space-x-2 mt-4 md:mt-6 md:ml-11 w-[340px] md:w-[272px]" >
          <span class="ml-4 text-[#A3AED0] font-medium text-sm">Tiempo:</span>
          <div class="relative w-full">
            <button @click="toggleOptions" class="flex items-center justify-between w-full rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#163891] focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2">
              {{ selectedOption }}
              <svg class="ml-2 h-4 w-4 text-[#163891] transition-transform" :class="{ 'rotate-180': isOpen }" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6"/>
              </svg>
            </button>

            <div v-if="isOpen"
              class="absolute left-0 mt-2 w-52 h-22 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto">
              <div class="py-1" role="menu" aria-orientation="vertical">
                <button class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
                  @click.prevent="selectOption('Hoy')">
                  Hoy
                </button>
                <button class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
                  @click.prevent="selectOption('Esta semana')">
                  Esta semana
                </button>
                <button class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
                  @click.prevent="selectOption('Los últimos 30 días')">
                  Los últimos 30 días
                </button>
                <button class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
                  @click.prevent="selectOption('Todo el tiempo')">
                  Todo el tiempo
                </button>
                <button class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
                  @click.prevent="selectOption('Rango de fechas')">
                  Rango de fechas
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- Div para el rango de fechas -->
        <div v-if="selectedOption === 'Rango de fechas'"
          class="mt-4 md:mt-6 ml-0 md:ml-4 flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4"
        >
          <div class="bg-white rounded-2xl p-1 h-[45px] flex items-center space-x-2 w-[340px] md:w-[220px]">
            <span class="ml-4 text-[#A3AED0] font-medium text-sm">Inicio:</span>
            <input type="date" v-model="startDate" @change="updateRange" class="border border-transparent rounded-md p-1 text-sm text-[#163891] font-medium focus:outline-none"/>
          </div>

          <div class="bg-white rounded-2xl p-1 h-[45px] flex items-center space-x-2 w-[340px] md:w-[220px]">
            <span class="ml-4 text-[#A3AED0] font-medium text-sm">Fin:</span>
            <input type="date" v-model="endDate" @change="updateRange" class="border border-transparent rounded-md p-1 text-sm text-[#163891] font-medium focus:outline-none"/>
          </div>
        </div>
      </div>
    </div>

    <!-- Div motivos -->
    <div class="flex flex-col md:flex-row space-x-0 md:space-x-11 mt-6 md:ml-11">
      <div
        v-for="(value, index) in currentMotivos"
        :key="index"
        class="bg-white rounded-2xl p-4 flex items-center space-x-4 w-[340px] md:w-48 mb-5 md:mb-0"
        style="height: 5rem"
      >
        <div class="flex items-center ml-3 md:ml-0">
          <div class="bg-[#EBF0FD] rounded-full p-3">
            <svg class="w-7 h-7 text-[#163891]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24" >
              <!-- Puedes ajustar los iconos según el tipo -->
              <path  v-if="index === 0" fill-rule="evenodd" d="M18 3a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-1V9a4 4 0 0 0-4-4h-3a1.99 1.99 0 0 0-1 .267V5a2 2 0 0 1 2-2h7Z" clip-rule="evenodd"/>
              <path v-if="index === 0" fill-rule="evenodd" d="M8 7.054V11H4.2a2 2 0 0 1 .281-.432l2.46-2.87A2 2 0 0 1 8 7.054ZM10 7v4a2 2 0 0 1-2 2H4v6a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3Z" clip-rule="evenodd"/>
              <path v-if="index === 1" d="M10 2a8 8 0 1 0 0 16 8 8 0 0 0 0-16Z"/>
              <path v-if="index === 1" fill-rule="evenodd" d="M21.707 21.707a1 1 0 0 1-1.414 0l-3.5-3.5a1 1 0 0 1 1.414-1.414l3.5 3.5a1 1 0 0 1 0 1.414Z" clip-rule="evenodd" />
              <path v-else-if="index === 2" fill-rule="evenodd" d="M9.484 6.743c.41-.368.443-1 .077-1.41a.99.99 0 0 0-1.405-.078L2.67 10.203l-.007.006A2.048 2.048 0 0 0 2 11.721a2.058 2.058 0 0 0 .662 1.51l5.584 5.09a.99.99 0 0 0 1.405-.07 1.003 1.003 0 0 0-.07-1.412l-5.577-5.082a.05.05 0 0 1 0-.072l5.48-4.942Zm6.543 9.199v-.42a4.168 4.168 0 0 1 2.715 2.415c.154.382.44.695.806.88a1.683 1.683 0 0 0 2.167-.571c.214-.322.312-.707.279-1.092V15.88c0-3.77-2.526-7.039-5.966-7.573V7.57a1.957 1.957 0 0 0-.994-1.838 1.931 1.931 0 0 0-2.153.184L7.8 10.164a.753.753 0 0 0-.012.011l-.011.01a2.098 2.098 0 0 0-.703 1.57 2.108 2.108 0 0 0 .726 1.59l5.08 4.25a1.933 1.933 0 0 0 2.929-.614c.167-.32.242-.68.218-1.04Z" clip-rule="evenodd" />
              <path v-else-if="index === 3" fill-rule="evenodd" d="M9 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H7Zm8-1a1 1 0 0 1 1-1h1v-1a1 1 0 1 1 2 0v1h1a1 1 0 1 1 0 2h-1v1a1 1 0 1 1-2 0v-1h-1a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
              <path v-else-if="index === 4" fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h14a1 1 0 1 1 0 2v14a1 1 0 1 1 0 2H5a1 1 0 1 1 0-2V5a1 1 0 0 1-1-1Zm5 2a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1V7a1 1 0 0 0-1-1h-1Zm-5 4a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1H9Zm5 0a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1h1a1 1 0 0 0 1-1v-1a1 1 0 0 0-1-1h-1Zm-3 4a2 2 0 0 0-2 2v3h2v-3h2v3h2v-3a2 2 0 0 0-2-2h-2Z" clip-rule="evenodd" />
            </svg>
          </div>
          <div class="ml-3">
            <div class="font-bold text-3xl text-[#163891]">
              {{ value.cantidad }}
            </div>
            <div class="text-[#A3AED0] text-sm">{{ value.tipo }}</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedOption: "Hoy",
      isOpen: false,
      startDate: null,
      endDate: null,
      timeOptions: ["Hoy", "Esta semana", "Los últimos 30 días", "Todo el tiempo"],
      motivosData: {
        "Hoy": [
          { cantidad: 3, tipo: "Consulta" },
          { cantidad: 5, tipo: "Revisión" },
          { cantidad: 1, tipo: "Ingreso" },
          { cantidad: 4, tipo: "Espontáneo" },
          { cantidad: 2, tipo: "Seguro" }
        ],
        "Esta semana": [
          { cantidad: 10, tipo: "Consulta" },
          { cantidad: 8, tipo: "Revisión" },
          { cantidad: 6, tipo: "Ingreso" },
          { cantidad: 7, tipo: "Espontáneo" },
          { cantidad: 4, tipo: "Seguro" }
        ],
        "Los últimos 30 días": [
          { cantidad: 50, tipo: "Consulta" },
          { cantidad: 45, tipo: "Revisión" },
          { cantidad: 20, tipo: "Ingreso" },
          { cantidad: 30, tipo: "Espontáneo" },
          { cantidad: 25, tipo: "Seguro" }
        ],
        "Todo el tiempo": [
          { cantidad: 300, tipo: "Consulta" },
          { cantidad: 250, tipo: "Revisión" },
          { cantidad: 150, tipo: "Ingreso" },
          { cantidad: 200, tipo: "Espontáneo" },
          { cantidad: 100, tipo: "Seguro" }
        ]
      },
      currentMotivos: []
    };
  },
  mounted() {
    this.updateMotivos(); // Inicializar con datos de la opción seleccionada por defecto
  },
  methods: {
    toggleOptions() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      if (option !== "Rango de fechas") {
        this.updateMotivos();
      }
    },
    updateMotivos() {
      this.currentMotivos = this.motivosData[this.selectedOption];
    },
    updateRange() {
      if (this.startDate && this.endDate) {
        // Lógica para filtrar datos según el rango de fechas
        console.log(`Rango seleccionado: ${this.startDate} a ${this.endDate}`);
      }
    }
  }
};
</script>