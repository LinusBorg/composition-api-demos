<template>
  <div>
    <div class="grid">
      <article v-for="(photo, i) in photos" :key="i">
        <DemoImage :src="photo.url" />
      </article>
    </div>
    <div v-if="loading"><Spinner /></div>
    <button v-else-if="!loading && currentPage < 12" @click="next">
      Load more Images
    </button>
    <hr />
  </div>
</template>

<script>
import { reactive, createComponent } from '@vue/composition-api'
import usePagination from '../composables/use-pagination'
import useEndOfPage from '../composables/use-endofpage'
import usePromiseFn from '../composables/use-promise'
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

    const pagination = usePagination({ perPage: 9 })

    const _loadImages = async (offset, perPage) => {
      const result = await api.photos.get({
        start: offset,
        limit: perPage,
      })
      photos.push(...result)
    }

    const { loading, error, use: loadImages } = usePromiseFn(_loadImages)

    function next() {
      if (loading.value) return
      pagination.next()
      loadImages(pagination.offset.value, pagination.perPage.value)
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
