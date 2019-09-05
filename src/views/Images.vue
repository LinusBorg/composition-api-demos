<template>
  <div>
    <div class="article-grid">
      <article v-for="(photo, i) in photos" :key="i" class="article">
        <DemoImage :src="photo.url" />
      </article>
    </div>
    <div class="loading-box">
      <template v-if="loading">
        <div><Spinner /></div>
        <div>
          <h2>Loading page {{ currentPage.value }}</h2>
        </div>
      </template>
      <button v-else @click="next">Load more Iamgrs</button>
    </div>
    <hr />
  </div>
</template>

<script>
import { ref, reactive, watch, createComponent } from '@vue/composition-api'
import usePagination from '../composables/use-pagination'
import usePromise from '../composables/use-promise'
import useScroll from '../composables/use-scroll'
import * as api from '../api'

import DemoImage from '@/components/DemoImage'
import Spinner from '@/components/Spinner'
export default createComponent({
  name: 'ShowImages',
  components: {
    DemoImage,
    Spinner,
  },
  setup() {
    const photos = reactive([])

    const pagination = usePagination(ref(9))

    pagination.total.value = 100

    async function loadPhotos() {
      const newPosts = await api.photos.get({
        start: pagination.offset.value + pagination.perPage.value,
        limit: pagination.perPage.value,
      })

      photos.push(...newPosts)
    }

    const { loading, error, use: getPhotos } = usePromise(loadPhotos)

    // Load initial Posts
    getPhotos()
    // load more posts when page has been increased
    watch(pagination.currentPage, (newVal, oldVal) => {
      newVal > oldVal && getPhotos()
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
      currentPage: pagination.currentPage,
      error,
      loading,
      next,
      photos,
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

.article-grid {
  display: grid;
  max-width: 950px;
  margin: 0 auto;
  grid-template-columns: 1fr 1fr 1fr;
  grid-gap: 10px;
}
</style>
