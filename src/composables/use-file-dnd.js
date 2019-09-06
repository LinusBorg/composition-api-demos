import { ref, computed, watch } from '@vue/composition-api'

export default function useFileDnD(inputRef, { max = Infinity } = {}) {
  const files = ref([])
  let open

  if (inputRef) {
    const handler = e => {
      files.value = [...e.target.files]
    }

    open = () => {
      console.log('open')
      inputRef.value && inputRef.value.click()
    }
    watch(inputRef, (newEl, oldEl) => {
      oldEl && oldEl.removeEventListener('change', handler)
      newEl && newEl.addEventListener('change', handler)
    })
  }

  let first = ref(false)
  let second = ref(false)

  const cancel = () => {
    first.value = false
    second.value = false
  }

  const events = {
    dragover(e) {
      e.preventDefault()
    },
    dragenter() {
      if (first.value) {
        second.value = true
      } else {
        first.value = true
      }
    },
    dragleave() {
      if (second.value) {
        second.value = false
      } else if (first) {
        first.value = false
      }
    },
    drop(e) {
      e.preventDefault()
      const newFiles = [...e.dataTransfer.files]
      if (files.value.length <= max) {
        files.value = newFiles
      }
      cancel()
    },
  }

  const attrs = {
    tabindex: 0,
    'aria-role': 'button',
    'aria-label': 'Click to select a file to upload',
  }

  return {
    attrs,
    cancel,
    events,
    files,
    hovering: computed(() => first.value),
    open,
  }
}
