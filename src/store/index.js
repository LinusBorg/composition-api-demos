import {
  reactive,
  readonly,
  toRefs,
  computed,
  createComponent,
  provide,
  inject,
} from '@vue/composition-api'

let _id = 0
class Notification {
  createdAt = null
  readAt = null
  id = null
  constructor({ title, message }) {
    this.id = _id++
    this.title = title
    this.message = message
    this.createdAt = Date.now()
  }
}

export const state = reactive({
  list: [],
  map: new Map(),
})

export const actions = {
  add(payload) {
    const notification = new Notification(payload)
    state.list.push(notification)
    state.map.set(notification.id, notification)
  },
  remove(id) {
    const notification = state.map.get(id)
    if (notification) {
      const idx = state.list.findIndex(notification)
      idx && state.list.splice(idx, 1)
    }
  },
  setRead(id) {
    const notification = state.map.get(id)
    notification.readAt = Date.now
  },
}

export const computeds = {
  unreadNotifications: computed(() => state.list.filter(n => !n.readAt)),
  hasNotifications: computed(() => state.list.length),
  hasUnreadNotifications: computed(
    () => !!computeds.unreadNotifications.length
  ),
}

export const key = Symbol('NotificationStore')

export const NotificationProvider = createComponent({
  setup() {
    provide(key, {
      ...toRefs(readonly(state)),
      ...computeds,
      ...actions,
    })
    return {}
  },
  render(h) {
    return h('div', this.$slots.default)
  },
})

export const useNotifications = () => inject(key)
