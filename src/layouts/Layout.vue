<template>
  <v-app>
    <Navbar />
    <v-main>
      <v-container class="fill-height">
        <RouterView />
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts" setup>
import Navbar from "./navbar/Navbar.vue";
</script>
