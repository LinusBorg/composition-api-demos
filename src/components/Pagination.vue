<template>
  <div>
    <a href="#" @click.prevent="setCurrentPage(1)">&lt;&lt;</a> |
    <a href="#" @click.prevent="prev()">&lt;</a> |
    <a href="#" @click.prevent="next()">&gt;</a> |
    <a v-if="lastPage" href="#" @click.prevent="setCurrentPage(lastPage.value)"
      >&gt;&gt;</a
    >
  </div>
</template>

<script>
import { createComponent, watch } from '@vue/composition-api'
import usePagination from '../composables/pagination'
export default createComponent({
  props: {
    perPage: Number,
    total: Number,
  },
  setup(props, context) {
    const pagination = usePagination()

    watch(() => props.total, total => (pagination.total.value = total))

    watch(pagination.currentPage, page => context.emit('current-page', page))

    return {
      ...pagination,
    }
  },
})
</script>

<style lang="scss" scoped></style>
