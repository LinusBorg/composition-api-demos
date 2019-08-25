// adapted from https://codesandbox.io/s/g7w1c by @b0nyb0y
import { watch, ref } from '@vue/composition-api'
import Validator from 'validatorjs'

export default function useValidation(model, rules) {
  const valid = ref(true)
  const errors = ref({})
  const validateAll = () => {
    // can we move this outside of the fn?
    const validator = new Validator(model, rules)
    valid.value = validator.passes()
    errors.value = validator.errors
  }

  watch(() => model, validateAll, { deep: true })

  return { valid, errors }
}
