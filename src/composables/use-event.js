import { onMounted, onBeforeDestroy, ref } from '@vue/composition-api'
import { unwrap } from '@/composables/utils'
export default function useEvent(el = ref(document), name, handler) {
  el = unwrap(el)
  const remove = () => el.value && el.value.removeEventListener(name, handler)

  onMounted(() => el.value && el.value.addEventListener(name, handler))
  onBeforeDestroy(remove)

  return remove
}
