<template>
  <div class="flex items-center justify-center min-h-screen">
    <!-- Contenedor de formulario e imagen -->
    <div class="flex flex-col sm:flex-row items-center bg-white rounded-2xl shadow-lg w-3/4 max-w-5xl overflow-hidden"
      style="box-shadow: 0px 4px 10px rgba(112, 144, 176, 0.12)">
      <!-- Lado izquierdo: Formulario de inicio de sesión -->
      <div class="w-full sm:w-1/2 p-10">
        <h2 class="text-2xl font-bold text-[#163891] text-3xl mb-6">Iniciar sesión</h2>
        <p class="text-[#163891] text-lg mb-8"> Introduce tu usuario y contraseña para continuar.</p>

        <!-- Campo para ingresar el usuario -->
        <form @submit.prevent="submitForm">
          <label for="username" class="block text-lg text-[#163891] font-semibold mb-3">Usuario:</label>
          <input type="text" id="username" v-model="username"
            class="w-full p-3 mb-6 bg-[#EBF0FD] rounded-lg text-[#163891] focus:outline-none" />

          <!-- Campo para ingresar la contraseña -->
          <label for="password" class="block text-lg text-[#163891] font-semibold mb-3">Contraseña:</label>
          <div class="relative mb-8">
            <input :type="showPassword ? 'text' : 'password'" id="password" v-model="password"
              class="bg-[#EBF0FD] text-[#163891] rounded-lg p-3 w-full border-2 border-transparent focus:border-transparent focus:outline-none" />
            <button type="button" @click="togglePassword"
              class="absolute inset-y-0 right-3 flex items-center text-[#163891]">
            </button>
          </div>

          <button type="submit" class="w-full bg-[#2B3674] text-base text-white py-3 rounded-lg font-semibold">
            Ingresar
          </button>
        </form>
      </div>

      <!-- Lado derecho: Imagen (ocultada en pantallas pequeñas) -->
      <div class="w-full sm:w-1/2 hidden sm:block">
        <img src="@/assets/login.png" alt="Login" class="w-full h-full object-cover rounded-r-2xl" />
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import methods from '@/methods';
export default {
  data() {
    return {
      apiUrl: process.env.VUE_APP_API_URL,
      showPassword: false,
      isAdmin: false, // Agregar el rol del usuario (esto se puede definir según el sistema de autenticación)
    };
  },
  mounted() {
    let token = localStorage.getItem('token');
    if (!token) return;
    axios
      .get(`${this.$apiRoute}/user`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status !== 200) {
          localStorage.removeItem('token');
          return;
        }
        methods.updateProperties(this.$user, response.data);
        if (response.data.admin === true)
          this.$router.push('/inicio');
        else
          if (this.$user.reception === null)
            this.$router.push('/inicio-recepcion');
          else
            this.$router.push('/formulario');
      })
      .catch(error => {
        console.log(error);
        if (error.response.status == 401)
          localStorage.removeItem('token');
        else
          console.error('Error al verificar el token:', error);
      });
  },
  methods: {
    togglePassword() {
      this.showPassword = !this.showPassword;
    },
    submitForm() {

      axios
        .post(`${this.$apiRoute}/login`, {
          usuario: this.username,
          password: this.password
        })
        .then(response => {
          if (response.status !== 200)
            return
          localStorage.setItem('token', response.data.token);
          methods.updateProperties(this.$user, response.data.user);
          if (this.$user.admin === true) {
            this.$router.push('/inicio');
          } else {
            if (this.$user.reception === null)
              this.$router.push('/inicio-recepcion');
            else
              this.$router.push('/formulario');
          }
        })
        .catch(error => {
          if (error.status === 401)
            alert(error.response.data.message);
        });
    },
  },
};
</script>

<style>
body {
  background-color: #F2F5FF;
}
</style>