<template>
  <navbar>
    FortuneCards 🎴
    <template #actions>
      <button class="btn-primary">+ New Deck</button>
    </template>
  </navbar>
  <main class="page-content">
    <Request :endpoint="() => api.getDeckList<Deck[] | undefined>()" v-slot="{ data: decks, error }">
      <div v-if="!error" class="list-header">
        <h1 class="list-title">My Decks ✨</h1>
        <p class="list-subtitle"> {{ decks?.length }} deck{{ decks?.length === 1 ? '' : 's'  }}</p>
      </div>

      <div class="deck-grid">
        <div
          class="deck-tile"
          v-for="deck in decks"
          :key="deck.id"
          :style="getDeckStyles(deck.colorIndex)"
          @click="$router.push({name: 'deck', params: {id: deck.id}})"
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

        <div v-if="!error" class="deck-tile deck-tile--add">
          <span class="deck-add-icon">+</span>
          <span class="deck-add-label">New Deck</span>
        </div>
      </div>
    </Request>
  </main>
</template>

<script setup lang="ts">
  // @@@ @js@
  import Navbar        from '@/components/navbar.vue'
  import Request       from '@/components/request.vue'
  import api           from '@/api'
  import type { Deck } from '@/types'
  import {
    getDeckGradientStyle,
    getDeckShadowStyle,
  } from '@/utils/deck'

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
