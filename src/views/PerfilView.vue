<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar" ></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891"> Perfil</h1>
      </div>

      <!-- Contenedor del perfil -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <h1 class="text-[#163891] font-semibold text-center text-xl mb:text-lg mb-3"> {{ userName }}</h1>
          <p class="text-[#A3AED0] text-center text-lg mb:text-1sm mt-1 mb-3"> {{ userRole }}</p>

          <!-- Boton editar perfil -->
          <button @click="$router.push('/editar-perfil')" class="bg-[#EBF0FD] text-[#163891] font-semibold mt-4 px-2 py-1 w-1/3 rounded-lg hover:bg-blue-100 mx-auto block">
            Editar
          </button>
        </div>
      </div>

      <!-- Contenedor de Usuarios -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <div class="flex justify-between items-center mb-5">
            <h2 class="text-[#163891] text-xl font-semibold ml-4">Usuarios</h2>

            <!-- Botón para agregar usuario -->
            <button
              @click="$router.push('/registrar-usuario')"
              class="bg-[#EBF0FD] hover:bg-blue-100 text-[#163891] py-1 px-6 rounded-lg focus:outline-none"
            >
              <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 12h14m-7 7V5"/>
              </svg>
            </button>
          </div>

          <!-- Lista de Usuarios -->
          <div
            v-for="(usuario, index) in usuarios"
            :key="index"
            class="bg-white p-4 rounded-xl mb-3 flex justify-between items-center"
            style="box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12)"
          >
            <div>
              <!-- Nombre del usuario -->
              <div class="text-[#163891] font-semibold text-lg"> {{ usuario.nombre }} </div>

              <!-- Rol del usuario -->
              <div class="text-[#A3AED0] text-sm">
                <div v-if="usuario.rol"> Administrador</div>
                <div v-else>Recepcionista</div> 
              </div>
            </div>

            <!-- Botón de editar para cada usuario -->
            <button
              @click="$router.push('/editar-usuario')"
              class="focus:outline-none"
            >
              <svg
                class="w-6 h-6 transition-colors duration-200"
                :class="{
                  'text-[#163891]': usuarioSeleccionado === index,
                  'text-[#A3AED0]': usuarioSeleccionado !== index,
                  'hover:text-[#163891]': true,
                }"
                aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M14 4.182A4.136 4.136 0 0 1 16.9 3c1.087 0 2.13.425 2.899 1.182A4.01 4.01 0 0 1 21 7.037c0 1.068-.43 2.092-1.194 2.849L18.5 11.214l-5.8-5.71 1.287-1.31.012-.012Zm-2.717 2.763L6.186 12.13l2.175 2.141 5.063-5.218-2.141-2.108Zm-6.25 6.886-1.98 5.849a.992.992 0 0 0 .245 1.026 1.03 1.03 0 0 0 1.043.242L10.282 19l-5.25-5.168Zm6.954 4.01 5.096-5.186-2.218-2.183-5.063 5.218 2.185 2.15Z" clip-rule="evenodd"/>
              </svg>
            </button>
          </div>
        </div>
      </div>

      <!-- Contenedor de Cerrar Sesión -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <h2 class="text-[#163891] text-xl font-semibold text-center mb-3"> Cerrar sesión</h2>
          <p class="text-[#163891] text-base text-center mb-4"> ¿Seguro que deseas cerrar sesión? </p>
          <div class="flex justify-center">

            <button @click="cerrarSesion" class="bg-[#2B3674] text-white font-semibold justify-center px-6 py-2 rounded-lg w-32">
              Aceptar
            </button>
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
      usuarios: [
        { nombre: "Juan Pérez", rol: "Administrador" },
        { nombre: "Ana Gómez", rol: "Recepcionista" },
        { nombre: "Carlos Ruiz", rol: "Médico" },
      ],
      userName: "Itzel Larraga Padilla", // Nombre del usuario 
      userRole: "Administrador", // Rol del usuario 
    };
  },
  methods: {
    cerrarSesion() {
      console.log("Sesión cerrada");
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