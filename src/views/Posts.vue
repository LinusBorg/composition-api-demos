<template>
  <div>
    <div class="flex flex-col items-center text-left">
      <article v-for="(post, i) in posts" :key="i">
        <Post :post="post" />
      </article>
    </div>
    <div v-if="posts.length" class="pagination-box">
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
import useArrayPagination from '../composables/use-array-pagination'
import usePromisFn from '../composables/use-promise'
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
    const allPosts = ref([])
    const pagination = useArrayPagination(allPosts)

    cons { loading, error } = usePromise(() => {
      return api.posts
      .get({
        limit: 100,
      })
      .then(result => {
        allPosts.value = result
      })    
    })
    
    return {
      allPosts,
      error,
      loading,
      pagination,
      posts: pagination.result,
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
