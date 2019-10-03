import useEndOfPage from './composables/use-end-of-page'
export default {
  setup() {
    function loadMore() {
      /*  */
    }
    useEndOfPage(loadMore)

    return {
      // so we can use it with a button as well
      loadMore,
    }
  },
}
