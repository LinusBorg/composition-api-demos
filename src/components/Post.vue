<template>
  <article class="post">
    <h2>{{ post.title }}</h2>
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
