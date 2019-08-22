import { onMounted, onBeforeDestroy, value } from 'vue-function-api'

export default function useEvent(el = value(document), name, handler) {
  const remove = () => el.value && el.value.removeEventListener(name, handler)

  onMounted(() => el.value && el.value.addEventListener(name, handler))
  onBeforeDestroy(remove)

  return remove
}
