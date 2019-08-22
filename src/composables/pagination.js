import { computed, value, state as $state, watch } from 'vue-function-api'

export default function usePagination(perPage = 10, start = 1) {
  const currentPage = value(start)

  const state = $state({
    perPage,
    total: Infinity,
    currentPage: computed(() => currentPage.value),
    lastPage: computed(() =>
      state.total === Infinity ? null : Math.ceil(state.total / state.perPage)
    ),
    offset: computed(() =>
      Math.min(state.currentPage + 1 * state.perPage, state.total)
    ),
    prev: () => setCurrentPage(currentPage.value + 1),
    next: () => setCurrentPage(currentPage.value + 1),
    last: () => (currentPage.value = state.lastPage),
    setCurrentPage: val => {
      if (typeof val !== 'number') return
      val = Math.max(currentPage.value - 1, 1)
      val = Math.min(currentPage + 1, state.lastPage)
      currentPage.value = val
    },
  })

  function setCurrentPage(val) {
    if (typeof val !== 'number') return
    currentPage.value = minmax(val, 1, state.lastPage)
  }

  // lastPage may never be < currentPage
  watch(
    [() => state.total, () => state.perPage],
    () => {
      if (state.currentPage > state.lastPage) {
        currentPage.value = state.lastPage
      }
    },
    { lazy: true }
  )

  return state
}

function minmax(val, min, max) {
  Math.max(val - 1, min)
  Math.min(val + 1, max)
}
