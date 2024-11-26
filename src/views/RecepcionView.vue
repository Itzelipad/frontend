<template>
  <div class="flex">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891">Recepción {{ receptionNumber }}</h1>
        <!-- Botón Descargar -->
        <button class="flex items-center text-[#163891] px-4 focus:outline-none mr-14 hidden md:flex">
          <svg class="w-6 h-6 text-[#163891] mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
          </svg>
          <span class="font-semibold">Descargar</span>
        </button>
      </div>

      <!-- Componente de estadísticas -->
      <EstadisticasComp />

      <div class="mt-4 flex flex-col md:flex-row">
        <!-- Gráfica de barras -->
        <div class="ml-0 md:ml-11">
          <BarChart 
            :chartLabels="['C', 'R', 'I', 'E', 'S']" 
            :chartDataValues="chartDataValues" 
            @update-chart="updateChartData"
          />
        </div>

        <!-- Gráfica de anillo -->
        <div class="mt-4 md:mt-0 md:ml-10"> <DoughnutChart /></div>
      </div> 

       <!-- Componente de estadísticas de doctores-->
      <EstadisticasDocComp/>
    </div>
  </div>
</template>

<script>
import EstadisticasComp from '../components/EstadisticasComp.vue';
import BarChart from '../components/BarChart.vue';
import DoughnutChart from '../components/DoughnutChart.vue';
import EstadisticasDocComp from '../components/EstadisticasDocComp.vue';

export default {
  name: "InicioView",
  components: {
    EstadisticasComp,
    BarChart,
    DoughnutChart,
    EstadisticasDocComp
  },
  data() {
    return {
      chartDataValues: [50, 30, 20, 40, 60], // Datos iniciales de la gráfica
      timeData: {
        Hoy: [10, 15, 20, 25, 30],
        'Esta semana': [20, 30, 25, 23, 46],
        'Los últimos 30 días': [50, 45, 40, 48, 99],
        'Todo el tiempo': [100, 80, 60, 43, 88],
      },
      receptionNumbers: [560], // Arreglo de números de recepción
    };
  },
  computed: {
    receptionNumber() {
      return this.receptionNumbers[0]; 
    }
  },
  methods: {
    updateChartData(selectedOption) {
      this.chartDataValues = this.timeData[selectedOption];
    },
  },
};
</script>

<style scoped>
.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>