import Ky from 'ky'
import useEndpoint from '@/composables/use-endpoint'
const BASE_URL = 'https://jsonplaceholder.typicode.com'

const ky = Ky.extend({
  prefixUrl: BASE_URL,
})

const POSTS_URL = 'posts'
const IMAGES_URL = 'photos'

function getPosts({ start = 0, limit = 5 } = {}) {
  return wait(
    ky(POSTS_URL, {
      searchParams: {
        _start: start,
        _limit: limit,
      },
    }).json()
  )
}

const posts = {
  get: getPosts,
}

function getPhotos({ start = 0, limit = 5 } = {}) {
  return wait(
    ky(IMAGES_URL, {
      searchParams: {
        _start: start,
        _limit: limit,
      },
    }).json()
  )
}

const photos = {
  get: getPhotos,
}

const images = {
  get: useEndpoint(ky, 'GET', IMAGES_URL),
}
export { posts, photos, images }

function wait(promise, n = 1500) {
  return new Promise(res => setTimeout(() => res(promise), n))
}
