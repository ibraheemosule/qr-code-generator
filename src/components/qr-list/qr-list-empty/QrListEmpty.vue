<script setup lang="ts">
import { QrListType } from "../../../ts-types/data-types";
import ActionBtn from "@/components/reusables/action-btn/ActionBtn.vue";

defineProps<{
  search: string;
  qrList: QrListType;
}>();
</script>

<template>
  <v-col v-if="!qrList.length && search" cols="12" class="text-center mt-12"
    ><h4 class="text-h5 text-capitalize w-100 text-sec">
      no match found
    </h4></v-col
  >
  <v-col v-if="!qrList.length && !search" cols="12" class="text-center mt-12"
    ><h4 class="text-h5 text-capitalize w-100 text-sec">
      No Qr Code Generated
    </h4>
    <RouterLink to="/create-qr" class="router-link mt-6 d-block">
      <ActionBtn text="Generate One" />
    </RouterLink>
  </v-col>
</template>
<style scoped>
.router-link {
  all: unset;
}
</style>
