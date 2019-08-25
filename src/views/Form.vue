<template>
  <div></div>
</template>

<script>
import useValidation from '../composables/use-validation'
import { reactive } from '@vue/babel-helper-vue-jsx-merge-props'

const userRules = {
  firstName: 'required|alpha|between:3,16',
  lastName: 'required|alpha|between:3,16',
  address: 'between:6,128',
  phoneNum: 'digits:10',
  email: 'required|email',
}
export default {
  name: 'Form',
  setup() {
    const user = reactive({
      firstName: null,
      lastName: null,
      address: null,
      phoneNum: null,
      email: null,
    })
    const { valid, errors } = useValidation(user, userRules)

    return {
      user,
      valid,
      errors,
    }
  },
}
</script>

<style lang="scss" scoped></style>
