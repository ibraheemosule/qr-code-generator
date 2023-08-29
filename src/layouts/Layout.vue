<template>
  <v-app>
    <Navbar />
    <v-main><RouterView /></v-main>
    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "./navbar/Navbar.vue";
</script>
