import useScroll from './composables/use-scroll'
import { watch, reactive } from 'vue'

export default {
  setup() {
    const stuff = reactive([])

    const { scrollY } = useScroll()

    watch(scrollY, y => {
      // pseudocode checking if we reached end of page
      if (isBottomOfPage(y)) {
        stuff.push(/* ... */)
      }
    })
    return {
      stuff,
    }
  },
}

/*eslint-disable-next-line no-unused-vars */
function isBottomOfPage(y) {
  /** */
}
