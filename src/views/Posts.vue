<template>
  <div style="text-align: left;">
    <article v-for="(post, i) in posts" :key="i">
      <Post :post="post" />
    </article>
    <div class="loading-box">
      <Spinner v-if="loading" />
      <h2 v-if="loading">Loading page {{ pagination.currentPage.value }}</h2>
      <button v-else @click="next">Load more Posts</button>
    </div>
    <hr />
  </div>
</template>

<script>
import { reactive, watch, createComponent } from '@vue/composition-api'
import usePagination from '../composables/pagination'
import usePromise from '../composables/use-promise'
import useScroll from '../composables/use-scroll'
import * as api from '../api'

import Post from '@/components/Post'
import Spinner from '@/components/Spinner'
export default createComponent({
  name: 'ShowPosts',
  components: {
    Post,
    Spinner,
  },
  setup() {
    const posts = reactive([])

    const pagination = usePagination()

    pagination.total.value = 105

    async function loadPosts() {
      const newPosts = await api.posts.get({
        start: pagination.offset.value,
        limit: pagination.perPage.value,
      })

      posts.push(...newPosts)
    }

    const { loading, error, use: getPosts } = usePromise(loadPosts)

    // Load initial Posts
    getPosts()
    // load more posts when page was increased
    watch(pagination.currentPage, (newVal, oldVal) => {
      newVal > oldVal && getPosts()
    })

    function next() {
      !loading.value && pagination.next()
    }

    const { scrollY } = useScroll()

    watch(scrollY, (newY, oldY) => {
      // return if already loading or scrolling up
      if (loading.value || newY < oldY) return

      const isBottom =
        document.documentElement.scrollHeight - (window.innerHeight + newY) <
        150
      // if we reached the bottom of the page ...
      // select the next page
      isBottom && pagination.next()
    })

    return {
      posts,
      error,
      loading,
      next,
      pagination,
    }
  },
})
</script>

<style lang="scss" scoped>
.loading-box {
  min-height: 150px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
