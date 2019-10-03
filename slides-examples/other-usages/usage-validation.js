import { reactive, toRefs } from '@vue/composition-api'
import useValidation from './use-validation'
const rules = {
  firstName: 'required|alpha|between:3,16',
  lastName: 'required|alpha|between:3,16',
  email: 'required|email',
}

export default {
  setup() {
    const person = reactive({
      firstName: null,
      lastName: null,
      email: null,
    })

    /**
     * @type {{
     *   dirty: boolean
     *   valid: boolean
     *   errors: object
     * }}
     */
    const personValidation = useValidation(person, rules)

    return {
      person,
      ...toRefs(personValidation),
    }
  },
}
