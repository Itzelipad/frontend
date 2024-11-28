<template>
  <div class="anillo bg-white w-[340px] sm:w-[280px] md:w-[430px] rounded-2xl p-4 relative mt-4">
    <!-- Selección de tiempo alineada a la derecha -->
    <div class="absolute top-4 right-4 flex items-center z-30">
      <div class="relative">
        <button @click="toggleOptions"
          class="flex items-center justify-between w-full rounded-lg border border-transparent bg-white px-4 py-2 text-sm font-medium text-[#163891] focus:outline-none focus:ring-2 focus:ring-transparent focus:ring-offset-2">
          {{ selectedOption }}
          <svg class="ml-2 h-4 w-4 text-[#163891] transition-transform" :class="{ 'rotate-180': isOpen }" fill="none"
            viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 9l6 6 6-6" />
          </svg>
        </button>

        <div v-if="isOpen"
          class="absolute right-0 mt-2 w-52 h-auto rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 overflow-auto z-20">
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

    <!-- Contenedor del gráfico de anillo -->
    <div class="relative flex justify-center items-center mt-11 md:mt-10">
      <Doughnut class="w-[180px] md:h-[180px] z-10" :options="chartOptions" :data="chartData" />
      <div class="absolute flex flex-col items-center justify-center z-0">
        <span class="text-[#163891] text-3xl font-bold mb-2">{{ formattedTotalPatients }}</span>
        <span class="text-[#A3AED0] text-sm">Total Pacientes</span>
      </div>
    </div>

    <!-- Leyenda de colores de Consultas, Revisiones, etc. -->
    <div class="legend flex justify-center mt-4 md:mt-6">
      <div class="flex items-center mr-6">
        <div class="w-4 h-4 bg-[#A3E4D7] rounded-full mr-2"></div>
        <span class="text-sm text-gray-500">C</span>
      </div>
      <div class="flex items-center mr-6">
        <div class="w-4 h-4 bg-[rgba(156,162,239,0.9)] rounded-full mr-2"></div>
        <span class="text-sm text-gray-500">R</span>
      </div>
      <div class="flex items-center mr-6">
        <div class="w-4 h-4 bg-[#F7B2B7] rounded-full mr-2"></div>
        <span class="text-sm text-gray-500">I</span>
      </div>
      <div class="flex items-center mr-6">
        <div class="w-4 h-4 bg-[#F9E79F] rounded-full mr-2"></div>
        <span class="text-sm text-gray-500">E</span>
      </div>
      <div class="flex items-center">
        <div class="w-4 h-4 bg-[rgba(160,197,247,1)] rounded-full mr-2"></div>
        <span class="text-sm text-gray-500">S</span>
      </div>
    </div>
  </div>
</template>

<script>
import { Doughnut } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import axios from 'axios';

ChartJS.register(Title, Tooltip, Legend, ArcElement);

export default {
  name: 'DoughnutChart',
  components: { Doughnut },
  data() {
    return {
      selectedOption: 'Todo el tiempo',
      isOpen: false,
      options: ['Hoy', 'Esta semana', 'Los últimos 30 días', 'Todo el tiempo'],
      chartData: this.getChartData([]), // Inicialmente vacío
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false,
        cutout: '80%',
        plugins: {
          legend: { display: false },
          tooltip: {
            callbacks: {
              label: function (tooltipItem) {
                const dataLabel = tooltipItem.label || '';
                const dataValue = tooltipItem.raw || 0;
                const total = tooltipItem.chart.data.datasets[0].data.reduce((a, b) => a + b, 0);
                const percentage = ((dataValue / total) * 100).toFixed(2);
                return `${dataLabel}: ${dataValue} (${percentage}%)`;
              },
            },
          },
        },
        elements: {
          arc: {
            borderWidth: 1,
            borderColor: '#FFFFFF',
            borderRadius: 20,
          },
        },
      },
    };
  },
  computed: {
    totalPatients() {
      const data = this.chartData.datasets[0].data;
      return data.reduce((a, b) => a + b, 0);
    },
    formattedTotalPatients() {
      return this.totalPatients >= 1000000
        ? (this.totalPatients / 1000000).toFixed(1) + 'M'
        : this.totalPatients.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
  },
  methods: {
    toggleOptions() {
      this.isOpen = !this.isOpen;
    },
    selectOption(option) {
      this.selectedOption = option;
      this.isOpen = false;
      this.updateChartData();
    },
    getChartData(data) {
      return {
        labels: ['Consultas', 'Revisiones', 'Ingreso', 'Espontáneo', 'Seguro'],
        datasets: [
          {
            label: 'Pacientes',
            data: data,
            backgroundColor: [
              '#A3E4D7', // Consultas
              'rgba(156,162,239,0.9)', // Revisiones
              '#F7B2B7', // Ingreso
              '#F9E79F',  // Espontáneo
              'rgba(160,197,247,1)', // Seguro
            ],
            borderWidth: 1,
            hoverOffset: 4,
          },
        ],
      };
    },
    updateChartData() {
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
        .post(peticion, {
          opciones: this.selectedOption,
        },
          {
            headers: {
              'Authorization': `Bearer ${token}`
            },
          }
        )
        .then(response => {
          this.chartData = this.getChartData(response.data.casos); // Actualiza los datos del gráfico
        })
        .catch(error => {
          console.error('Error al realizar la petición:', error);
        });
    },
  },
  mounted() {
    this.updateChartData(); // Cargar datos iniciales
  },
};
</script>

<style scoped>
.anillo {
  height: 300px;
}

.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
