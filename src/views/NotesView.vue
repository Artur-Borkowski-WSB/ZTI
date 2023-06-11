<script setup>
  import { ref } from 'vue'
  import { storeToRefs } from 'pinia'

  import NoteItem from '@/components/NoteItem.vue'
  import NotePopup from '../components/NotePopup.vue'

  import { useStore } from '@/stores/store'

  const store = useStore()
  const { myNotes } = storeToRefs(store)

  const popupOpen = ref(false)
  const popupItem = ref({})
  const openPopup = (item) => {
    popupOpen.value = true
    if (item === 'new') {
      popupItem.value = {}
    } else {
      popupItem.value = item
    }
  }
  const closePopup = () => {
    popupItem.value = {}
    popupOpen.value = false
  }
</script>

<template>
  <main class="layout-notes">
    <NotePopup :open="popupOpen" :item="popupItem" @close="closePopup" />
    <article
      class="layout-notes-item layout-notes-item--first"
      title="Dodaj nowe"
      @click="openPopup('new')"
    >
      <i class="mdi mdi-plus-circle"></i>
    </article>
    <NoteItem
      v-for="item in myNotes"
      :key="item.id"
      :item="item"
      @open="openPopup(item)"
    />
  </main>
</template>
