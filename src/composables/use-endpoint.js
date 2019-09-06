import { ref, computed } from '@vue/composition-api'

export default function useEndpoint(_ky, method, path, _options) {
  const ky = _ky.extend(_options)

  let abortController

  const _loading = ref(false)
  const loading = computed(() => _loading.value)
  const error = ref(false)
  const promise = ref(null)
  const result = ref(null)

  const call = async options => {
    abortController && abortController.abort()
    abortController = new AbortController()
    const promise = wait(
      ky(path, {
        ...options,
        method,
        signal: abortController.signal,
      }).json()
    )
    try {
      _loading.value = true
      result.value = await promise
    } catch (e) {
      error.value = e
    } finally {
      _loading.value = false
    }
  }

  return {
    error,
    loading,
    promise,
    result,
    call,
  }
}

function wait(promise, n = 1500) {
  return new Promise(res => setTimeout(() => res(promise), n))
}
