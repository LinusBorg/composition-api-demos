import { reactive, ref, toRefs, computed } from '@vue/composition-api'

export default function useEndpoint(_ky, method, path, _options) {
  const ky = _ky.extend(_options)

  let abortController
  const cancelPrevious = () => {
    abortController && abortController.abort()
    abortController = null
  }

  const _loading = ref(false)
  const state = reactive({
    error: null,
    loading: computed(() => _loading.value),
    promise: null,
    result: null,
  })

  const call = async options => {
    state.error = null
    abortController = new AbortController()
    state.promise = wait(
      ky(path, {
        ...options,
        method,
        signal: abortController.signal,
      }).json()
    )
    try {
      _loading.value = true
      state.result = await state.promise
    } catch (e) {
      state.error = e
    } finally {
      _loading.value = false
    }
  }

  return {
    call,
    cancelPrevious,
    ...toRefs(state),
  }
}

function wait(promise, n = 1500) {
  return new Promise(res => setTimeout(() => res(promise), n))
}
