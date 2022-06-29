<template>
  <main class="layout-notes">
    <article
      class="layout-notes-item layout-notes-item--first"
      title="Dodaj nowe"
      @click="openPopup"
    >
      <button>
        <i class="mdi mdi-plus-circle"></i>
      </button>
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
      console.log(this.$store.state.incrementId)
      let list = this.$store.getters.myNotes
      return list
    },
  },
  methods: {
    openPopup() {
      this.$store.commit('setPopup', {})
    },
  },
}
</script>
