// adapted from https://codesandbox.io/s/g7w1c by @b0nyb0y
import { watch, ref } from '@vue/composition-api'
import Validator from 'validatorjs'

export default function useValidation(modelRef, rules) {
  const dirty = ref(false)
  const valid = ref(true)
  const errors = ref({})
  const validateAll = () => {
    // can we move this outside of the fn?
    const validator = new Validator(modelRef.value, rules)
    console.log('validating')
    valid.value = !dirty.value || validator.passes()
    errors.value = dirty.value && validator.errors.errors
    // console.log(validator.errors)
  }

  watch(
    modelRef,
    (newVal, oldVal) => {
      if (newVal === oldVal) {
        dirty.value = true
      } else {
        dirty.value = false
      }
      validateAll()
    },
    { deep: true, lazy: true }
  )

  return { valid, errors, dirty }
}
