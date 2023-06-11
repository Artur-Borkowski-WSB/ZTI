<script setup>
  import { ref, computed, watch } from 'vue'
  import { useRoute } from 'vue-router'
  import { storeToRefs } from 'pinia'
  import { useStore } from '@/stores/store'

  const route = useRoute()
  const store = useStore()

  const loginPage = computed(() => route.name === 'Login')

  const sidebarOpen = ref(false)
  watch(
    () => route.name,
    () => {
      sidebarOpen.value = false
    }
  )

  const showSearchBar = ref(false)
  const { searchValue, loggedUser } = storeToRefs(store)
  const { setSearch } = store

  const searchStr = computed({
    get() {
      return searchValue.value
    },
    set(val) {
      setSearch(val)
    },
  })

  const hideSearchBar = () => {
    showSearchBar.value = false
    searchStr.value = ''
  }
</script>

<template>
  <header v-if="!showSearchBar || loginPage" class="header">
    <button title="Menu" @click="sidebarOpen = true">
      <i class="mdi mdi-menu"></i>
    </button>
    <RouterLink v-slot="{ navigate }" :to="{ name: 'Start' }" custom>
      <h1 class="header-title" @click="navigate">
        <img
          class="header-title-logo"
          src="@/assets/imgs/logo.svg"
          alt="LOGO"
        />
        Notatnik
      </h1>
    </RouterLink>
    <transition name="sidebar">
      <nav v-show="sidebarOpen" class="header-nav">
        <ul>
          <li>
            <button title="Zamknij" @click="sidebarOpen = false">
              <i class="mdi mdi-close"></i>
            </button>
          </li>
          <li>
            <RouterLink :to="{ name: 'Start' }">Start</RouterLink>
          </li>
          <li>
            <RouterLink :to="{ name: 'Notes' }">Notes</RouterLink>
          </li>
          <li v-if="!loggedUser">
            <RouterLink :to="{ name: 'Login' }">Zaloguj się</RouterLink>
          </li>
        </ul>
      </nav>
    </transition>
    <button v-if="!loginPage" title="Szukaj" @click="showSearchBar = true">
      <i class="mdi mdi-magnify"></i>
    </button>
    <div v-else class="fill"></div>
  </header>
  <header v-else class="header header--search">
    <label class="primary-input">
      <i class="mdi mdi-magnify"></i>
      <input v-model.trim="searchStr" type="text" placeholder="Szukaj..." />
      <button title="Zamknij wyszukiwanie" @click="hideSearchBar">
        <i class="mdi mdi-close-circle-outline"></i>
      </button>
    </label>
  </header>
</template>
