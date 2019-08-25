import { computed, ref, watch } from '@vue/composition-api'

export default function usePagination(perPage = ref(10), start = 1) {
  // Internal currentPage ref
  const _currentPage = ref(start)
  // public readonly ref for the currentPage
  // changing the current Page is only possible through the povided methods (see below)
  const currentPage = computed(() => _currentPage.value)

  const total = ref(null)

  // Computed values
  const lastPage = computed(() =>
    total.value ? Math.ceil(total.value / perPage.value) : null
  )
  const offset = computed(() =>
    Math.min(_currentPage.value + 1 * perPage.value, total.value)
  )

  // Functions
  const prev = () => setCurrentPage(_currentPage.value - 1)
  const next = () => setCurrentPage(_currentPage.value + 1)
  const last = () => (_currentPage.value = lastPage.value)
  const setCurrentPage = val => {
    if (typeof val !== 'number') return
    _currentPage.value = minmax(val, 1, lastPage.value)
  }

  // lastPage may never be < currentPage
  watch(
    [total, perPage],
    () => {
      if (_currentPage.value > lastPage.value) {
        _currentPage.value = lastPage.value
      }
    },
    { lazy: true }
  )

  return {
    // Mutable state
    perPage,
    total,
    //Computed
    currentPage,
    lastPage,
    offset,
    // Functions
    next,
    prev,
    last,
    setCurrentPage,
  }
}

function minmax(val, min, max) {
  if (val < min) return min
  if (val > max) return max
  return val
}
