<template>
  <div>You have {{ unread }} messages</div>
</template>

<script>
import { inject, createComponent } from '@vue/composition-api'
export default createComponent({
  setup() {
    const {
      state: { messages },
      addMessage,
      unread,
    } = inject(Symbol.for('MessageStore'))

    return {
      messages,
      addMessage,
      unread,
    }
  },
})
</script>

<style lang="scss" scoped></style>
