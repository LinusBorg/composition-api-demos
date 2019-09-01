<template>
  <FadeIn appear>
    <img :src="src" v-bind="$attrs" />
  </FadeIn>
</template>

<script>
import FadeIn from './FadeInTransition'
export default {
  name: 'DemoImage',
  props: {
    src: {
      type: String,
      required: true,
    },
  },
  inheritAttrs: false,
  components: {
    FadeIn,
  },
}
</script>

<style lang="scss" scoped></style>
