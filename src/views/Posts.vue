<template>
  <div>
    <div class="flex flex-col items-center text-left">
      <article v-for="(post, i) in posts" :key="i">
        <Post :post="post" />
      </article>
    </div>
    <div class="pagination-box">
      <Pagination
        :pagination="pagination"
        @set="pagination.set($event)"
        @prev="pagination.prev()"
        @next="pagination.next()"
        @last="pagination.last()"
      />
    </div>
  </div>
</template>

<script>
import { ref, watch, createComponent } from '@vue/composition-api'
import usePagination from '../composables/use-pagination'
import * as api from '../api'

import Post from '@/components/Post'
import Pagination from '@/components/Pagination.vue'
export default createComponent({
  name: 'ShowPosts',
  components: {
    Post,
    Pagination,
  },
  setup() {
    const pagination = usePagination()

    const posts = ref([])
    const allPosts = ref([])

    function setCurrentPosts() {
      posts.value = allPosts.value.slice(
        pagination.offset.value,
        pagination.offset.value + pagination.perPage.value
      )
    }
    api.posts
      .get({
        limit: 100,
      })
      .then(result => {
        allPosts.value = result
        pagination.total.value = result.length
        setCurrentPosts()
      })

    // load more posts when page has been increased
    watch(pagination.currentPage, setCurrentPosts)

    return {
      allPosts,
      posts,
      pagination,
    }
  },
})
</script>

<style lang="scss" scoped>
.pagination-box {
  margin-top: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
