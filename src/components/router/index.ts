import { createWebHistory, createRouter } from "vue-router";
import ShiftComponent from '../algorithm/Shift.vue'
import MonoComponent from '../algorithm/Monoalphabetic.vue'
import VigenereComponent from '../algorithm/Vigenere.vue'
import RSAComponent from '../algorithm/RSA.vue'

const routes = [
  {
    path: "",
    name: "index",
    component: ShiftComponent
  },
  {
    path: "/shift",
    name: "Shift",
    component: ShiftComponent
  },
  {
    path: "/mono",
    name: "Monoalphabetic",
    component: MonoComponent
  },
  {
    path: "/vigenere",
    name: "Vigenere",
    component: VigenereComponent
  },
  {
    path: "/rsa",
    name: "RSA",
    component: RSAComponent
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;