import Vue from 'vue'
import api from '../api'
Vue.extend({
  data: () => ({
    loading: null,
    error: null,
    result: [],
  }),
  methods: {
    // click handler for a button
    async onClick() {
      this.loading = true
      let result
      try {
        result = await api.getUsers()
      } catch (error) {
        this.error = error
      } finally {
        this.loading = false
      }
      this.result = result
    },
  },
})
