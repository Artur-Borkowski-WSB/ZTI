<script setup>
  import { useStore } from '@/stores/store'

  defineProps({
    item: {
      type: Object,
      required: true,
    },
  })
  const emit = defineEmits(['open'])

  const store = useStore()
  const { togglePin } = store
</script>

<template>
  <article class="layout-notes-item" @click="emit('open')">
    <h2 class="layout-notes-item-title">
      {{ item.title }}
      <button
        class="btn btn-secondary"
        :title="item.pin ? 'Odepnij' : 'Przypnij'"
        @click.stop="togglePin(item.id)"
      >
        <i class="mdi" :class="item.pin ? 'mdi-pin-off' : 'mdi-pin'"></i>
      </button>
    </h2>
    <p class="layout-notes-item-description">
      {{ item.description }}
    </p>
  </article>
</template>
