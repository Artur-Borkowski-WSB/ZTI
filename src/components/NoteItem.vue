<template>
  <article class="layout-notes-item" @click="showItem">
    <h2 class="layout-notes-item-title">
      {{ item.title }}
      <button
        class="btn btn-secondary"
        @click.stop="togglePin"
        :title="item.pin ? 'Odepnij' : 'Przypnij'"
      >
        <i class="mdi" :class="item.pin ? 'mdi-pin-off' : 'mdi-pin'"></i>
      </button>
    </h2>
    <p class="layout-notes-item-description">
      {{ item.description }}
    </p>
  </article>
</template>

<script>
export default {
  name: 'Notes',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    showItem() {
      this.$store.commit('setPopup', this.item)
    },
    togglePin() {
      this.$store.dispatch('_toggleNotePin', this.item.id)
    },
  },
}
</script>
