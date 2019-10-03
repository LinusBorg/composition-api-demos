import { reactive, toRefs } from '@vue/composition-api'

export default function usePromise(fn) {
  const state = reactive({
    loading: false,
    error: null,
    result: null,
  })

  const use = async (...args) => {
    state.error = null
    state.loading = true
    try {
      const result = await fn(...args)
      state.result = result
    } catch (e) {
      state.error = e
    } finally {
      state.loading = false
    }
  }

  return {
    ...toRefs(state),
    use,
  }
}
