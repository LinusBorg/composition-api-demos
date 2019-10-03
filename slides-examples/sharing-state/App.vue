<template>
  <div></div>
</template>

<script>
import store from './store'
import { provide } from '@vue/composition-api'

export default {
  setup() {
    provide(Symbol.for('MessageStore'), store)
  },
}
</script>

<style lang="scss" scoped></style>
