import useEvent from './composables/use-event'

export default {
  setup() {
    /**
     * @type { function }
     */
    /*eslint-disable-next-line no-unused-vars */
    const disableHandler = useEvent(event => {
      /* ... */
    })

    return {
      disableHandler,
    }
  },
}
