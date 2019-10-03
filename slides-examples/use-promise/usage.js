import usePromiseFn from './composables/use-promise-fn'
import api from '../api'
export default {
  setup() {
    /**
     * @type {{
     *   loading: boolean
     *   error: Error<any>
     *   result: any
     *   call: () => Promise<any>
     * }}
     */
    const getUsers = usePromiseFn(() => api.getUsers())

    getUsers.call()

    return {
      getUsers,
    }
  },
}
