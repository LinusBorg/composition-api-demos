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
          <h2>Loading page {{ currentPage }}</h2>
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
import useEndOfPage from '../composables/use-endofpage'
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

    const { loading, error, result, call: getImages } = api.images.get

    watch(pagination.currentPage, () => {
      getImages({
        searchParams: {
          _start: pagination.offset.value, // + pagination.perPage.value,
          _limit: pagination.perPage.value,
        },
      })
    })

    watch(result, result => result && photos.push(...result))

    function next() {
      !loading.value && pagination.next()
    }

    useEndOfPage(next, 150 /* px from bottom */)

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
