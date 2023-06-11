<script setup>
  const scrollTop = () => {
    window.scrollTo(0, 0)
  }
</script>

<template>
  <footer class="footer">
    <div></div>
    Artur Borkowski, WSB &copy; {{ new Date().getFullYear() }}
    <button title="Przejdź do góry" @click="scrollTop">
      <i class="mdi mdi-arrow-up-drop-circle"></i>
    </button>
  </footer>
</template>
