import ky from 'ky'

const BASE_URL = 'https://jsonplaceholder.typicode.com'

const POSTS_URL = `${BASE_URL}/posts/`

function getPosts({ start = 0, limit = 5 } = {}) {
  return ky(POSTS_URL, {
    searchParams: {
      _start: start,
      limit,
    },
  }).json()
}

const posts = {
  get: getPosts,
}

export { posts }
