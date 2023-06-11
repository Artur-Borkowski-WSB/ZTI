import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import axios from 'axios'

export const useStore = defineStore('store', () => {
  const searchValue = ref('')

  const setSearch = (val) => {
    searchValue.value = val
  }

  const cityName = ref('Gdańsk')

  const setCityName = (val) => {
    cityName.value = val
  }

  const currentWeather = ref(null)

  const setWeather = (val) => {
    currentWeather.value = val
  }

  const fetchWeather = async () => {
    const url =
      import.meta.env.VITE_APP_API_URL +
      cityName.value +
      import.meta.env.VITE_APP_API_KEY +
      '&units=metric&lang=pl'

    await axios
      .get(url)
      .then((resp) => setWeather(resp))
      .catch((e) => console.error(e))
  }

  const notesList = ref([])

  const saveLocal = () => {
    localStorage.setItem('notes', JSON.stringify(notesList.value))
  }

  const loadLocal = () => {
    const notes = localStorage.getItem('notes')
    if (notes) notesList.value = JSON.parse(notes)
  }

  const myNotes = computed(() => {
    const search =
      searchValue.value?.length > 1
        ? searchValue.value.toLocaleLowerCase()
        : null
    if (search) {
      return notesList.value.filter((note) =>
        note.title.toLocaleLowerCase().includes(search)
      )
    } else {
      return notesList.value
    }
  })

  const pinnedNotes = computed(() => myNotes.value.filter((note) => note.pin))

  const removeNote = (noteId) => {
    const index = notesList.value.findIndex((item) => item.id === noteId)
    if (index > -1) notesList.value.splice(index, 1)
    saveLocal()
  }

  const editNote = (payload) => {
    if (payload.id) {
      const itemId = notesList.value.findIndex((item) => item.id === payload.id)
      if (itemId !== -1) notesList.value[itemId] = payload
    } else {
      notesList.value.push({
        ...payload,
        id: `${Date.now().toString(36)}-${Math.random()
          .toString(36)
          .substring(2, 9)}`,
      })
    }
    saveLocal()
  }

  const togglePin = (noteId) => {
    const note = notesList.value.find((item) => item.id === noteId)
    if (note) note.pin = !note.pin
    saveLocal()
  }

  const loggedUser = ref(null)

  const setUser = (val) => {
    loggedUser.value = val
  }

  return {
    searchValue,
    setSearch,
    cityName,
    setCityName,
    currentWeather,
    setWeather,
    fetchWeather,
    notesList,
    pinnedNotes,
    myNotes,
    removeNote,
    editNote,
    togglePin,
    loggedUser,
    setUser,
    loadLocal,
  }
})
