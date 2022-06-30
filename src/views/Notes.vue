<template>
  <main class="layout-notes" :key="listKey">
    <article
      class="layout-notes-item layout-notes-item--first"
      title="Dodaj nowe"
      @click="openPopup"
    >
      <i class="mdi mdi-plus-circle"></i>
    </article>
    <NoteItem v-for="item in myNotes" :key="item.id" :item="item" />
  </main>
</template>

<script>
import NoteItem from '@/components/NoteItem'

export default {
  name: 'Notes',
  components: { NoteItem },
  computed: {
    myNotes() {
      let list = this.$store.getters.myNotes
      return list
    },
    listKey() {
      return this.$store.state.listKey
    },
  },
  methods: {
    openPopup() {
      this.$store.commit('setPopup', {})
    },
  },
}
</script>
