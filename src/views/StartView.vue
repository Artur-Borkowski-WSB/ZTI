<script setup>
  import { ref, computed } from 'vue'
  import { storeToRefs } from 'pinia'

  import NoteItem from '@/components/NoteItem.vue'
  import NotePopup from '../components/NotePopup.vue'

  import { useStore } from '@/stores/store'

  const store = useStore()

  const {
    cityName,
    currentWeather: weather,
    loggedUser: user,
    pinnedNotes,
  } = storeToRefs(store)
  const { setCityName, setWeather, fetchWeather, setUser } = store

  const city = computed({
    get() {
      return cityName.value
    },
    set(val) {
      setCityName(val)
    },
  })

  const weatherOk = computed(() => weather.value?.status === 200)
  const weatherText = computed(() => {
    let text = ''
    if (weatherOk.value) {
      const data = weather.value.data
      const name = data.name
      const description = data.weather?.[0]?.description
      const temp = data.main.temp
      text = `${name}, ${description} (${temp}°C)`
    }
    return text
  })
  const weatherIconUrl = computed(() => {
    if (!weatherOk.value) return ''
    let url = import.meta.env.VITE_APP_ICON_URL
    const icon = weather.value.data.weather?.[0]?.icon ?? '02d'
    url += icon + '@2x.png'
    return url
  })

  const isLoading = ref(false)
  const refreshWeather = async () => {
    if (isLoading.value) return
    setWeather({})
    isLoading.value = true
    try {
      await fetchWeather()
    } catch (e) {
      console.error(e)
    } finally {
      isLoading.value = false
    }
  }

  const username = computed(() => {
    let email = user.value
    if (!email) return 'Niezalogowany'
    email = email.split('@')
    return email[0]
  })

  const popupOpen = ref(false)
  const popupItem = ref({})
  const openPopup = (item) => {
    popupOpen.value = true
    popupItem.value = item
  }
  const closePopup = () => {
    popupItem.value = {}
    popupOpen.value = false
  }

  refreshWeather()
</script>

<template>
  <main class="layout-start">
    <NotePopup :open="popupOpen" :item="popupItem" @close="closePopup" />
    <article class="layout-start-hello">
      <section class="layout-start-hello-item">
        <h2>Witaj {{ username }}!</h2>
        <RouterLink
          v-if="!user"
          v-slot="{ navigate }"
          :to="{ name: 'Login' }"
          custom
        >
          <button class="btn btn-primary" title="Zaloguj się" @click="navigate">
            Zaloguj się
          </button>
        </RouterLink>
        <button
          v-else
          class="btn btn-primary"
          title="Wyloguj się"
          @click="setUser(null)"
        >
          Wyloguj się
        </button>
      </section>
      <section class="layout-start-hello-item">
        <h3>
          Pogoda w
          <input
            id="city-name"
            v-model.trim="city"
            type="text"
            placeholder="Wpisz miasto"
          />:
          <button title="Odśwież" @click="refreshWeather">
            <i
              class="mdi mdi-refresh"
              :class="isLoading ? 'mdi-spin' : null"
            ></i>
          </button>
        </h3>
        <div v-if="weatherOk" class="layout-start-hello-item__weather">
          <img :src="weatherIconUrl" alt="Pogoda" /> {{ weatherText }}
        </div>
        <div v-else class="layout-start-hello-item__weather">
          {{ isLoading ? 'Wczytywanie' : 'Brak aktualnych danych pogodowych' }}
        </div>
      </section>
    </article>
    <h3>Twoje przypięte notatki:</h3>
    <article class="layout-start-notes">
      <template v-if="pinnedNotes.length">
        <NoteItem
          v-for="item in pinnedNotes"
          :key="item.id"
          :item="item"
          @open="openPopup(item)"
        />
      </template>
      <p v-else>
        Nie masz przypiętych notatek, naciśnij
        <RouterLink :to="{ name: 'Notes' }"> tutaj</RouterLink>
        aby coś przypiąć
      </p>
    </article>
  </main>
</template>
