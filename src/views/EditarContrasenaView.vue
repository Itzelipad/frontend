<template>
  <div class="flex justify-center">
    <!-- Barra lateral (sidebar) -->
    <aside id="logo-sidebar" class="hidden md:block w-64 text-white h-screen" aria-label="Sidebar"></aside>

    <!-- Contenido principal de la página -->
    <div class="p-4 flex-1">
      <div class="flex justify-between items-center mt-4 md:mt-6 mb-4">
        <h1 class="text-2xl md:text-3xl font-semibold ml-0 md:ml-12" style="color: #163891" >
          Editar Contraseña
        </h1>
      </div>

      <!-- Contenedor para modificar la contraseña -->
      <div class="flex justify-center items-center mt-6 md:mt-10">
        <div class="bg-white rounded-2xl p-6 w-full max-w-lg">
          <p class="text-[#163891] text-lg mb-8"> Ingresa tu contraseña actual y establece una nueva contraseña. Asegúrate de confirmar correctamente la nueva contraseña.</p>

          <!-- Campo de contraseña actual -->
          <label class="text-[#163891] font-semibold mb-4 block text-lg">Contraseña actual:</label>
          <input
            type="password"
            v-model="form.currentPassword"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-6 border-2 border-transparent focus:border-transparent focus:outline-none"
          />

          <!-- Campo de nueva contraseña -->
          <label class="text-[#163891] font-semibold mb-4 block text-lg">Contraseña nueva:</label>
          <input
            type="password"
            v-model="form.newPassword"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-6 border-2 border-transparent focus:border-transparent focus:outline-none"
          />

          <!-- Campo de verificar nueva contraseña -->
          <label class="text-[#163891] font-semibold mb-4 block text-lg">Verificar contraseña nueva:</label>
          <input
            type="password"
            v-model="form.verifyNewPassword"
            class="bg-[#EBF0FD] text-[#163891] rounded-lg p-2 w-full mb-6 border-2 border-transparent focus:border-transparent focus:outline-none"
          />

          <!-- Botón guardar -->
          <button
            class="bg-[#2B3674] text-white font-semibold py-2 px-4 rounded-lg w-full"
            @click="savePassword"
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        currentPassword: "", // Contraseña actual
        newPassword: "", // Nueva contraseña
        verifyNewPassword: "", // Verificar nueva contraseña
      },
    };
  },
  methods: {
    savePassword() {
      // Validar si las contraseñas nuevas coinciden
      if (this.form.newPassword !== this.form.verifyNewPassword) {
        alert("Las contraseñas nuevas no coinciden. Por favor, verifica.");
        return;
      }

      // Validar si se ingresó la contraseña actual
      if (!this.form.currentPassword) {
        alert("Debes ingresar tu contraseña actual.");
        return;
      }

      // Validar si la nueva contraseña no está vacía
      if (!this.form.newPassword) {
        alert("Debes ingresar una nueva contraseña.");
        return;
      }
      alert("Contraseña actualizada exitosamente."); 
    },
  },
};
</script>
