<template>
  <div>
    <form @submit="onSubmit">
      <label for="firstName">
        First Name
        <input type="text" name="firstName" v-model="user.firstName" /> </label
      ><br />
      <label for="lastName">
        Last Name
        <input type="text" name="lastName" v-model="user.lastName" /> </label
      ><br />
      <label for="firstName">
        Address
        <input type="text" name="address" v-model="user.address" /> </label
      ><br />
      <label for="email">
        First Name
        <input type="text" name="email" v-model="user.firstName" /> </label
      ><br />
      <button type="button" @click="resetUser">Reset</button>
      <button type="submit">Submit</button>
    </form>
  </div>
</template>

<script>
import useValidation from '../composables/use-validation'
import { createComponent, reactive } from '@vue/composition-api'

const userRules = {
  firstName: 'required|alpha|between:3,16',
  lastName: 'required|alpha|between:3,16',
  address: 'between:6,128',
  email: 'required|email',
}
export default createComponent({
  name: 'Form',
  setup(_, context) {
    const createUser = () =>
      reactive({
        firstName: null,
        lastName: null,
        address: null,
        email: null,
      })

    const user = createUser()

    const { valid, errors } = useValidation(user, userRules)

    const resetUser = () => Object.assign(user, createUser())
    const onSubmit = () => valid.value && context.emit('change', user)

    return {
      user,
      valid,
      errors,
      onSubmit,
      resetUser,
    }
  },
})
</script>

<style lang="scss" scoped></style>
