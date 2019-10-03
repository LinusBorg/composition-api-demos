import usePagination from '../src/composables/use-pagination'
export default {
  setup() {
    /**
     * @type {{
     *   perPage: Ref<number>
     *   total: Ref<number|null>
     
     *   currentPage: ReadOnly<number>
     *   lastPage: ReadyOnly<number>
     *   offset: Readonly<number>
     *   
     *   next: () => void
     *   prev: () => void
     *   first: () => void
     *   last: () => void
     *   set: (number) => void
     * }}
     */
    const pagination = usePagination({
      perPage: 10,
    })

    return pagination
  },
}
