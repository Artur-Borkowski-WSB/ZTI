<script setup>
  import { ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from '@/stores/store'

  const store = useStore()
  const { setUser } = store
  const router = useRouter()

  const email = ref('')
  const pass = ref('')
  const errorMsg = ref('')

  const emailIsValid = () => {
    if (email.value?.length < 6) return false
    const pattern =
      /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
    return pattern.test(email.value)
  }
  const passIsInvalid = () => {
    if (pass.value?.length < 8) return 'Hasło jest zbyt krótkie'
    if (!/[A-Z]/.test(pass.value)) return 'Brak dużej litery'
    if (!/[a-z]/.test(pass.value)) return 'Brak małej litery'
    if (!/[0-9]/.test(pass.value)) return 'Brak cyfry'
    if (!/[^A-Za-z0-9]/.test(pass.value)) return 'Brak znaku specjalnego'

    return null
  }
  const login = () => {
    if (!emailIsValid()) {
      errorMsg.value = 'Niepoprawny adres email'
      return
    }
    errorMsg.value = passIsInvalid()

    if (errorMsg.value === null) {
      setUser(email.value)
      router.push({ name: 'Start' })
    }
  }
</script>

<template>
  <main class="layout-login">
    <form @submit.prevent>
      <label class="primary-input">
        <i class="mdi mdi-at"></i>
        <input
          id="email"
          v-model.trim="email"
          type="email"
          placeholder="Email"
        />
      </label>
      <label class="primary-input">
        <i class="mdi mdi-key"></i>
        <input
          id="pass"
          v-model.trim="pass"
          type="password"
          placeholder="Hasło"
        />
      </label>
      <button
        type="button"
        class="btn btn-primary"
        title="Zaloguj się"
        @click="login"
      >
        Zaloguj się
      </button>
      <p class="errmsg">{{ errorMsg }}</p>
    </form>
  </main>
</template>
