<template>
  <div class="flex">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891"> Reporte General</h1>

        <!-- Botón Descargar -->
        <button class="flex items-center text-[#163891] px-4 focus:outline-none mr-14 hidden md:flex">
          <svg class="w-6 h-6 text-[#163891] mr-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" >
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"  stroke-width="2"  d="M4 15v2a3 3 0 0 0 3 3h10a3 3 0 0 0 3-3v-2m-8 1V4m0 12-4-4m4 4 4-4"/>
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
            :chartLabels="['503', '563', '854', '469', '756', '200']"
            :chartDataValues="[100, 80, 60, 43, 88, 36]"
          />
        </div>

        <!-- Gráfica de anillo -->
        <div class="mt-4 md:mt-0 md:ml-10"><DoughnutChart /></div>
      </div>

      <!-- Lista de recepciones -->
      <div class="bg-white p-6 rounded-2xl w-[340px] md:w-[1143px] mx-auto mt-6 md:mt-10 ml-0 md:ml-11">
        <div class="flex justify-between items-center mt-4 md:mt-3 mb-4">
          <h1 class="text-2xl md:text-2xl font-semibold ml-4 md:ml-4" style="color: #163891"> Recepciones</h1>
        </div>
        <div
          v-for="(recepcion, index) in recepciones"
          :key="index"
          class="bg-white p-4 rounded-xl mb-4 flex justify-between items-center"
          style="box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12)"
        >
          <!-- Texto de la recepción -->
          <div>
            <div class="text-[#163891] font-semibold text-lg"> Recepción {{ recepcion.numero }}</div>
            <div class="text-[#A3AED0] text-sm">Edificio {{ recepcion.edificio }}</div>
          </div>

          <!-- Botón de flecha para redirigir a la vista de las estadisticas de la recepcion-->
          <button
            @click="estadisticas(recepcion)"
            class="focus:outline-none"
          >
            <svg class="w-6 h-6 text-[#163891] transition-transform duration-200 hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24"  height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor"  stroke-linecap="round"  stroke-linejoin="round"  stroke-width="3"  d="m9 5 7 7-7 7"/>
            </svg>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import EstadisticasComp from "../components/EstadisticasComp.vue";
import BarChart from "../components/BarChart.vue";
import DoughnutChart from "../components/DoughnutChart.vue";

export default {
  name: "InicioView",
  components: {
    EstadisticasComp,
    BarChart,
    DoughnutChart,
  },
  data() {
    return {
      recepciones: [],
    };
  },
  methods:{
    estadisticas(recepcion) {
      this.$auxiliar.numero = recepcion.numero;
      this.$auxiliar.edificio = recepcion.edificio;
      this.$auxiliar.id = recepcion.id;
      console.log(recepcion.id);
      this.$router.push('/recepcion');
    }
  },
  mounted(){
    let token = localStorage.getItem('token');
    axios
      .get(`${this.$apiRoute}/mostrar-recepciones`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        this.recepciones = response.data.recepciones;
      })
      .catch(error => {
        console.error('Error al realizar la peticion:', error);
      });
  }
};
</script>

