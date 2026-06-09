<template>
  <navbar>
    <template #actions>
      <button class="btn-primary">+ New Deck</button>
    </template>
  </navbar>
  <main class="page-content">
    <div class="list-header">
      <h1 class="l1ist-title">My Decks ✨</h1>
      <p class="list-subtitle" v-if="!isLoading"> {{ decks?.data?.length }} deck{{ decks?.data?.length === 1 ? '' : 's'  }}</p>
    </div>

    <div v-if="isLoading" class="state-loading">Loading decks…</div>
    <div v-if="decks?.error" class="state-error">{{ decks?.error }}</div>

    <div class="deck-grid">
      <div
        class="deck-tile"
        v-for="deck in decks?.data"
        :key="deck.id"
        :style="getDeckStyles(deck.colorIndex)"
      >
        <span class="deck-emoji">{{ deck.emoji }}</span>
        <span class="deck-name">{{ deck.name }}</span>
        <span class="deck-count">{{ deck.cardCount }} {{ deck.cardCount === 1 ? 'card' : 'cards' }}</span>
        <button
          class="deck-delete"
          title="Delete deck"
          @click="deleteDeck(deck.id)"
        >✕</button>
      </div>

      <div class="deck-tile deck-tile--add">
        <span class="deck-add-icon">+</span>
        <span class="deck-add-label">New Deck</span>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
  // @@@ @js@
  import { ref, onMounted }      from 'vue';
  import Navbar                  from '@/components/nav-bar.vue'
  import api, { isLoading }      from '@/api'
  import type { Deck, Response } from '@/types'
  import {
    getDeckGradientStyle,
    getDeckShadowStyle,
  } from '@/utils/deck'

  const decks = ref<Response<Deck[]>>()

  /***
  **** @@@ Hooks
  ***/
  onMounted(async () => {
    decks.value = await api.getDecks()
    console.log('res', decks.value)
  })

  /***
  **** @@@ Computed
  ***/

  /***
  **** @@@ Methods
  ***/
  // =============================================================================
  // @@@ [ M ] deleteDeck
  // =============================================================================
  function deleteDeck(id: number) {
    console.log('deleteDeck', id)
  }

  // =============================================================================
  // @@@ [ M ] getDeckStyles
  // =============================================================================
  function getDeckStyles(colorIndex: number) {
    return {
      background: getDeckGradientStyle(colorIndex),
      'box-shadow': getDeckShadowStyle(colorIndex)
    }
  }
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
</style>
