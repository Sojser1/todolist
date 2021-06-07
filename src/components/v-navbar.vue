<template>
  <v-app-bar color="deep-purple accent-4" dense dark app>
    <v-toolbar-title class="headerLogo" @click="goToMainPage"
      >ToDo</v-toolbar-title
    >

    <v-spacer></v-spacer>

    <v-btn text @click="gotoLoginPage" v-if="!getAuth">login</v-btn>
    <v-btn text @click="$store.commit('Exit')" v-else>Exit</v-btn>
  </v-app-bar>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  methods: {
    gotoLoginPage() {
      this.$router.push('/login').catch(() => {})
    },
    goToMainPage() {
      this.$router.push('/').catch(() => {})
    },
  },
  computed: {
    ...mapGetters(['getAuth']),
  },
}
</script>

<style>
.headerLogo {
  cursor: pointer;
}
</style>
