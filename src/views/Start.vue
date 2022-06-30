<template>
  <main class="layout-start">
    <article class="layout-start-hello">
      <section class="layout-start-hello-item">
        <h2>Witaj {{ username }}!</h2>
        <button
          class="btn btn-primary"
          title="Zaloguj się"
          v-if="!user"
          @click="login"
        >
          Zaloguj się
        </button>
        <button
          class="btn btn-primary"
          title="Wyloguj się"
          v-else
          @click="logout"
        >
          Wyloguj się
        </button>
      </section>
      <section class="layout-start-hello-item">
        <h3>
          Pogoda w
          <input type="text" v-model.trim="city" placeholder="Wpisz miasto" />:
          <button @click="refreshWeather" title="Odśwież">
            <i
              class="mdi mdi-refresh"
              :class="isLoading ? 'mdi-spin' : null"
            ></i>
          </button>
        </h3>
        <div v-if="weatherOk" class="layout-start-hello-item__weather">
          <img :src="weatherIconUrl" alt="Pogoda" /> {{ weatherText }}
        </div>
        <div class="layout-start-hello-item__weather" v-else>
          {{ isLoading ? 'Wczytywanie' : 'Brak aktualnych danych pogodowych' }}
        </div>
      </section>
    </article>
    <h3>Twoje przypięte notatki:</h3>
    <article class="layout-start-notes" :key="listKey">
      <template v-if="pinnedNotes.length">
        <NoteItem v-for="item in pinnedNotes" :key="item.id" :item="item" />
      </template>
      <p v-else>
        Nie masz przypiętych notatek, naciśnij
        <router-link :to="{ name: 'Notes' }"> tutaj</router-link>
        aby coś przypiąć
      </p>
    </article>
  </main>
</template>

<script>
import NoteItem from '@/components/NoteItem'

export default {
  name: 'Start',
  components: { NoteItem },
  data() {
    return {
      isLoading: false,
    }
  },
  computed: {
    city: {
      get() {
        return this.$store.state.city
      },
      set(val) {
        this.$store.commit('setCity', val)
      },
    },
    weather() {
      return this.$store.state.weather
    },
    weatherOk() {
      return this.weather?.status === 200
    },
    weatherText() {
      let text = ''
      if (this.weatherOk) {
        text += `${this.weather.data.name}, ${this.weather.data.weather?.[0]?.description} (${this.weather.data.main.temp}°C)`
      }
      return text
    },
    weatherIconUrl() {
      if (!this.weatherOk) return ''
      let url = process.env.VUE_APP_ICON_URL
      url += this.weather.data.weather?.[0]?.icon ?? '02d'
      url += '@2x.png'
      return url
    },
    user() {
      return this.$store.state.user
    },
    username() {
      let email = this.user
      if (!email) return 'Niezalogowany'
      email = email.split('@')
      return email[0]
    },
    pinnedNotes() {
      let list = this.$store.getters.myNotes
      console.log(this.listKey);
      list = list.filter((item) => item.pin === true)
      return list
    },
    listKey() {
      return this.$store.state.listKey
    },
  },
  methods: {
    async refreshWeather() {
      if (this.isLoading) return
      this.$store.commit('setWeather', {})
      this.isLoading = true
      try {
        await this.$store.dispatch('fetchWeather')
      } catch (e) {
        console.error(e)
      } finally {
        this.isLoading = false
      }
    },
    login() {
      this.$router.push({ name: 'Login' })
    },
    logout() {
      this.$store.commit('setUser', null)
    },
  },
  async mounted() {
    await this.refreshWeather()
  },
}
</script>
