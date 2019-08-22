<template>
  <div></div>
</template>

<script>
import { state, watch } from 'vue-function-api'
import usePagination from '../composables/pagination'
import { usePromise } from '../composables/use-promise'
import { useScroll } from '../composables/on-scroll'
import api from '../api'

export default {
  name: 'ShowPosts',
  setup() {
    const posts = state([])

    const pagination = usePagination()

    async function loadPosts() {
      const newPosts = await api.posts.get({
        start: pagination.offset.value,
        limit: pagination.perPage.value,
      })

      posts.push(...newPosts)
    }

    const { loading, error, use: getPosts } = usePromise(loadPosts)

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
        document.documentElement.scrollTop + window.innerHeight - newY < 10

      // if we reached the bottom of the page ...
      if (isBottom) {
        // select the next page
        pagination.next()
      }
    })

    return {
      error,
      loading,
      posts,
      next,
      page: pagination.currentPage,
    }
  },
}
</script>

<style lang="scss" scoped></style>
