import { reactive, toRefs } from '@vue/composition-api'
import api from '../api'
export default {
  setup() {
    const state = reactive({
      loading: null,
      error: null,
      result: [],
    })

    async function onClick() {
      state.loading = true
      try {
        state.result = await api.getUsers()
      } catch (error) {
        state.error = error
      } finally {
        state.loading = false
      }
    }

    return {
      ...toRefs(state),
      onClick,
    }
  },
}
