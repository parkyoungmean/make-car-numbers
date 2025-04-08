<template>
<!-- 523p -->
<nav class="navbar backdrop-blur bg-blue-600/80 shadow-md has-shadow is-primary" role="navigation" aria-label="main navigation">
    <div class="w-full flex justify-between items-center">
    <div class="navbar-brand">
      <router-link to="/main" class="navbar-item text-2xl font-extrabold text-white tracking-wide">
        🚗 자동차 임시번호판 생성
    </router-link>
          <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
        <span aria-hidden="true"></span>
      </a>
  </div>

  
    <div id="navbarBasic" class="navbar-menu">
      <div class="navbar-start space-x-4 ml-4 flex items-center">
        <router-link to="/" class="navbar-item text-white font-medium hover:bg-white/10 px-4 py-2 rounded transition">🏠 메인으로</router-link>
        <!-- <router-link to="/numberlist" class="navbar-item text-white font-medium hover:bg-white/10 px-4 py-2 rounded transition">📂 자료실</router-link> -->
        <router-link to="/numberinsert" class="navbar-item text-white font-medium hover:bg-white/10 px-4 py-2 rounded transition flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="w-5 h-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="white" stroke-width="2">
            <path stroke-linecap="round" stroke-linejoin="round" d="M12 4v16m8-8H4" />
          </svg>
          번호 생성하기
        </router-link>
      </div>
    </div>
  </div>
</nav>
</template>

<script setup>

</script>

<style scoped>

</style>