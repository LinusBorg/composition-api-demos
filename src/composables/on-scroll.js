import { value } from 'vue-function-api'
import useEvent from './use-event'

export default function useOnScroll(el) {
  let eventEl
  let scrollEl
  if (el) {
    eventEl = el.value
    scrollEl = el.value
  } else {
    eventEl = window
    scrollEl = document.documentEl
  }

  const scrollY = value(null)
  const scrollX = value(null)

  const handler = () => {
    scrollY.value = scrollEl.scrollTop
    scrollX.value = scrollEl.scrollLeft
  }

  const remove = useEvent(eventEl, 'scroll', handler)

  return {
    scrollX,
    scrollY,
    remove,
  }
}
