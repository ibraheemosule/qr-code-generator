<script lang="ts" setup>
import { ref, computed } from "vue";
import { nanoid } from "nanoid";
import ActionBtnGroup from "../reusables/action-btn-group/ActionBtnGroup.vue";
import TitleText from "../reusables/title-text/TitleText";
import ActionBtn from "../reusables/action-btn/ActionBtn";
import QRCode from "qrcode";
import { useStore } from "../../store/app";
import { useRouter } from "vue-router";

interface IQuery {
  query: string;
  param: string;
  id: string;
}
const store = useStore();
const router = useRouter();

const objQuery = { query: "", param: "", id: nanoid() };

const qrTitle = ref("");
const url = ref("");
const qrImage = ref("");
const qrColor = ref("#000000");
const qrBgColor = ref("#ffffff");

const queries = ref<IQuery[]>([{ ...objQuery }]);

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

async function generateQr() {
  try {
    let generatedQr = await QRCode.toDataURL(concatUrl.value, {
      type: "image/png",
      margin: 1,
      color: {
        dark: qrColor.value, // QR Color
        light: qrBgColor.value, // Background Color
      },
    });

    const id = nanoid(30);

    store.list.push({
      title: qrTitle.value,
      id,
      qr: generatedQr,
      url: concatUrl.value,
    });
    console.log(store.list);

    window.localStorage.setItem("qrHistory", JSON.stringify(store.list));

    router.push(`qr/${id}`);
  } catch (e) {
    console.log(e);
  }
}
</script>

<template>
  <v-container fluid class="fill-height">
    <v-row class="mt-12">
      <v-col cols="12" sm="12" md="6" class="">
        <v-img class="" :src="qrImage" />
        <TitleText value="Generate Qr Code" />
        <v-col cols="12" md="6" class="d-md-none mx-auto">
          <v-img class="" src="@/assets/qr-page-img.svg" />
        </v-col>
        <v-sheet class="mt-12">
          <v-text-field
            v-model="qrTitle"
            class="mt-3"
            label="Qr Code Title"
            hint="Create a Title for the Qr Code"
            variant="outlined"
          />
          <v-text-field
            class="mt-3"
            v-model="url"
            label="Url Link"
            hint="https://example.com or www.example.com"
            variant="outlined"
          />
        </v-sheet>
        <v-row id="queries" v-for="(field, i) in queries" :key="field.id">
          <v-col cols="6" class="pb-0 mb-n3">
            <v-text-field
              v-model="field.query"
              class="mt-3"
              label="Query"
              variant="outlined"
            />
          </v-col>
          <v-col cols="6" class="pb-0 mb-n3">
            <v-text-field
              v-model="field.param"
              class="mt-3"
              label="Param"
              variant="outlined"
            />
          </v-col>
          <ActionBtnGroup
            @delete-fn="deleteQuery(field.id)"
            @action-fn="addQuery"
            :showAction="i === queries.length - 1"
            :showDelete="queries.length > 1"
            text="Add Another Query"
          />
          <!-- <v-sheet class="d-flex justify-space-between w-100 pa-0 ma-0 mt-n3">
            <v-btn
              v-if="queries.length > 1"
              color="warning"
              size="small"
              min-width="0"
              class="p-0"
              variant="text"
              @click="deleteQuery(field.id)"
            >
              <v-icon icon="mdi-trash-can-outline" size="large" end />
            </v-btn>
            <v-btn
              v-if="i === queries.length - 1"
              color="primary"
              max-width="200"
              class="p-0 ml-auto"
              size="small"
              variant="text"
              @click="addQuery"
            >
              Add Another Query
              <v-icon icon="mdi-plus" size="large" end />
            </v-btn>
          </v-sheet> -->
        </v-row>
        <v-row class="mt-8">
          <v-col>
            <label
              class="color-selector mr-4 font-weight-bold d-block"
              for="qrColor"
              >QR Color</label
            >
            <input type="color" id="qrColor" v-model="qrColor" />
          </v-col>
          <v-col>
            <label
              class="color-selector mr-4 font-weight-bold d-block"
              for="qrBgColor"
              >QR Background Color</label
            >
            <input type="color" id="qrBgColor" v-model="qrBgColor" />
          </v-col>
        </v-row>
        <p class="mt-4 text-sec">
          {{ concatUrl }}
        </p>
        <v-sheet class="my-4">
          <ActionBtn @action-fn="generateQr" text="Generate" />
        </v-sheet>
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

input[type="color"] {
  cursor: pointer;
}

.color-selector {
  display: inline-block;
}
</style>
