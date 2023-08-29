<script lang="ts" setup>
import { ref, computed } from "vue";
import { nanoid } from "nanoid";

const objQuery = { query: "", param: "", id: nanoid() };

const qrTitle = ref("");
const url = ref("");

const queries = ref([
  { ...objQuery },
  { query: "", param: "", id: nanoid() },
]) as {
  query: string;
  param: string;
  id: string;
}[];

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

const addQuery = () => {
  queries.value = [...queries.value, { ...objQuery }];
};

const deleteQuery = (id) => {
  setTimeout(() => {
    queries.value = queries.value.filter((field) => id !== field.id);
  }, 200);
};
</script>

<template>
  <v-container fluid>
    <v-row class="mt-12">
      <v-col cols="6">
        <h1 class="text-warning text-h3 font-weight-medium text-capitalize">
          Generate Qr Code
        </h1>
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
            variant="outlined"
          />
        </v-sheet>
        <v-row id="queries" v-for="(field, i) in queries" :key="field.id">
          <v-col cols="6" class="pb-0 mb-0">
            <v-text-field
              v-model="field.query"
              class="mt-3"
              label="Query"
              variant="outlined"
            />
          </v-col>
          <v-col cols="6" class="pb-0 mb-0">
            <v-text-field
              v-model="field.param"
              class="mt-3"
              label="Param"
              variant="outlined"
            />
          </v-col>
          <v-sheet class="d-flex justify-space-between w-100 pa-0 ma-0 mt-n3">
            <v-btn
              color="warning"
              size="small"
              min-width="0"
              class="py-0"
              variant="text"
              @click="deleteQuery(field.id)"
            >
              <v-icon icon="mdi-trash-can-outline" size="large" end />
            </v-btn>
            <v-btn
              v-if="i === queries.length - 1"
              color="primary"
              max-width="200"
              class="py -0"
              size="small"
              variant="text"
              @click="addQuery"
            >
              Add Another Query
              <v-icon icon="mdi-plus" size="large" end />
            </v-btn>
          </v-sheet>
        </v-row>

        <v-btn
          class="mt-12"
          color="primary"
          max-width="200"
          size="large"
          variant="flat"
        >
          Generate
        </v-btn>
        <p class="mt-4 text-sec">
          {{ concatUrl }}
        </p>
      </v-col>

      <v-col cols="6">
        <v-img class="" src="@/assets/qr-page-img.svg" />
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped>
h1 {
  line-height: 3.5rem;
}

h4 {
  line-height: 2rem;
}

p {
  word-break: break-word;
  font-style: italic;
  position: absolute;
  max-width: 500px;
}

#queries .v-input__details {
  display: none;
}
</style>
