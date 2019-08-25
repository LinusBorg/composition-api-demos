import { provide, onCreated, onDestroyed } from '@vue/composition-api'
import useFileDnD from './use-file-dnd'

const eventNames = ['dragover', 'dragenter', 'dragleave']

export const key = Symbol('globalFileDnD')
// export const isEnabled = () => enabled

export default function useGlobalFileDnD(enableProvide = false) {
  const { events, hovering: dragging, cancel } = useFileDnD()

  const html = document.querySelector('html')

  const enable = () => {
    eventNames.forEach(evt => {
      html.addEventListener(evt, events[evt])
    })
    html.addEventListener('dragend', cancel)
  }

  const disable = () => {
    eventNames.forEach(evt => {
      html.removeEventListener(evt, events[evt])
    })
    html.addEventListener('dragend', cancel)
  }

  onCreated(enable)
  onDestroyed(disable)

  enableProvide &&
    provide(enableProvide !== true ? enableProvide : key, dragging)

  return dragging
}
