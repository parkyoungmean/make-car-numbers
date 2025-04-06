<template>
<!-- 523p -->
    <nav class="navbar bg-primary-500 boder-red-200" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <router-link to="/" class="navbar-item">
                자동차 임시번호판
            </router-link>
            <a role="button" href="" class="navbar-buger" aria-label="menu" aria-expanded="false" data-target="navbarBasic">
                <span aria-hidden="true"></span><span aria-hidden="true"></span>
            </a>
        </div>
        <div id="navbarBasic" class="navbar-menu">
            <div class="navbar-start">
                <router-link to="/" class="navbar-item">메인으로 이동</router-link>
                <router-link to="/numberlist" class="navbar-item">자료실 목록</router-link>
                <router-link to="/numberinsert" class="navbar-item">번호 등록</router-link>
            </div>
        </div>
    </nav>
</template>

<script setup>

</script>

<style scoped>

</style>