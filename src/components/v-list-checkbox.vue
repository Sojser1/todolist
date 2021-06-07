<template>
  <v-checkbox v-model="state" @change="changeCheckbox"></v-checkbox>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
    },
  },
  created() {
    this.setState()
  },
  data() {
    return {
      state: false,
    }
  },
  methods: {
    setState() {
      this.state = this.item.completed
    },
    changeCheckbox() {
      this.$store.dispatch('updateTaskState', this.item.id)
    },
  },

  сomputed: {},
}
</script>

<style></style>
