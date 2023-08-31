<script lang="ts" setup>
import domToImage from "dom-to-image";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "../../store/app";

import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";

const id = useRoute().params.id;
const store = useStore();
const router = useRouter();

const qrObject = store.list.filter((qr) => qr.id === id)[0];

async function downloadQr(type: string) {
  const qrContainer = document.getElementById("qrContainer");

  const format = {
    png: domToImage.toPng,
    svg: domToImage.toSvg,
    jpeg: domToImage.toJpeg,
  } as Record<string, (arg: Node | null) => Promise<string>>;

  try {
    let convert = await format[type](qrContainer);

    const downloadLink = document.createElement("a");

    downloadLink.href = convert;
    downloadLink.download = `${qrObject.title}.${type}`;
    document.body.appendChild(downloadLink);
    downloadLink.click();

    document.body.removeChild(downloadLink);
  } catch (e) {
    console.log(e);
  }
}

if (!qrObject) router.push("/");
</script>

<template>
  <v-container fluid class="fill-height py-16">
    <v-row>
      <v-col cols="12" class="text-center">
        <TitleText value="Qr Image" />
      </v-col>

      <v-col cols="12" sm="6" md="4" class="mx-auto mt-6">
        <div class="pa-2" id="qrContainer">
          <v-img class="" :src="qrObject.qr" />
        </div>
      </v-col>
      <v-col cols="12" class="d-flex flex-wrap justify-center">
        <v-sheet class="mx-2">
          <ActionBtn
            @action-fn="downloadQr('png')"
            size="small"
            text="Download PNG"
          />
        </v-sheet>
        <v-sheet class="mx-2">
          <ActionBtn
            @action-fn="downloadQr('jpeg')"
            size="small"
            text="Download JPEG"
          />
        </v-sheet>
        <v-sheet class="mx-2">
          <ActionBtn
            @action-fn="downloadQr('svg')"
            size="small"
            text="Download SVG"
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
</style>
