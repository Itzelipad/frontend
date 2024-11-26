<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891">Editar Usuario</h1>
      </div>

      <!-- Contenedor para editar el usuario -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <p class="text-[#163891] text-lg mb-8">Realiza los ajustes necesarios en los campos a continuación. Asegúrate de guardar los cambios. </p>

          <!-- Campo de nombre -->
          <label class="text-[#163891] font-semibold mb-6 block text-lg">Nombre:</label>
          <input type="text" class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-8 border-2 border-transparent focus:border-transparent focus:outline-none"/>

          <!-- Campo de tipo de usuario -->
          <div class="mb-6">
            <label class="block text-[#163891] font-semibold mb-4 text-lg" for="tipoUsuario">
              Tipo de usuario:
            </label>
            <div class="relative mb-6">
              <div class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full border-2 border-transparent cursor-pointer"
                @click="toggleTipoUsuarioDropdown"
              >
                <span v-if="form.tipoUsuario">{{ form.tipoUsuario }}</span>
                <span v-else>&nbsp;</span>
              </div>

              <!-- Lista desplegable -->
              <ul v-if="isTipoUsuarioDropdownOpen"
                class="absolute z-10 bg-white border rounded-lg mt-1 w-full shadow-lg"
              >
                <li v-for="role in userRoles"
                  :key="role"
                  @click="selectTipoUsuario(role)"
                  class="text-[#163891] hover:bg-gray-100 p-2 cursor-pointer"
                >
                  {{ role.charAt(0).toUpperCase() + role.slice(1) }}
                </li>
              </ul>

              <!-- Ícono de dropdown -->
              <div class="absolute inset-y-0 right-3 flex items-center pointer-events-none mt-2">
                <svg class="w-5 h-5 text-[#163891] -mt-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 011.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                </svg>
              </div>
            </div>
          </div>

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
      showPassword: false,
      userRoles: ["Administrador", "Recepcionista"], // Arreglo con los tipos de usuario
      form: {
        tipoUsuario: "", // Valor seleccionado para tipo de usuario
      },
      isTipoUsuarioDropdownOpen: false, // Estado del dropdown
    };
  },
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
    },
    toggleTipoUsuarioDropdown() {
      this.isTipoUsuarioDropdownOpen = !this.isTipoUsuarioDropdownOpen;
    },
    selectTipoUsuario(opcion) {
      this.form.tipoUsuario = opcion;
      this.isTipoUsuarioDropdownOpen = false;
    },
    editPassword() {
      this.$router.push("/editar-contrasena");
    },
  },
};
</script>

<style scoped>
/* Estilo adicional para eliminar la flecha nativa del select */
select::-ms-expand {
  display: none;
}
</style>