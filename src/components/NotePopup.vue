<script setup>
  import { ref, computed, watch } from 'vue'
  import { useStore } from '@/stores/store'

  const props = defineProps({
    open: Boolean,
    item: {
      type: Object,
      required: true,
    },
  })
  const emit = defineEmits(['close'])

  const store = useStore()
  const { editNote, removeNote } = store

  const editMode = ref(false)
  const editedNote = ref({
    id: null,
    title: null,
    description: null,
    pin: false,
  })
  const itemExists = computed(() => !!props.item?.id)
  const err = ref(false)

  const close = () => {
    editedNote.value = {
      id: null,
      title: null,
      description: null,
      pin: false,
    }
    err.value = false
    emit('close')
  }

  const save = () => {
    if (!editedNote.value.title) {
      err.value = true
      return
    } else {
      editNote(editedNote.value)
      close()
    }
  }

  const remove = () => {
    removeNote(props.item.id)
    close()
  }

  watch(
    () => props.open,
    (val) => {
      editedNote.value = { ...editedNote.value, ...props.item }
      if (val === true && !itemExists.value) {
        editMode.value = true
      } else {
        editMode.value = false
      }
    }
  )
</script>

<template>
  <teleport to="#popup-container">
    <transition name="popup" appear>
      <div v-if="open" class="backdrop" @click="close"></div>
    </transition>
    <transition name="popup" appear>
      <dialog v-if="open" open="true" class="popup" @click.stop>
        <template v-if="editMode">
          <input
            id="note-title"
            v-model.trim="editedNote.title"
            type="text"
            placeholder="Podaj tytuł"
            class="popup-title popup-title--edit"
            @focus="err = false"
          />
          <textarea
            id="note-description"
            v-model.trim="editedNote.description"
            class="popup-text popup-text--edit"
            placeholder="Podaj opis"
          ></textarea>
          <div class="popup-actions">
            <p v-if="err" class="popup-actions__errmsg">
              Tytuł nie może być pusty!
            </p>
            <button
              class="btn btn-secondary"
              title="Anuluj"
              @click="itemExists ? (editMode = false) : close()"
            >
              Anuluj
            </button>
            <button
              v-if="itemExists"
              class="btn btn-primary"
              title="Usuń"
              @click="remove"
            >
              Usuń
            </button>
            <button class="btn btn-primary" title="Zapisz" @click="save">
              Zapisz
            </button>
          </div>
        </template>
        <template v-else>
          <h2 class="popup-title">{{ item.title }}</h2>
          <p class="popup-text">{{ item.description }}</p>
          <div class="popup-actions">
            <button class="btn btn-secondary" title="Zamknij" @click="close">
              Zamknij
            </button>
            <button
              class="btn btn-primary"
              title="Edytuj"
              @click="editMode = true"
            >
              Edytuj
            </button>
          </div>
        </template>
      </dialog>
    </transition>
  </teleport>
</template>
