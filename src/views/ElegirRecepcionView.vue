<template>
  <!-- Lista de recepciones (vista para recepcionistas) -->
  <div class="bg-white p-6 rounded-2xl w-full md:w-[900px] mx-auto mt-6 md:mt-20 justify-center">
    <div class="flex justify-between items-center mt-4 md:mt-3 mb-4">
      <h1 class="text-2xl md:text-2xl font-semibold ml-4 md:ml-4" style="color: #163891"> Recepciones </h1>
    </div>

    <div class="mb-6 ml-4 mr-4">
      <p class="text-[#163891] text-lg md:text-lg"> Ingrese a la recepción que desea para ver sus estadísticas e ingresar datos.</p>
    </div>

    <!-- Lista de recepciones -->
    <div v-for="(recepcion, index) in recepciones"
      :key="index"
      class="bg-white p-4 rounded-xl mb-4 flex justify-between items-center"
      style="box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12)"
    >
      <!-- Texto de la recepción -->
      <div>
        <div class="text-[#163891] font-semibold text-xl"> Recepción {{ recepcion.numero }} </div>
        <div class="text-[#A3AED0] text-sm"> Edificio {{ recepcion.edificio }} </div>
      </div>

      <!-- Botón de flecha para redirigir al formulario -->
      <button @click="$router.push('/formulario')" class="focus:outline-none">
        <svg class="w-6 h-6 text-[#163891] transition-transform duration-200 hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24"  fill="none"  viewBox="0 0 24 24">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m9 5 7 7-7 7"/>
        </svg>
      </button>
    </div>

    <!-- Botón de cerrar sesión -->
    <div class="flex justify-end mt-8">
      <button class="bg-[#2B3674] text-[#FFFFFF] px-6 py-2 rounded-lg transition font-semibold"> Cerrar sesión </button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      recepciones: [
        { numero: 503, edificio: "A" },
        { numero: 504, edificio: "B" },
        { numero: 505, edificio: "C" },
        { numero: 506, edificio: "D" },
      ],
    };
  },
};
</script>
