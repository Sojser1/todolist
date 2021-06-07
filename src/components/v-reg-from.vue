<template>
  <div>
    <v-list-error v-if="error">User exist</v-list-error>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-text-field v-model="login" label="Login (min length 8)"></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-text-field
        type="password"
        v-model="password"
        label="Password (min length 8)"
      ></v-text-field>
    </v-col>
    <v-col cols="12" sm="6" offset-sm="3">
      <v-text-field
        type="password"
        v-model="passwordAgain"
        label="Password"
      ></v-text-field>
    </v-col>
    <v-col cols="12" xs="2" offset-xs="5" class="d-flex justify-center">
      <v-btn
        color="accent"
        elevation="2"
        @click="createNewUser"
        :disabled="!validateForm"
        text
        >Create acc</v-btn
      >
    </v-col>
  </div>
</template>

<script>
import vListError from './v-list-error.vue'
export default {
  components: { vListError },
  data() {
    return {
      login: '',
      password: '',
      passwordAgain: '',
      error: false,
    }
  },
  methods: {
    async createNewUser() {
      const response = await this.$store.dispatch('createUser', this.newUser)
      if (response.status === 200) {
        this.$router.push('/login')
      } else {
        this.error = true
        this.login = ''
        this.password = ''
        this.passwordAgain = ''
      }
    },
  },
  computed: {
    validatePassword() {
      if (this.password.length > 7) {
        return this.password === this.passwordAgain
      } else {
        return false
      }
    },
    validateLogin() {
      return this.login.length > 7
    },
    validateForm() {
      return this.validatePassword && this.validateLogin
    },
    newUser() {
      return {
        login: this.login,
        password: this.password,
      }
    },
  },
}
</script>

<style></style>
