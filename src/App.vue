<template>
  <div>
    <HeaderComp class="fixed top-0 left-0 w-full z-50" />
    <section class="section">
      <div class="container pt-14 pb-5">
        <router-view />
      </div>
    </section>
    <FooterComp class="fixed bottom-0 left-0 w-full z-50" />
  </div>
</template>

<script setup>
import HeaderComp from './components/HeaderComp.vue';
import FooterComp from './components/FooterComp.vue'
</script>
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 17px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
