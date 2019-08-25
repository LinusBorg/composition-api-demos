import { provide, onCreated, onDestroyed } from '@vue/composition-api'
import { useFileDnD } from './file-dnd'

const eventNames = ['dragover', 'dragenter', 'dragleave']

export const key = Symbol('globalFileDnD')
// export const isEnabled = () => enabled

export default function useGlobalFileDnD(enableProvide = false) {
  let enabled = false
  const { events, hovering, cancel, toggle } = useFileDnD()

  const html = document.querySelector('html')

  const enable = () => {
    if (enabled) return
    eventNames.forEach(evt => {
      html.addEventListener(evt, events[evt])
    })
    html.addEventListener('dragend', cancel)
    enabled = true
  }

  const disable = () => {
    if (!enabled) return
    eventNames.forEach(evt => {
      html.removeEventListener(evt, events[evt])
    })
    html.addEventListener('dragend', cancel)
    enabled = false
  }

  onCreated(enable)
  onDestroyed(disable)

  enableProvide &&
    provide(enableProvide !== true ? enableProvide : key, hovering)

  return {
    toggle,
    dragging: hovering,
    enable,
    disable,
  }
}
