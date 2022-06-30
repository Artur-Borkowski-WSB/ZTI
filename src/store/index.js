import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    notes: [],
    searchStr: '',
    popup: null,
    incrementId: 1,
    user: {},
    city: 'Gdańsk',
    weather: null,
  },
  mutations: {
    setSearch(state, payload) {
      state.searchStr = payload
    },

    setPopup(state, payload) {
      state.popup = payload
    },

    addNote(state, payload) {
      state.notes.push(payload)
    },

    editNote(state, payload) {
      const itemId = state.notes.findIndex((item) => item.id === payload.id)
      if (itemId !== -1) state.notes[itemId] = payload
    },

    removeNote(state, payload) {
      state.notes = state.notes.filter((item) => item.id !== payload)
    },

    saveNotes(state) {
      state.incrementId++
      localStorage.setItem('NoteList', JSON.stringify(state.notes))
    },

    getNotes(state) {
      const items = localStorage.getItem('NoteList')
      if (items) {
        state.notes = JSON.parse(items)
      }
    },

    setCity(state, payload) {
      state.city = payload
    },

    setWeather(state, payload) {
      state.weather = payload
    },

    toggleNotePin(state, payload) {
      const itemId = state.notes.findIndex((item) => item.id === payload)
      if (itemId !== -1) state.notes[itemId].pin = !state.notes[itemId].pin
    },
  },
  actions: {
    _addNote({ commit }, payload) {
      commit('addNote', payload)
      commit('saveNotes')
    },

    _editNote({ commit }, payload) {
      commit('editNote', payload)
      commit('saveNotes')
    },

    _removeNote({ commit }, payload) {
      commit('removeNote', payload)
      commit('saveNotes')
    },

    _toggleNotePin({ commit }, payload) {
      commit('toggleNotePin', payload)
      commit('saveNotes')
    },

    setApp({ commit }) {
      commit('getNotes')
    },

    async fetchWeather({ commit, state }) {
      const url =
        process.env.VUE_APP_API_URL +
        state.city +
        process.env.VUE_APP_API_KEY +
        '&units=metric&lang=pl'

      console.log(url)

      await axios
        .get(url)
        .then((resp) => commit('setWeather', resp))
        .catch((e) => console.error(e))
    },
  },
  getters: {
    myNotes(state) {
      let list = state.notes,
        search = state.searchStr
      if (search?.length > 1) {
        search = search.toLocaleLowerCase()
        list = list.filter((item) =>
          item.title.toLocaleLowerCase().includes(search)
        )
      }
      return list
    },
  },
})
