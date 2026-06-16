<template>
  <Request :endpoint="() => api.getDeckById(deckId)" v-slot="{ data: deck, error }">
    <navbar>
      <template #breadcrambs>
        <button class="nav-back" @click="$router.push('/')">← My Decks</button>
        <span class="nav-sep">/</span>
        <span class="nav-crumb">{{ deck?.name }}</span>
      </template>

      <template #actions>
        <button class="btn-secondary btn-sm">+ Add Card</button>
        <button class="btn-primary btn-sm">🎴 Draw a Card</button>
      </template>
    </navbar>

    <div v-if="!error" class="deck-hero" :style="getDeckStyles(deck?.colorIndex)">
      <span class="hero-emoji">{{ deck?.emoji }}</span>
      <div class="hero-info">
        <h1 class="hero-name">{{ deck?.name }}</h1>
        <p class="hero-meta">
          <span v-if="deck?.data?.description">{{ deck?.description }} · </span>
          {{ (deck?.cards ?? []).length }} card{{ (deck?.cards ?? []).length === 1 ? '' : 's' }}
        </p>
      </div>
    </div>

    <main v-if="!error" class="page-content">
      <h2 class="section-title">Cards in this deck</h2>

      <div class="card-grid">
        <div
          class="card-tile"
          v-for="(card, index) in deck?.cards || []"
          :key="card.id"
        >
          <div class="card-image" :style="getCardAccent(index as number)">
            <img v-if="card?.imageUrl" :src="`${baseUrl}/${card?.imageUrl}`" :alt="card?.title" />
            <span v-else class="card-placeholder">🃏</span>
          </div>
          <div class="card-body">
            <p class="card-title">{{ card.title }}</p>
            <button class="card-delete" (click)="deleteCard(card.id)" title="Remove card">✕</button>
          </div>
        </div>

        <div class="card-tile card-tile--add" (click)="addCard()">
          <div class="card-image card-image--add">+</div>
        </div>
      </div>
    </main>
  </Request>
</template>

<script setup lang="ts">
  // @@@ @js@
  import { computed } from 'vue';
  import { useRoute } from 'vue-router'
  import Navbar       from '@/components/navbar.vue'
  import Request      from '@/components/request.vue'
  import api          from '@/api'
  import {
    getDeckGradientStyle,
    getCardAccentColor,
  } from '@/utils/deck'

  const baseUrl = import.meta.env.VITE_BASE_URL
  const $route  = useRoute()

  /***
  **** @@@ Computed
  ***/
  const deckId = computed(() => Number($route?.params?.id))

  /***
  **** @@@ Methods
  ***/
  // =============================================================================
  // @@@ [ M ] deleteDeck
  // =============================================================================
  function deleteDeck(deckId: number) {
    console.log('deleteDeck', deckId)
  }

  // =============================================================================
  // @@@ [ M ] getDeckStyles
  // =============================================================================
  function getDeckStyles(colorIndex: number | undefined) {
    return {
      background: colorIndex != undefined ? getDeckGradientStyle(colorIndex) : '#fff',
    }
  }

  // =============================================================================
  // @@@ [ M ] getCardAccent
  // =============================================================================
  function getCardAccent(index: number): string {
    return getCardAccentColor(index);
  }
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
</style>
