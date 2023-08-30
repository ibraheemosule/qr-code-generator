<script setup lang="ts">
defineProps<{ value: string }>();
</script>

<template>
  <h1 class="text-warning text-h3 font-weight-medium text-capitalize">
    {{ value }}
  </h1>
</template>

<style scoped>
h1 {
  line-height: 3.5rem;
}
</style>
