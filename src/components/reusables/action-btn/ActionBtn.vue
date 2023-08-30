<script setup lang="ts">
defineProps<{
  text: string;
}>();

const emit = defineEmits(["actionFn"]);

function handleAction() {
  emit("actionFn");
}
</script>

<template>
  <v-btn
    @click="handleAction"
    class="mt-6"
    color="primary"
    max-width="200"
    size="large"
    variant="flat"
  >
    {{ text }}
    <slot />
  </v-btn>
</template>
