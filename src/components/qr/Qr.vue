<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/app";
import { downloadQr } from "./u_qr";
import { onMounted } from "vue";

import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";

const id = useRoute().params.id;
const store = useStore();
const router = useRouter();
const extension = ["png", "svg", "jpeg"];

const qrObject = store.list.filter((qr) => qr.id === id)[0];

if (!qrObject) router.push("/");

onMounted(() => {
  if (!qrObject.logo) return;
  const image = document.getElementById("logo") as HTMLImageElement;
  image.src = qrObject.logo;
  image.style.display = "block";
});
</script>

<template>
  <v-container v-if="qrObject" fluid class="fill-height">
    <v-row>
      <v-col cols="12" class="text-center">
        <TitleText value="Qr Image" />
      </v-col>

      <v-col cols="12" sm="6" md="4" class="mx-auto mt-6">
        <div class="img-container pa-2" id="qrContainer">
          <v-img :src="qrObject.qr" />
          <img class="logo" id="logo" />
        </div>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center">
        <v-sheet v-for="type in extension" :key="type" class="mx-2 my-2">
          <ActionBtn
            @action-fn="downloadQr(type, qrObject.title)"
            size="small"
            :text="`Download ${type}`"
          />
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

.img-container {
  position: relative;
}

.logo {
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 5px;
  border-radius: 0.5rem;
  width: 20%;
  object-fit: contain;
}
</style>
