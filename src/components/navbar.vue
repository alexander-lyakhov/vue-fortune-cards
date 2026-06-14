<template>
  <nav class="nav-bar">
    <div class="nav-actions">
      <slot name="breadcrambs"></slot>
    </div>
    <span class="nav-title-centered">
      <slot></slot>
    </span>
    <div class="actions">
      <slot name="actions">
      </slot>
      <a class="theme-toggle" v-if="isDarkMode" href="#" @click.prevent="setLightTheme">&#127774;</a>
      <a class="theme-toggle" v-else href="#" @click.prevent="setDarkTheme">&#127769;</a>
    </div>
  </nav>
</template>

<script setup lang="ts">
  // @@@ @js@
  import { ref, onMounted } from 'vue';

  const isDarkMode = ref<boolean>(false)

  /***
  **** @@@ Hooks
  ***/
  onMounted(() => {
    isDarkMode.value = document.documentElement.hasAttribute("theme")
  })

  /***
  **** @@@ Computed
  ***/

  /***
  **** @@@ Methods
  ***/
  // =============================================================================
  // @@@ [ M ] setDarkTheme
  // =============================================================================
  function setDarkTheme() {
    isDarkMode.value = true
    document.documentElement.setAttribute("theme", "dark")
  }

  // =============================================================================
  // @@@ [ M ] setLightTheme
  // =============================================================================
  function setLightTheme() {
    isDarkMode.value = false
    document.documentElement.removeAttribute("theme")
  }
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
.theme-toggle {
  margin-left: 12px;
}
.actions {
  display: flex;
  align-items: center;
  gap: 8px;
}
</style>
