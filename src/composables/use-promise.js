import { state as $state, toRefs } from 'vue-function-api'

export default function usePromise(fn) {
  if (!fn) {
    throw new Error(
      `[usePromise]: 1st argument is required (must be a function)`
    )
  }

  if (typeof fn !== 'function') {
    throw new Error(
      `[usePromise]: argument has to be function, but received ${typeof fn}`
    )
  }
  const state = $state({
    pending: false,
    error: null,
    result: null,
  })

  const reset = () =>
    Object.assign(state, {
      loading: null,
      error: null,
      result: null,
    })

  const use = async (...args) => {
    reset()
    state.loading = true
    try {
      state.result = await fn(...args)
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
