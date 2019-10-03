import { onMounted, onBeforeDestroy } from '@vue/composition-api'

export default function(name, handler, el = window) {
  const remove = () => el && el.removeEventListener(name, handler)

  onMounted(() => el && el.addEventListener(name, handler))
  onBeforeDestroy(remove)

  return remove
}

export function useEvent(name, handler, el = window) {
  onMounted(() => el && el.addEventListener(name, handler))
  onBeforeDestroy(el.removeEventListener(name, handler))
}
