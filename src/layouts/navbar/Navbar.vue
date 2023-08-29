<script setup lang="ts">
const navList = {
  Home: {
    icon: "home-account",
    path: "/",
  },
  "Create QR": {
    icon: "pencil",
    path: "/",
  },
  "QR list": {
    icon: "list-box",
    path: "/",
  },
};
</script>

<template>
  <v-navigation-drawer location="start" expand-on-hover rail permanent>
    <v-list nav class="nav">
      <v-list-item
        v-for="key in Object.keys(navList) as (keyof typeof navList)[]"
        :key="key"
        :prepend-icon="`mdi-${navList[key].icon}`"
        :title="key"
        :to="navList[key].path"
        exact
      />
    </v-list>
  </v-navigation-drawer>
</template>

<style>
.nav {
  margin-top: calc(50vh - 150px);
}
</style>
