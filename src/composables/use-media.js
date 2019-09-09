import { ref, onBeforeDestroy } from '@vue/composition-api'
import json2mq from 'json2mq'

export function useMedia(query) {
  if (typeof query === 'object') {
    query = json2mq(query)
  }
  const result = ref(null)
  const mqlist = window.matchMedia(query)

  const handler = e => (result.value = e.matches)
  mqlist.addListener(handler)
  onBeforeDestroy(() => mqlist.removeListener(handler))

  return result
}
