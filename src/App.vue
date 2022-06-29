<template>
  <div id="app">
    <transition name="popup" appear>
      <div class="backdrop" v-if="showPopup" @click="popupItem = null"></div>
    </transition>
    <transition name="popup" appear>
      <Popup v-if="showPopup" :item="popupItem" @close="popupItem = null" />
    </transition>
    <TheHeader />
    <router-view class="layout" />
    <TheFooter />
  </div>
</template>
<script>
import TheHeader from '@/components/TheHeader'
import TheFooter from '@/components/TheFooter'
import Popup from '@/components/Popup'

export default {
  name: 'App',
  components: { TheHeader, TheFooter, Popup },
  computed: {
    popupItem: {
      get() {
        return this.$store.state.popup
      },
      set(val) {
        this.$store.commit('setPopup', val)
      },
    },
    showPopup() {
      return this.popupItem !== null
    },
  },
  mounted() {
    this.$store.dispatch('setApp')
  },
}
</script>

<style lang="scss">
@import '@/assets/styles/main';
</style>