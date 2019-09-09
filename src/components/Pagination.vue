<template>
  <div class="pagination">
    <a href="#" @click.prevent="$emit('prev')">&lt;</a>
    <a href="#" @click.prevent="$emit('set', 1)">1</a>
    <span class="current text-teal-500"
      ><strong>{{ pagination.currentPage.value }}</strong></span
    >
    <a
      v-if="pagination.lastPage.value"
      href="#"
      @click.prevent="$emit('set', pagination.lastPage.value)"
      >{{ pagination.lastPage.value }}</a
    >
    <a href="#" @click.prevent="$emit('next')">&gt;</a>
  </div>
</template>

<script>
import { createComponent } from '@vue/composition-api'
export default createComponent({
  props: {
    pagination: Object,
  },
})
</script>

<style lang="scss" scoped>
.pagination {
  font-size: 0.9rem;

  & a,
  .current {
    display: inline-block;
    border: 1px solid #ccc;
    line-height: 0.9rem;
    min-width: 1.6rem;
    height: 1.6rem;
    line-height: 1.6rem;
    text-align: center;

    &:not(:nth-child(1)) {
      margin-left: 5px;
    }
  }
}
</style>
