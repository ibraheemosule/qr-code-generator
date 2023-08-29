<template>
  <v-app>
    <Navbar />

    <default-view />
  </v-app>
</template>

<script lang="ts" setup>
import DefaultBar from "./AppBar.vue";
import DefaultView from "./View.vue";
import Navbar from "@/components/navbar/Navbar.vue";
</script>
