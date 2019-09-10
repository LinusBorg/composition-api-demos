import usePagination from './use-pagination'
import { ref, watch } from '@vue/composition-api'

export default function useArrayPagination(arrayRef = ref([])) {
  const pagination = usePagination(undefined, arrayRef.value.length)

  const result = ref([])

  watch(() => {
    const array = arrayRef.value
    if (!Array.isArray(array)) return
    result.value = array.slice(
      pagination.offset.value,
      pagination.offset.value + pagination.perPage.value
    )
  })

  return {
    ...pagination,
    result,
  }
}
