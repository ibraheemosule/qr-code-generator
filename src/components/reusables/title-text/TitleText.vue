<script setup lang="ts">
defineProps<{ value: string }>();
</script>

<template>
  <h1
    class="text-warning text-h4 text-sm-h3 font-weight-medium text-capitalize"
  >
    {{ value }}
  </h1>
</template>

<style scoped>
h1 {
  line-height: 2.5rem;
}

@media (min-width: 600px) {
  h4 {
    line-height: 3.5rem;
  }
}
</style>
