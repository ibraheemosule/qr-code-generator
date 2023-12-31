<script lang="ts" setup>
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/app";
import { downloadQr } from "./u_qr";
import { ref, onMounted } from "vue";

import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";

const id = useRoute().params.id;
const store = useStore();
const router = useRouter();
const extension = ref({ png: false, svg: false, jpeg: false });
const error = ref(false);
const qrObject = store.list.filter((qr) => qr.id === id)[0];

if (!qrObject) router.push("/");

async function download(type: string, title: string) {
  error.value = false;
  const value = type as keyof typeof extension.value;
  extension.value[value] = true;

  const status = await downloadQr(type, title);
  if (!status) error.value = true;
  extension.value[value] = false;
}

onMounted(() => {
  if (!qrObject.logo) return;
  const image = document.getElementById("logo") as HTMLImageElement;
  image.src = qrObject.logo;
  image.style.display = "block";
});
</script>

<template>
  <v-container v-if="qrObject" fluid class="fill-height">
    <v-row class="qr-container">
      <v-col cols="12" class="text-center">
        <TitleText value="Qr Image" />
      </v-col>

      <v-col cols="12" sm="6" md="4" class="mx-auto mt-6">
        <div class="img-container pa-2" id="qrContainer">
          <v-img :src="qrObject.qr" />
          <img v-if="qrObject.logo" class="logo" id="logo" />
        </div>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center">
        <v-sheet
          v-for="type in Object.keys(extension)"
          :key="type"
          class="mx-2 my-2"
        >
          <ActionBtn
            @action-fn="download(type, qrObject.title)"
            size="small"
            :text="`Download ${type}`"
            :loading="extension[type as keyof typeof extension]"
          />
        </v-sheet>
      </v-col>
      <v-col cols="12" class="error" v-if="error">
        <p class="text-error text-center">Could not download Qr</p>
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

.img-container,
.qr-container {
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

.error {
  position: absolute;
  bottom: -5%;
}
</style>
