<script lang="ts" setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "@/store/app";

import TitleText from "../reusables/title-text/TitleText.vue";
import ActionBtnGroup from "../reusables/action-btn-group/ActionBtnGroup.vue";
import QrListEmpty from "./qr-list-empty/QrListEmpty.vue";
import ActionBtn from "../reusables/action-btn/ActionBtn.vue";

const store = useStore();

// const qrList = ref([...store.list]);
const search = ref("");
const router = useRouter();

function deleteQr(id: string) {
  store.list = store.list.filter((qr) => qr.id !== id);
  // qrList.value = qrList.value.filter((qr) => qr.id !== id);

  window.localStorage.setItem("qrHistory", JSON.stringify(store.list));
}

function deleteAllQr() {
  store.list = [];
}

const qrList = computed(() =>
  store.list.filter((qr) =>
    qr.title.toLowerCase().includes(search.value.toLocaleLowerCase())
  )
);

function viewQr(id: string) {
  router.push(`qr/${id}`);
}

// watch(search, () => {
//   qrList.value = store.list.filter((qr) =>
//     qr.title.toLowerCase().includes(search.value.toLocaleLowerCase())
//   );
// });
</script>

<template>
  <v-container fluid>
    <TitleText value="Qr Code History" />

    <v-row class="mt-16">
      <template v-if="store.list.length > 3">
        <v-col cols="12" sm="7" md="4">
          <v-text-field
            v-model="search"
            label="Search Title"
            variant="outlined"
          />
        </v-col>
        <v-sheet class="px-4 ml-auto mt-sm-4">
          <ActionBtn @action-fn="deleteAllQr" color="error" text="Delete all" />
        </v-sheet>
      </template>
    </v-row>

    <v-row class="mt-2 pb-16 flex-wrap">
      <QrListEmpty :search="search" :qrList="qrList" />
      <v-col
        class="pa-6 mb-6"
        v-for="qr in qrList"
        :key="qr.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <div class="pa-4 bg-pry rounded h-100">
          <h4 class="text-h6 text-capitalize w-100">
            {{ qr.title }}
          </h4>

          <p class="my-3 align-self-start">
            {{ qr.url }}
          </p>
        </div>
        <div class="bg-pry pa-2">
          <ActionBtnGroup
            @delete-fn="deleteQr(qr.id)"
            @action-fn="viewQr(qr.id)"
            :showAction="true"
            :showDelete="true"
            text="view qr"
          />
        </div>
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
  word-break: break-all;
}

.search-field {
  width: clamp(300px, 40%, 500px);
}
</style>
