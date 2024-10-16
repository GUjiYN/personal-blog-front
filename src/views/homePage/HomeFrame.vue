<template>
  <a-layout class="layout">
      <Navbar/>
    <a-layout-content>
      <router-view/>
    </a-layout-content>
    <Footer/>
  </a-layout>
</template>
<script setup>
import Footer from "@/components/homeCompoments/Footer.vue";
import Navbar from "@/components/homeCompoments/Navbar.vue";
</script>
