<template>
  <div>
    <template v-if="!loaderVisible">
      <v-col cols="12" sm="6" offset-sm="3" v-if="hasError">
        <v-list-error>Wrong login or password</v-list-error>
      </v-col>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-form ref="form">
          <v-text-field v-model="login" label="Login"></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" sm="6" offset-sm="3">
        <v-form ref="form">
          <v-text-field
            type="password"
            v-model="password"
            label="Password"
          ></v-text-field>
        </v-form>
      </v-col>
      <v-col cols="12" xs="2" offset-xs="5" class="d-flex justify-center">
        <v-btn color="accent" elevation="2" @click="authUser" text
          >log in</v-btn
        >
      </v-col>
      <v-no-reg></v-no-reg>
    </template>
    <template v-else>
      <div class="d-flex justify-center align-center">
        <v-circle></v-circle>
      </div>
    </template>
  </div>
</template>

<script>
import VCircle from './v-circle.vue'
import vListError from './v-list-error.vue'
import VNoReg from './v-no-reg.vue'
export default {
  components: { vListError, VNoReg, VCircle },
  data() {
    return {
      password: '',
      login: '',
      hasError: false,
      loaderVisible: false,
    }
  },
  methods: {
    async authUser() {
      this.loaderVisible = true
      const response = await this.$store.dispatch('authUser', this.user)

      if (!response.hasError) {
        this.$router.push('/')
        this.$store.commit('Auth')
      } else {
        this.hasError = true
        this.password = ''
      }

      this.loaderVisible = false
    },
    saveTokens(tokens) {
      this.$store.commit('saveTokens', tokens)
    },
  },
  computed: {
    user() {
      return {
        login: this.login,
        password: this.password,
      }
    },
  },
}
</script>

<style></style>
