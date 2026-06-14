<template>
  <navbar>
    <template #breadcrambs>
      <button class="nav-back" @click="$router.push('/')">← My Decks</button>
      <span class="nav-sep">/</span>
      <span class="nav-crumb">{{ deck?.data?.name }}</span>
    </template>

    <template #actions>
      <button class="btn-secondary btn-sm">+ Add Card</button>
      <button class="btn-primary btn-sm">🎴 Draw a Card</button>
    </template>
  </navbar>

  <div class="deck-hero" :style="getDeckStyles(deck?.data?.colorIndex)">
    <span class="hero-emoji">{{ deck?.data?.emoji }}</span>
    <div class="hero-info">
      <h1 class="hero-name">{{ deck?.data?.name }}</h1>
      <p class="hero-meta">
        <span v-if="deck?.data?.description">{{ deck?.data?.description }} · </span>
        {{ (deck?.data?.cards ?? []).length }} card{{ (deck?.data?.cards ?? []).length === 1 ? '' : 's' }}
      </p>
    </div>
  </div>

  <main class="page-content">
    <h2 class="section-title">Cards in this deck</h2>

    <div class="card-grid">
      <div
        class="card-tile"
        v-for="(card, index) in deck?.data?.cards || []"
        :key="card.id"
      >
        <div class="card-image" :style="getCardAccent(index) + '18'">
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
</template>

<script setup lang="ts">
  // @@@ @js@
  import { ref, computed, watchEffect } from 'vue';
  import { useRoute }                   from 'vue-router'
  import Navbar                         from '@/components/navbar.vue'
  import api, { isLoading }             from '@/api'
  import type { Deck, Response }        from '@/types'
  import {
    getDeckGradientStyle,
    getDeckShadowStyle,
    getCardAccentColor,
  } from '@/utils/deck'

  const $route  = useRoute()
  const deck    = ref<Response<Deck>>()
  const baseUrl = import.meta.env.VITE_BASE_URL

  /***
  **** @@@ Computed
  ***/
  const deckId = computed(() => Number($route?.params?.id))

  /***
  **** @@@ Hooks
  ***/
  watchEffect(async () => {
    if (deckId?.value) {
      deck.value = await api.getDeckById(deckId.value)
    }
    console.log('res', deck.value)
  })

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
  function getCardAccent(index: number): string {
    return getCardAccentColor(index);
  }
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
</style>
