<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { nanoid } from "nanoid";
import QRCode from "qrcode";

import { QueryParamType } from "../../ts-types/data-types";
import * as utils from "./u_create-qr";
import { useStore } from "../../store/app";

import ActionBtnGroup from "../reusables/action-btn-group/ActionBtnGroup.vue";
import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";

const store = useStore();
const router = useRouter();

const objQuery = { query: "", param: "", id: nanoid() };

const qrTitle = ref("");
const url = ref("");
const logo = ref<File[]>([]);
const queries = ref<QueryParamType[]>([{ ...objQuery }]);

const concatUrl = computed(() => {
  const concatQueries = queries.value.reduce((prev, queryObj) => {
    if (!queryObj.query) return prev;

    const queryParam = `${prev}${prev.includes("?") ? "&" : "?"}${
      queryObj.query
    }=${queryObj.param}`;
    return queryParam;
  }, "");

  return `${url.value}${concatQueries}`;
});

function addQuery() {
  queries.value = [...queries.value, { ...objQuery, id: nanoid() }];
}

function deleteQuery(id: string) {
  setTimeout(() => {
    queries.value = queries.value.filter((field) => id !== field.id);
  }, 200);
}

async function generateQr(e: SubmitEvent) {
  const form = (await e) as { valid: boolean } & SubmitEvent;
  if (!form.valid) return;

  try {
    let generatedQr = await QRCode.toDataURL(concatUrl.value, {
      type: "image/png",
      margin: 1,
      color: {
        dark: "#000000", // QR Color
        light: "#ffffff", // Background Color
      },
    });

    let imgString;
    if (logo.value[0]) {
      imgString = (await utils.convertImg(logo.value[0])) as string;
    }

    const id = nanoid(30);

    store.list.push({
      title: qrTitle.value,
      id,
      qr: generatedQr,
      url: concatUrl.value,
      logo: imgString,
    });

    window.localStorage.setItem("qrHistory", JSON.stringify(store.list));
    router.push(`qr/${id}`);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <v-container fluid class="fill-height py-16 overflow-md-hidden">
    <v-row>
      <v-col cols="12" sm="12" md="6" class="">
        <TitleText value="Generate Qr Code" />
        <v-col cols="12" md="6" class="d-md-none mx-auto">
          <v-img class="" src="@/assets/qr-page-img.svg" />
        </v-col>
        <v-form
          validate-on="blur"
          class="my-md-12"
          @submit.prevent="generateQr"
        >
          <v-sheet class="mt-16">
            <v-text-field
              v-model="qrTitle"
              :rules="utils.titleValidation"
              class="mt-3"
              aria-required="true"
              label="Qr Code Title"
              hint="Create a Title for the Qr Code"
              variant="outlined"
            />
            <v-text-field
              class="mt-3"
              v-model="url"
              aria-required="true"
              :rules="utils.urlValidation"
              label="Url Link"
              hint="https://example.com or www.example.com"
              variant="outlined"
            />
            <v-file-input
              class="mt-3"
              v-model="logo"
              :rules="utils.imgValidation"
              accept=".png, .jpeg, .jpg, .svg"
              aria-required="false"
              prepend-icon="mdi-image"
              label="Upload Brand Logo (optional)"
              variant="outlined"
            ></v-file-input>
          </v-sheet>
          <v-row id="queries" v-for="(field, i) in queries" :key="field.id">
            <v-col cols="6" class="pb-0 mb-n3">
              <v-text-field
                v-model="field.query"
                :rules="utils.queryValidation"
                class="mt-3"
                label="Query"
                variant="outlined"
              />
            </v-col>
            <v-col cols="6" class="pb-0 mb-n3">
              <v-text-field
                v-model="field.param"
                :rules="utils.paramValidation(field.query)"
                class="mt-3"
                label="Param"
                variant="outlined"
              />
            </v-col>
            <v-col cols="12" class="mt-0 pt-1">
              <ActionBtnGroup
                @delete-fn="deleteQuery(field.id)"
                @action-fn="addQuery"
                :showAction="i === queries.length - 1"
                :showDelete="queries.length > 1"
                text="Add Another Query"
              />
            </v-col>
          </v-row>
          <p class="mt-4 text-sec">
            {{ concatUrl }}
          </p>
          <v-sheet class="my-6">
            <ActionBtn text="Generate" />
          </v-sheet>
        </v-form>
      </v-col>

      <v-col cols="12" md="6" class="d-none d-md-block">
        <v-img class="" src="@/assets/qr-page-img.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h4 {
  line-height: 2rem;
}

p {
  word-break: break-word;
  font-style: italic;
  max-width: 500px;
}

form {
  overflow: hidden;
  overflow-y: auto;
  max-height: auto;
}

@media (min-width: 600px) {
  form {
    max-height: clamp(300px, 60vh, 550px);
  }
}

@media (min-width: 1280px) {
  form {
    max-height: clamp(500px, 70vh, 700px);
  }
}
</style>
