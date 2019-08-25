import { provide } from '@vue/composition-api'
import useFileDnD from './use-file-dnd'
import useEvent from './use-event'

const eventNames = ['dragover', 'dragenter', 'dragleave']

export const key = Symbol('globalFileDnD')
// export const isEnabled = () => enabled

export default function useGlobalFileDnD(enableProvide = false) {
  const { events, hovering: dragging, cancel } = useFileDnD()

  const html = document.querySelector('html')

  eventNames.forEach(evt => {
    useEvent(html, evt, events[evt])
  })
  useEvent(html, 'dragend', cancel)

  enableProvide &&
    provide(enableProvide !== true ? enableProvide : key, dragging)

  return dragging
}
