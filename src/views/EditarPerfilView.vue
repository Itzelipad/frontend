<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar" ></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891">
          Editar Perfil
        </h1>
      </div>

      <!-- Contenedor para modificar los datos del perfil -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <p class="text-[#163891] text-lg mb-8"> Modifica los datos de tu cuenta de {{ userRole }}.</p>

          <label class="text-[#163891] font-semibold mb-6 block text-lg">Nombre:</label>
          <input type="text" class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-8 border-2 border-transparent focus:border-transparent focus:outline-none"/>

          <!-- Botones de "Guardar" y "Editar contraseña" -->
          <div class="flex justify-between gap-4">
            <button class="bg-[#EBF0FD] hover:bg-blue-100 text-[#163891] font-semibold py-2 px-4 rounded-lg w-1/2"
              @click="editPassword"
            >
              Editar contraseña
            </button>
            <button class="bg-[#2B3674] text-white font-semibold py-2 px-4 rounded-lg w-1/2">
              Guardar
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
      showPassword: false, // Estado para controlar la visibilidad de la contraseña
      userRoles: ["administrador", "recepción"], 
      currentRoleIndex: 0, // index para seleccionar el rol actual
    };
  },
  computed: {
    userRole() {
      return this.userRoles[this.currentRoleIndex]; // Devuelve el rol actual basado en el index
    },
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword; // Alterna el estado de visibilidad
    },
    switchRole() {
      this.currentRoleIndex =
        (this.currentRoleIndex + 1) % this.userRoles.length; // Cambia el rol actual
    },
    editPassword() {
      this.$router.push("/editar-contrasena");
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
