<template>
  <div>
    <v-row v-if="!isAddedMode">
      <v-col class="d-flex justify-center">
        <v-btn dark color="indigo" @click="changeMode">
          NEW
        </v-btn>
      </v-col>
    </v-row>
    <v-row v-if="isAddedMode">
      <v-col>
        <v-text-field
          label="New task"
          v-model="taskText"
          @keypress.enter="addNewTask"
        ></v-text-field>
      </v-col>
    </v-row>
    <v-row v-if="isAddedMode">
      <v-col class="d-flex justify-center">
        <v-btn color="primary" elevation="2" @click="addNewTask">Add</v-btn>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { v4 as uuidv4 } from 'uuid'
export default {
  data() {
    return {
      isAddedMode: false,
      taskText: '',
    }
  },
  methods: {
    changeMode() {
      this.isAddedMode = true
    },
    addNewTask() {
      if (this.taskText.trim() === '') {
        return
      }
      this.$store.dispatch('createTask', this.createNewTask())
      this.taskText = ''
      this.isAddedMode = false
    },
    createNewTask() {
      return {
        id: uuidv4(),
        title: this.taskText.trim(),
        completed: false,
      }
    },
  },
  computed: {
    ...mapGetters(['getUserId']),
  },
}
</script>

<style></style>
