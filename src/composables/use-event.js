import { onMounted, onBeforeDestroy, ref } from '@vue/composition-api'

export default function useEvent(el = ref(document), name, handler) {
  const remove = () => el.value && el.value.removeEventListener(name, handler)

  onMounted(() => el.value && el.value.addEventListener(name, handler))
  onBeforeDestroy(remove)

  return remove
}
