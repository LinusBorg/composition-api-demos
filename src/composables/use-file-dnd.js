import { ref, computed } from '@vue/composition-api'

export default function useFileDnD({ max = Infinity }) {
  const files = ref(null)

  let disabled = false

  let first = ref(false)
  let second = ref(false)

  const events = {
    dragover(e) {
      if (disabled) return
      e.preventDefault()
    },
    dragenter() {
      if (disabled) return
      if (first.value) {
        second.value = true
      } else {
        first.value = true
      }
    },
    dragleave() {
      if (disabled) return
      if (second.value) {
        second.value = false
      } else if (first) {
        first.value = false
      }
    },
    drop(e) {
      if (disabled) return
      e.preventDefault()
      const files = [...e.dataTransfer.files]
      files.value = files.length > max ? null : files
    },
  }

  return {
    events,
    files,
    hovering: computed(() => first.value),
    toggle: () => (disabled = !disabled),
    cancel: () => {
      first.value = false
      second.value = false
    },
  }
}
