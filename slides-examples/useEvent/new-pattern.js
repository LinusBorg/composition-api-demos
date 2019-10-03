import { onMounted, onBeforeDestroy } from '@vue/composition-api'

export default {
  setup() {
    /*eslint-disable-next-line no-unused-vars */
    function handler(event) {
      /* ... */
    }
    onMounted(window.addEventListener(name, handler))
    onBeforeDestroy(window.removeEventListener(name, handler))
  },
}
