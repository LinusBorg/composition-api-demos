import { reactive, readonly, computed } from '@vue/composition-api'

const state = reactive({
  messages: [],
})

const actions = {
  addMessage: message => {
    state.messages.push(message)
  },
}

const getters = {
  unread: computed(() => state.messages.filter(message => !message.read)),
}

export default {
  state: readonly(state),
  ...actions,
  ...getters,
}
