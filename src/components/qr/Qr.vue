<script lang="ts" setup>
import TitleText from "../reusables/title-text/TitleText";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/app";

const id = useRoute().params.id;
const store = useStore();
const router = useRouter();

const qrImg = store.list.filter((qr) => qr.id === id)[0]?.qr;

if (!qrImg) router.push("/");
</script>

<template>
  <v-container fluid class="fill-height py-16">
    <v-row>
      <v-col cols="12" class="text-center">
        <TitleText value="Qr Image" />
      </v-col>

      <v-col cols="12" sm="6" class="mx-auto mt-16">
        <v-img class="" :src="qrImg" />
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center mt-6">
        <v-sheet class="ma-4">
          <v-btn color="primary" max-width="200" size="large" variant="flat">
            Generate
          </v-btn>
        </v-sheet>
        <v-sheet class="ma-4">
          <v-btn color="primary" max-width="200" size="large" variant="flat">
            Generate
          </v-btn>
        </v-sheet>
        <v-sheet class="ma-4">
          <v-btn color="primary" max-width="200" size="large" variant="flat">
            Generate
          </v-btn>
        </v-sheet>
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
