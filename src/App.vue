<template>
  <v-app>
    <v-navbar></v-navbar>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
    <v-footer app></v-footer>
  </v-app>
</template>

<script>
import VNavbar from './components/v-navbar.vue'
import { getCookie } from './helpers/cookie.js'
export default {
  name: 'App',
  components: { VNavbar },
  created() {
    const accessToken = getCookie('accessToken')
    if (accessToken) {
      this.$store.commit('setToken', accessToken)
    }
  },

  computed: {},
}
</script>
