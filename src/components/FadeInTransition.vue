<template functional>
  <transition name="fade" :appear="props.appear">
    <slot />
  </transition>
</template>

<script>
export default {
  name: 'FadeInTransition',
  functional: true,
  props: {
    appear: Boolean,
  },
}
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>
