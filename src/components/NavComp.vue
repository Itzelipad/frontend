<template>
  <div>
    <!-- Ícono del menú (cuando es responsive) -->
    <nav class="bg-white flex items-center p-2 md:hidden">
      <button
        data-drawer-target="logo-sidebar"
        data-drawer-toggle="logo-sidebar"
        aria-controls="logo-sidebar"
        type="button"
        class="inline-flex items-center p-2 text-sm"
        @click="toggleSidebar"
      >
        <svg class="w-6 h-6 text-[#163891]" :class="menuIconColor" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path clip-rule="evenodd" fill-rule="evenodd" d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"/>
        </svg>
      </button>
    </nav>

    <!-- Menú lateral -->
    <aside id="logo-sidebar" class="fixed top-0 left-0 z-40 w-60 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar" :class="sidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="h-full px-3 py-4 overflow-y-auto dark:bg-white">
        <a class="flex justify-start items-center mb-9" style="margin-left: 12px; margin-top: 30px">
          <span class="self-center text-2xl font-semibold whitespace-nowrap" style="color: #163891"
            >RE - <span class="font-bold" style="color: #163891">SANAMET</span></span
          >
        </a>

        <ul ref="optionsList" class="space-y-5 font-medium text-[#A3AED0]">
          <!-- Opciones del menú -->
          <li>
            <!-- Inicio -->
            <router-link
              :to="userRole === 'Administrador' ? '/inicio' : '/formulario'"
              class="flex items-center p-3 rounded-lg hover:bg-transparent group option"
              :class="{
                'text-[#163891]':
                  $route.path ===
                  (userRole === 'Administrador' ? '/inicio' : '/formulario'),
                'text-[#A3AED0]':
                  $route.path !==
                  (userRole === 'Administrador' ? '/inicio' : '/formulario'),
              }"
              @click="closeSidebar"
            >
              <span
                v-if="
                  $route.path ===
                  (userRole === 'Administrador' ? '/inicio' : '/formulario')
                "
                class="absolute -right-3 top-1/2 transform -translate-y-1/2 h-8 w-1 bg-[#163891] rounded-l-full"
              ></span>
              <svg class="w-7 h-6 group-hover:text-[#163891]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z" clip-rule="evenodd"/>
              </svg>
              <span class="ms-3 group-hover:text-[#163891] text-lg">Inicio</span>
            </router-link>
          </li>
          <li>
            <!-- Recepciones -->
            <router-link
              :to="userRole === 'Administrador' ? '/recepciones' : '/recepcion'"
              class="flex items-center p-3 rounded-lg hover:bg-transparent group option"
              active-class="text-[#163891]"
              :class="{
                'text-[#163891]': $route.path.includes(
                  userRole === 'Administrador' ? 'recepciones' : 'recepcion'
                ),
                'text-[#A3AED0]': !$route.path.includes(
                  userRole === 'Administrador' ? 'recepciones' : 'recepcion'
                ),
              }"
              @click="closeSidebar"
            >
              <span
                v-if="
                  $route.path.includes(
                    userRole === 'Administrador' ? 'recepciones' : 'recepcion'
                  )
                "
                class="absolute -right-3 top-1/2 transform -translate-y-1/2 h-8 w-1 bg-[#163891] rounded-l-full"
              ></span>
              <svg class="w-7 h-6 group-hover:text-[#163891]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M2 6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V6Zm4.996 2a1 1 0 0 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 8a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 11a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Zm-4.004 3a1 1 0 1 0 0 2h.01a1 1 0 1 0 0-2h-.01ZM11 14a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-6Z" clip-rule="evenodd"/>
              </svg>
              <span
                class="flex-1 ms-3 whitespace-nowrap group-hover:text-[#163891] text-lg"
                >{{
                  userRole === "Administrador" ? "Recepciones" : "Estadísticas"
                }}</span
              >
            </router-link>
          </li>
          <li>
            <!-- Doctores-->
            <router-link
              v-if="userRole === 'Administrador'"
              to="/doctores"
              class="flex items-center p-3 rounded-lg hover:bg-transparent group option"
              :class="{
                'text-[#163891]': $route.path.includes('doctor'),
                'text-[#A3AED0]': !$route.path.includes('doctor'),
              }"
              @click="closeSidebar"
            >
              <span
                v-if="$route.path.includes('doctor')"
                class="absolute -right-3 top-1/2 transform -translate-y-1/2 h-8 w-1 bg-[#163891] rounded-l-full"
              ></span>
              <svg class="w-7 h-6 group-hover:text-[#163891]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd"  d="M8 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4H6Zm7.25-2.095c.478-.86.75-1.85.75-2.905a5.973 5.973 0 0 0-.75-2.906 4 4 0 1 1 0 5.811ZM15.466 20c.34-.588.535-1.271.535-2v-1a5.978 5.978 0 0 0-1.528-4H18a4 4 0 0 1 4 4v1a2 2 0 0 1-2 2h-4.535Z" clip-rule="evenodd"/>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap group-hover:text-[#163891] text-lg">Doctores</span>
            </router-link>
          </li>
          <li>
            <!-- Perfil -->
            <router-link
              :to="userRole === 'Recepcionista' ? '/perfil-usuario' : '/perfil'"
              class="flex items-center p-3 rounded-lg hover:bg-transparent group option"
              :class="{
                'text-[#163891]': ['perfil', 'usuario', 'contrasena'].some(
                  (part) => $route.path.includes(part)
                ),
                'text-[#A3AED0]': !['perfil', 'usuario', 'contrasena'].some(
                  (part) => $route.path.includes(part)
                ),
              }"
              @click="closeSidebar"
            >
              <span
                v-if="
                  ['perfil', 'usuario', 'contrasena'].some((part) =>
                    $route.path.includes(part)
                  )
                "
                class="absolute -right-3 top-1/2 transform -translate-y-1/2 h-8 w-1 bg-[#163891] rounded-l-full"
              ></span>

              <svg class="w-7 h-6 group-hover:text-[#163891]" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path fill-rule="evenodd" d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z" clip-rule="evenodd"/>
              </svg>
              <span class="flex-1 ms-3 whitespace-nowrap group-hover:text-[#163891] text-lg">Perfil</span>
            </router-link>
          </li>
        </ul>
      </div>
    </aside>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userRole: "Administrador", //cambiar el rol a Recepcionista para visualizar su barra de navegacion
      sidebarOpen: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.sidebarOpen = !this.sidebarOpen;
    },
    closeSidebar() {
      this.sidebarOpen = false;
    },
    isActive(path) {
      return this.$route.path === path ? "text-[#163891]" : "text-[#A3AED0]";
    },
  },
  computed: {
    menuIconColor() {
      return this.sidebarOpen ? "text-[#A3AED0]" : "text-[#163891]";
    },
  },
};
</script>

<style scoped>
.option {
  position: relative;
}
</style>
