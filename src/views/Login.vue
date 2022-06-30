<template>
  <main class="layout-login">
    <form @submit.prevent>
      <label class="primary-input">
        <i class="mdi mdi-at"></i>
        <input type="email" placeholder="Email" v-model.trim="email" />
      </label>
      <label class="primary-input">
        <i class="mdi mdi-key"></i>
        <input type="password" placeholder="Hasło" v-model.trim="pass" />
      </label>
      <button
        type="button"
        class="btn btn-primary"
        @click="login"
        title="Zaloguj się"
      >
        Zaloguj się
      </button>
      <p class="errmsg">{{ errorMsg }}</p>
    </form>
  </main>
</template>

<script>
export default {
  name: 'Login',
  data() {
    return {
      email: '',
      pass: '',
      errorMsg: null,
    }
  },
  methods: {
    login() {
      if (!this.emailIsValid()) {
        this.errorMsg = 'Niepoprawny adres email'
        return
      }
      this.errorMsg = this.passIsInvalid()

      if (this.errorMsg === null) {
        this.$store.commit('setUser', this.email)
        this.$router.push({ name: 'Start' })
      }
    },
    emailIsValid() {
      if (this.email?.length < 6) return false
      const pattern =
        /^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/
      return pattern.test(this.email)
    },
    passIsInvalid() {
      if (this.pass?.length < 8) return 'Hasło jest zbyt krótkie'
      if (!/[A-Z]/.test(this.pass)) return 'Brak dużej litery'
      if (!/[a-z]/.test(this.pass)) return 'Brak małej litery'
      if (!/[0-9]/.test(this.pass)) return 'Brak cyfry'
      if (!/[^A-Za-z0-9]/.test(this.pass)) return 'Brak znaku specjalnego'

      return null
    },
  },
}
</script>
