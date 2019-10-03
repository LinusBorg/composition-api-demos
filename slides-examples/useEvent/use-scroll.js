import { throttle } from 'lodash-es'
import { ref } from '@vue/composition-api'
import useEvent from './use-event'

export default function useOnScroll() {
  const scrollY = ref(null)
  const scrollX = ref(null)

  const doc = document.documentElement
  const handler = throttle(() => {
    scrollY.value = doc.scrollTop
    scrollX.value = doc.scrollLeft
  }, 50)

  const remove = useEvent('scroll', handler, window)

  return {
    scrollX,
    scrollY,
    remove,
  }
}
