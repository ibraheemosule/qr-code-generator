<script lang="ts" setup>
import ActionBtnGroup from "../reusables/action-btn-group/ActionBtnGroup.vue";
import qrList from "../../../testData";
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const dummyList = ref([...qrList]);
const search = ref("");
const router = useRouter();

const deleteQr = (id: string) => {
  dummyList.value = dummyList.value.filter((qr) => qr.id !== id);
};
const viewQr = (id: string) => router.push(`qr/${id}`);

watch(search, () => {
  dummyList.value = qrList.filter((qr) =>
    qr.title.toLowerCase().includes(search.value.toLocaleLowerCase())
  );
});
</script>

<template>
  <v-container fluid>
    <h1 class="text-warning text-h3 font-weight-medium text-capitalize">
      Qr Code History
    </h1>

    <v-sheet class="search-field mt-16">
      <v-text-field v-model="search" label="Search Title" variant="outlined" />
    </v-sheet>

    <v-row class="mt-2 flex-wrap">
      <v-col
        class="pa-6"
        v-for="qr in dummyList"
        :key="qr.id"
        cols="12"
        sm="6"
        md="4"
        xl="3"
      >
        <v-sheet class="pa-4 bg-pry rounded">
          <h4 class="text-h6 text-capitalize">
            {{ qr.title }}
          </h4>

          <p class="my-3">
            {{ qr.link }}
          </p>

          <ActionBtnGroup
            @delete-fn="deleteQr(qr.id)"
            @action-fn="viewQr(qr.id)"
            :showAction="true"
            :showDelete="true"
            text="view"
          />

          <!-- <v-sheet
            class="d-flex justify-space-between w-100 pa-0 ma-0 mt-3 bg-pry"
          >
            <v-btn
              color="warning"
              size="small"
              min-width="0"
              class="py-0"
              variant="text"
              @click="deleteFn"
            >
              <v-icon icon="mdi-trash-can-outline" size="large" end />
            </v-btn>
            <v-btn
              v-if="showAction"
              color="warning"
              max-width="200"
              class="py-0"
              size="small"
              variant="text"
              @click="actionFn"
            >
              View
              <v-icon icon="mdi-plus" size="large" end />
            </v-btn>
          </v-sheet> -->
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

.search-field {
  width: clamp(300px, 40%, 500px);
}
</style>
