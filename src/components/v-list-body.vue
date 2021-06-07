<template>
  <v-simple-table>
    <template v-slot:default>
      <tbody>
        <tr v-for="item in getAllList" :key="item.id">
          <td>{{ item.title }}</td>
          <td class="td-checkbox">
            <v-list-checkbox :item="item"></v-list-checkbox>
          </td>
          <td>
            <v-btn color="error" fab x-small dark @click="deleteTask(item.id)">
              <v-icon>mdi-delete</v-icon>
            </v-btn>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
import { mapGetters } from 'vuex'
import vListCheckbox from './v-list-checkbox.vue'
export default {
  components: { vListCheckbox },
  data() {
    return {}
  },
  methods: {
    deleteTask(itemId) {
      this.$store.dispatch('deleteTask', itemId)
    },
  },
  computed: {
    ...mapGetters(['getAllList']),
  },
}
</script>

<style>
table {
  word-break: break-all;
}
table td {
  overflow: hidden;
}
table td:nth-of-type(1) {
  width: 100%;
}

.td-checkbox {
  text-align: center;
}
</style>
