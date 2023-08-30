<script setup lang="ts">
defineProps<{
  showAction: boolean;
  showDelete: boolean;
  text: string;
}>();

const emit = defineEmits(["deleteFn", "actionFn"]);

const handleDelete = () => {
  emit("deleteFn");
};

const handleAction = () => emit("actionFn");
</script>

<template>
  <v-sheet class="d-flex justify-space-between w-100 pa-0 ma-0 bg-transparent">
    <v-btn
      v-if="showDelete"
      color="warning"
      size="small"
      min-width="0"
      class="pa-0"
      variant="text"
      @click="handleDelete"
    >
      <v-icon icon="mdi-trash-can-outline" size="large" end />
    </v-btn>
    <v-btn
      v-if="showAction"
      color="primary"
      max-width="200"
      class="py-0 ml-auto"
      size="small"
      variant="text"
      @click="handleAction"
    >
      {{ text }}
    </v-btn>
  </v-sheet>
</template>
