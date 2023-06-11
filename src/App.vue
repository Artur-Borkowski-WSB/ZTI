<script setup>
  import TheHeader from '@/components/TheHeader.vue'
  import TheFooter from '@/components/TheFooter.vue'

  import { useStore } from '@/stores/store'

  const store = useStore()
  const { loadLocal } = store
  loadLocal()
</script>

<template>
  <TheHeader />
  <RouterView class="layout" />
  <TheFooter />
</template>
