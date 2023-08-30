<template>
  <v-app>
    <Navbar />
    <v-main class="py-12">
      <v-container class="h-screen">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "./navbar/Navbar.vue";
</script>
