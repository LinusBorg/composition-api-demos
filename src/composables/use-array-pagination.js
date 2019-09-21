import usePagination from './use-pagination'
import { computed } from '@vue/composition-api'

export default function useArrayPagination(arrayRef) {
  const pagination = usePagination(
    undefined,
    computed(() => arrayRef.value.length)
  )

  const result = computed(() => {
    const array = arrayRef.value
    if (!Array.isArray(array)) return []
    return array.slice(
      pagination.offset.value,
      pagination.offset.value + pagination.perPage.value
    )
  })

  return {
    ...pagination,
    result,
  }
}
