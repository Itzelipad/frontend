<template>
  <div class="chart-container w-[340px] md:w-[667px] h-[300px] bg-white rounded-2xl p-4 -mt-1 md:mt-4">
    <div class="header flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
      <h2 class="text-xl font-semibold text-[#163891] ml-4">Pacientes en Recepciones</h2>

      <!-- Selector de tiempo alineado a la izquierda en pantallas pequeñas -->
      <div class="relative w-full sm:w-1/3 mt-2 sm:mt-0 flex sm:justify-end">
        <button @click="toggleOptions"
          class="flex items-center justify-end rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#163891] focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2">
          <span class="mr-2">{{ selectedOption }}</span>
          <svg class="h-4 w-4 text-[#163891] transition-transform" :class="{ 'rotate-180': isOpen }" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div v-if="isOpen"
          class="absolute left-0 mt-2 w-52 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto">
          <div class="py-1" role="menu" aria-orientation="vertical">
            <button v-for="(option, index) in options" :key="index"
              class="block w-full px-4 py-2 text-sm text-[#163891] hover:bg-gray-100 text-left"
              @click.prevent="selectOption(option)">
              {{ option }}
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Ajustar la gráfica hacia arriba solo en pantallas pequeñas -->
    <div class="flex justify-center h-[230px] md:h-[270px]">
      <Bar class="md:w-[500px]" id="my-chart-id" :options="chartOptions" :data="computedChartData" />
    </div>
  </div>
</template>

<script>
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import axios from 'axios';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

export default {
  name: 'BarChart',
  components: {
    Bar,
  },
  props: {
    chartLabels: {
      type: Array,
      required: true,
    },
    chartDataValues: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      selectedOption: 'Todo el tiempo',
      isOpen: false,
      options: ['Hoy', 'Esta semana', 'Los últimos 30 días', 'Todo el tiempo'],
      internalChartDataValues: [...this.chartDataValues], // Copia de los valores iniciales de chartDataValues
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { display: false },
          tooltip: { enabled: true },
        },
        layout: { padding: { top: 20, bottom: 50, left: 10, right: 10 } },
        scales: {
          x: {
            grid: { display: false },
            ticks: { autoSkip: false, padding: 10 },
          },
          y: {
            beginAtZero: true,
            grid: { color: 'transparent' },
            ticks: { padding: 10 },
          },
        },
      },
    };
  },
  computed: {
    computedChartData() {
      return {
        labels: this.chartLabels,
        datasets: [
          {
            label: 'Pacientes',
            data: this.internalChartDataValues,
            backgroundColor: [
              '#A3E4D7',  // Verde para 'C'
              'rgba(156,162,239,0.9)', // Azul claro para 'R'
              '#F7B2B7', // Azul oscuro para 'I'
              '#F9E79F', // Naranja para 'E'
              'rgba(160,197,247,1)', // Rojo para 'S'
            ],
            borderRadius: 20,
            barThickness: 30,
          },
        ],
      };
    },
  },
  watch: {
    chartDataValues(newValues) {
      this.internalChartDataValues = [...newValues];
    }
  },
  methods: {
    toggleOptions() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.updateStats();
      this.isOpen = false;
      this.$emit('update-chart', option);
    },
    updateStats() {
      let ruta = this.$route.path;
      let peticion;
      if (ruta === '/inicio') {
        peticion = `${this.$apiRoute}/estadisticas-generales-graphic`;
      } else if (ruta === '/recepcion') {
        peticion = `${this.$apiRoute}/estadisticas-recepcion-graphic/${this.$auxiliar.id}`;
      } else if (ruta === '/estadisticas-doctor') {
        peticion = `${this.$apiRoute}/estadisticas-doctor-graphic/${this.$auxiliar.id}`;
      }
      let token = localStorage.getItem('token');
      axios
        .post(peticion,
          {
            opciones: this.selectedOption,
          },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        )
        .then(response => {
          this.internalChartDataValues = response.data.casos;
        })
        .catch(error => {
          console.error('Error al realizar la peticion:', error);
        });
    }
  },
  mounted() {
    this.updateStats();
  }
};
</script>

<style scoped>
.chart-container {
  /* Evitar que el contenedor exceda el ancho de la pantalla */
  overflow: hidden;
}
</style>
