<script setup lang="ts">
defineProps<{
  text: string;
  size?: string;
  color?: string;
}>();

const emit = defineEmits(["actionFn"]);

function handleAction() {
  emit("actionFn");
}
</script>

<template>
  <v-btn
    @click="handleAction"
    type="submit"
    :color="color ?? 'primary'"
    max-width="200"
    :size="size || 'large'"
    variant="flat"
  >
    {{ text }}
    <slot />
  </v-btn>
</template>
