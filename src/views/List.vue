<template>
  <div>
    <template v-if="!loaderVisible">
      <div v-if="getAuth">
        <v-row>
          <v-col>
            <v-list-body></v-list-body>
          </v-col>
        </v-row>

        <v-row>
          <v-col>
            <v-add-task></v-add-task>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <v-row>
          <v-col>
            <v-list-error>You are not authorizated</v-list-error>
          </v-col>
        </v-row>
      </div>
    </template>
    <template v-else>
      <div class="d-flex justify-center align-center">
        <v-circle></v-circle>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import VAddTask from '../components/v-add-task.vue'
import VCircle from '../components/v-circle.vue'
import vListBody from '../components/v-list-body.vue'
import VListError from '../components/v-list-error.vue'

export default {
  components: { vListBody, VListError, VAddTask, VCircle },

  async created() {
    this.loaderVisible = true
    await this.$store.dispatch('getList')
    if (!this.getAuth) {
      this.$router.push('/login')
    }
    this.loaderVisible = false
  },
  data() {
    return {
      loaderVisible: false,
    }
  },
  computed: {
    ...mapGetters(['getAuth']),
  },
}
</script>

<style></style>
