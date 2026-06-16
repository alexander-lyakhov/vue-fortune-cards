<template>
  <div v-if="isLoading" class="state-loading">Loading decks…</div>
  <slot v-else v-bind="{ ...response, isLoading }" key="response-data"></slot>
  <div v-if="response?.error" class="state-error">{{ response?.error }}</div>
</template>

<script setup lang="ts" generic="T">
  // @@@ @js@
  import { ref, onMounted } from 'vue';
  import { isLoading }      from '@/api'

  const props = defineProps<{
    endpoint: () => Promise<T>
  }>();

  const response = ref<T | undefined>(undefined)
  onMounted(async () => {
    response.value = await props.endpoint()
    console.log('endpoint response', response.value)
  })
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
</style>
