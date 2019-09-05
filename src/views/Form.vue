<template>
  <div class="mx-auto max-w-xs text-left">
    <form
      @submit.prevent="onSubmit"
      class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
    >
      <div class="mb-4">
        <label
          for="firstName"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          First Name
          <input
            type="text"
            name="firstName"
            v-model="user.firstName"
            :class="inputStyles"
          />
          <p v-if="errors.firstName" class="text-red-500 text-xs italic">
            {{ errors.firstName[0] }}
          </p>
        </label>
      </div>
      <div class="mb-4">
        <label
          for="lastName"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Last Name
          <input
            type="text"
            name="lastName"
            v-model="user.lastName"
            :class="inputStyles"
          />
          <p v-if="errors.lastName" class="text-red-500 text-xs italic">
            {{ errors.lastName[0] }}
          </p>
        </label>
      </div>
      <div class="mb-4">
        <label
          for="firstName"
          class="block text-gray-700 text-sm font-bold mb-2"
        >
          Address
          <input
            type="text"
            name="address"
            v-model="user.address"
            :class="inputStyles + ' border-red-500'"
          />
          <p v-if="errors.address" class="text-red-500 text-xs italic">
            {{ errors.address[0] }}
          </p>
        </label>
      </div>
      <div class="mb-4">
        <label for="email" class="block text-gray-700 text-sm font-bold mb-2">
          E-Mail
          <input
            type="text"
            name="email"
            v-model="user.email"
            :class="inputStyles"
          />
          <p v-if="errors.email" class="text-red-500 text-xs italic">
            {{ errors.email[0] }}
          </p>
        </label>
      </div>
      <button
        class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        type="submit"
      >
        Create User
      </button>
      <button
        class="ml-5 inline-block align-baseline font-bold text-sm text-blue-500 py-2 px-4 hover:text-blue-800"
        type="button"
        @click="resetUser"
      >
        Reset
      </button>

      <pre v-if="!valid">{{ errors }}</pre>
    </form>
  </div>
</template>

<script>
import useValidation from '../composables/use-validation'
import { createComponent, reactive, ref } from '@vue/composition-api'

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

    const user = ref(createUser())

    const { dirty, valid, errors } = useValidation(user, userRules)

    const resetUser = () => {
      user.value = createUser()
    }

    const message = ref('')

    const onSubmit = () => {
      valid.value && context.emit('change', user)
      resetUser()
      message.value = 'User Created!'
    }

    return {
      user,
      dirty,
      valid,
      errors,
      message,
      onSubmit,
      resetUser,
      inputStyles:
        'inline-block shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline',
    }
  },
})
</script>

<style lang="scss" scoped></style>
