<template>
  <footer class="footer">
    <div></div>
    Artur Borkowski, WSB &copy; 2022
    <button @click="scrollTop">
      <i class="mdi mdi-arrow-up-drop-circle"></i>
    </button>
  </footer>
</template>

<script>
export default {
  name: 'Footer',
  methods: {
    scrollTop() {
      window.scrollTo(0, 0)
    },
  },
}
</script>
