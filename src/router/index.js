import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/LoginView.vue'
import InicioView from '../views/InicioView.vue'
import FormularioView from '../views/FormularioView.vue'
import RecepcionesView from '../views/RecepcionesView.vue'
import DoctoresView from '../views/DoctoresView.vue'
import PerfilView from '../views/PerfilView.vue'
import PerfilRecepcionistaView from '../views/PerfilRecepcionistaView.vue'
import EditarPerfilView from '../views/EditarPerfilView.vue'
import EditarRecepcionView from '../views/EditarRecepcionView.vue'
import AgregarRecepcionView from '../views/AgregarRecepcionView.vue'
import RegistrarUsuarioView from '../views/RegistrarUsuarioView.vue'
import EditarContrasenaView from '../views/EditarContrasenaView.vue'
import EditarUsuarioView from '../views/EditarUsuarioView.vue'
import RecepcionView from '../views/RecepcionView.vue'
import RegistrarDoctorView from '../views/RegistrarDoctorView.vue'
import EditarDoctorView from '../views/EditarDoctorView.vue'
import EstadisticasDocView from '../views/EstadisticasDocView.vue'
import ElegirRecepcionView from '../views/ElegirRecepcionView.vue'

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
    meta: { hideNav: true }
  },
  {
    path: '/inicio',
    name: 'inicio',
    component: InicioView
  },
  {
    path: '/inicio-recepcion',
    name: 'inicio-recepcion',
    component: ElegirRecepcionView,
    meta: { hideNav: true }
  },
  {
    path: '/formulario',
    name: 'formulario',
    component: FormularioView
  },
  {
    path: '/recepciones',
    name: 'recepciones',
    component: RecepcionesView
  },
  {
    path: '/doctores',
    name: 'doctores',
    component: DoctoresView
  },
  {
    path: '/perfil',
    name: 'perfil',
    component: PerfilView
  },
  {
    path: '/perfil-usuario',
    name: 'perfil-usuario',
    component: PerfilRecepcionistaView
  },
  {
    path: '/editar-perfil',
    name: 'editar-perfil',
    component: EditarPerfilView
  },
  {
    path: '/editar-recepcion',
    name: 'editar-recepcion',
    component: EditarRecepcionView
  },
  {
    path: '/recepcion',
    name: 'recepcion',
    component: RecepcionView
  },
  {
    path: '/agregar-recepcion',
    name: 'agregar-recepcion',
    component: AgregarRecepcionView
  },
  {
    path: '/registrar-usuario',
    name: 'registrar-usuario',
    component: RegistrarUsuarioView
  },
  {
    path: '/editar-usuario',
    name: 'editar-usuario',
    component: EditarUsuarioView
  },
  {
    path: '/editar-contrasena',
    name: 'editar-contrasena',
    component: EditarContrasenaView
  },
  {
    path: '/registrar-doctor',
    name: 'registrar-doctor',
    component: RegistrarDoctorView
  },
  {
    path: '/editar-doctor',
    name: 'editar-doctor',
    component: EditarDoctorView
  },
  {
    path: '/estadisticas-doctor',
    name: 'estadisticas-doctor',
    component: EstadisticasDocView
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
