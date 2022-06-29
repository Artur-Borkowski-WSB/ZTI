<template>
  <article class="layout-notes-item" @click="showItem">
    <h2 class="layout-notes-item-title">
      {{ item.title }}
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
  },
}
</script>
