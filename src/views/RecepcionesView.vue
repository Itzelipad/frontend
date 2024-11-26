<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891">Recepciones</h1>
      </div>

      <!-- Contenedor recepciones -->
      <div class="bg-white p-6 rounded-2xl max-w-4xl mx-auto mt-6 md:mt-10">
        <p class="text-[#163891] mb-5 mt-3 text-lg md:text-justify md:max-w-lg ml-4">Seleccione una recepción para ver las estadísticas de los pacientes atendidos y los doctores asociados.</p>

        <!-- Botón agregar recepcion -->
        <div class="flex justify-end mb-5 md:-mt-9">
          <button
            @click="$router.push('/agregar-recepcion')"
            class="bg-[#EBF0FD] hover:bg-blue-100 text-[#163891] py-1 px-6 rounded-lg focus:outline-none mr-3"
          >
            <svg class="w-6 h-6" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14m-7 7V5"/>
            </svg>
          </button>
        </div>

        <!-- Div de recepcion -->
        <div
          v-for="(recepcion, index) in recepciones"
          :key="index"
          class="bg-white p-4 rounded-xl mb-4 flex justify-between items-center"
          style="box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12)"
        >
          <div>
            <!-- Nombre de la recepción -->
            <div class="text-[#163891] font-semibold text-lg"> Recepción {{ recepcion.numero }}</div>

            <!-- Ubicación del edificio -->
            <div class="text-[#A3AED0] text-sm">Edificio {{ recepcion.edificio }}</div>
          </div>

          <!-- Iconos -->
          <div class="flex items-center space-x-4">
            <!-- Botón de editar -->
            <button
              @click="$router.push('/editar-recepcion')"
              class="focus:outline-none"
            >
              <svg
                class="w-6 h-6 transition-colors duration-200"
                :class="{
                  'text-[#163891]': recepcionSeleccionada === index,
                  'text-[#A3AED0]': recepcionSeleccionada !== index,
                  'hover:text-[#163891]': true,
                }"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path  fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
              </svg>
            </button>

            <!-- Botón de flecha para redirigir a otra recepcion -->
            <button
            @click="$router.push('/recepcion')"
              class="focus:outline-none"
            >
              <svg class="w-6 h-6 text-[#163891] transition-transform duration-200 hover:scale-110" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="m9 5 7 7-7 7"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "RecepcionesView",
  data() {
    return {
      recepciones: [
        { numero: 503, edificio: "A" },
        { numero: 504, edificio: "B" },
        { numero: 505, edificio: "C" },
        { numero: 506, edificio: "D" },
      ], 
      recepcionSeleccionada: null, 
    };
  },
};
</script>

<style scoped>
.body {
  font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif;
}
</style>
