<template>
  <dialog open="true" class="popup" @click.stop>
    <template v-if="editMode">
      <input
        type="text"
        placeholder="Podaj tytuł"
        class="popup-title popup-title--edit"
        v-model.trim="title"
        @focus="err = false"
      />
      <textarea
        class="popup-text popup-text--edit"
        placeholder="Podaj opis"
        v-model.trim="description"
      ></textarea>
      <div class="popup-actions">
        <p class="popup-actions__errmsg" v-if="err">
          Tytuł nie może być pusty!
        </p>
        <button class="btn btn-secondary" @click="cancel" title="Anuluj">
          Anuluj
        </button>
        <button
          class="btn btn-primary"
          @click="remove"
          v-if="objExists"
          title="Usuń"
        >
          Usuń
        </button>
        <button class="btn btn-primary" @click="save" title="Zapisz">
          Zapisz
        </button>
      </div>
    </template>
    <template v-else>
      <h2 class="popup-title">{{ $props.item.title }}</h2>
      <p class="popup-text">{{ $props.item.description }}</p>
      <div class="popup-actions">
        <button class="btn btn-secondary" @click="close" title="Zamknij">
          Zamknij
        </button>
        <button class="btn btn-primary" @click="edit" title="Edytuj">
          Edytuj
        </button>
      </div>
    </template>
  </dialog>
</template>

<script>
export default {
  name: 'Popup',
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      editMode: false,
      id: null,
      title: '',
      description: '',
      err: false,
      pin: false,
    }
  },
  methods: {
    setObject() {
      this.id = this.$props.item?.id ?? this.$store.state.listKey
      this.title = this.$props.item?.title ?? ''
      this.description = this.$props.item?.description ?? ''
      this.pin = this.$props.item?.pin ?? false
    },
    cancel() {
      if (!this.objExists) this.close()
      this.editMode = false
    },
    close() {
      this.$emit('close')
    },
    edit() {
      this.setObject()
      this.editMode = true
    },
    remove() {
      this.$store.dispatch('_removeNote', this.$props.item?.id)
      this.close()
    },
    save() {
      if (!this.title) {
        this.err = true
      } else {
        this.$store.dispatch(this.objExists ? '_editNote' : '_addNote', {
          id: this.id,
          title: this.title,
          description: this.description,
          pin: this.pin,
        })
        this.close()
      }
    },
  },
  computed: {
    objExists() {
      return !!this.$props.item?.id
    },
  },
  mounted() {
    if (!this.objExists) this.edit()
  },
}
</script>
