<template>
  <article
    class="post max-w-2xl border border-gray-200 rounded-sm shadow mb-4 p-3"
  >
    <h2 class="text-teal-500 font-bold fot-serif text-xl">{{ post.title }}</h2>
    <hr class="text-gray-600 mb-2" />
    <p class="text-xs text-gray-500 mb-3">by User {{ post.userId }}</p>
    <p>
      {{ post.body }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'Post',
  props: {
    post: {
      type: Object,
      required: true,
    },
  },
}
</script>

<style lang="scss" scoped></style>
