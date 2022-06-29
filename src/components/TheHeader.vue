<template>
  <header class="header" v-if="!showSearchBar">
    <button title="Menu" @click="sidebarOpen = true">
      <i class="mdi mdi-menu"></i>
    </button>
    <h1 class="header-title">
      <img class="header-title-logo" src="@/assets/imgs/logo.svg" alt="LOGO" />
      ZTI
    </h1>
    <transition name="sidebar">
      <nav
        class="header-nav"
        v-show="sidebarOpen"
        @click="sidebarOpen = false"
      ></nav>
    </transition>
    <button title="Szukaj" @click="showSearchBar = true">
      <i class="mdi mdi-magnify"></i>
    </button>
  </header>
  <header class="header header--search" v-else>
    <label class="header-searchbar">
      <i class="mdi mdi-magnify"></i>
      <input type="text" placeholder="Szukaj..." v-model.trim="searchStr" />
      <button @click="hideSearchbar" title="Zamknij wyszukiwanie">
        <i class="mdi mdi-close-circle-outline"></i>
      </button>
    </label>
  </header>
</template>

<script>
export default {
  name: 'Header',
  data() {
    return {
      sidebarOpen: false,
      showSearchBar: false,
    }
  },
  methods: {
    hideSearchbar() {
      this.showSearchBar = false
      this.searchStr = ''
    },
  },
  computed: {
    searchStr: {
      get() {
        return this.$store.state.searchStr
      },
      set(val) {
        this.$store.commit('setSearch', val)
      },
    },
  },
}
</script>
