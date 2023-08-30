<script lang="ts" setup>
import TitleText from "../reusables/title-text/TitleText";
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row>
      <v-col cols="12">
        <TitleText value="Qr Image" />
      </v-col>

      <v-col cols="12">
        <v-sheet> qr image here </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h4 {
  word-break: break-word;
}

p {
  font-style: italic;
}
</style>
