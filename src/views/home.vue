<template>
	<nav class="nav-bar">
		<span class="nav-title">🎴 FortuneCards</span>
	    <div class="actions">
			<button class="btn-primary">+ New Deck</button>
			<a class="theme-toggle" v-if="isDarkMode" href="#" @click.prevent="setLightTheme">&#127774;</a>
			<a class="theme-toggle" v-else href="#" @click.prevent="setDarkTheme">&#127769;</a>
		</div>
	</nav>

	<main class="page-content">
		<div class="list-header">
			<h1 class="list-title">My Decks ✨</h1>
			<p class="list-subtitle"> {{ decks?.length }} decks </p>
		</div>

		<div class="deck-grid">
			<div
				class="deck-tile"
				v-for="deck in decks"
				:key="deck.id"
				:style="getDeckStyles(deck.colorIndex)"
			>
				<span class="deck-emoji">{{ deck.emoji }}</span>
				<span class="deck-name">{{ deck.name }}</span>
				<span class="deck-count">{{ deck.cardCount }} card{{ deck.cardCount === 1 ? '' : 's' }}</span>
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
	import { ref, onMounted } from 'vue';
	import api                from '@/api'
	import type { Deck }      from '@/types'
	import {
		getDeckGradientStyle,
		getDeckShadowStyle,
	} from '@/utils/deck'

	// @@@ data definition
	//--------------------------------------------------------------------------
	const decks      = ref<Deck[] | undefined>()
	const isDarkMode = ref<boolean>(false)
	//--------------------------------------------------------------------------
	// end of data definition

	/***
	**** @@@ Hooks
	***/
	onMounted(async () => {
		console.log('onMounted')
		isDarkMode.value = document.documentElement.hasAttribute("theme")

		try {
			const { data } = await api.getDecks()
			console.log('data', data)
			decks.value = data
		}
		catch(err)
		{
			console.log('-- Error --', err)
		}
		/*const data = fetch('https://fortunecards-b2gmfjgkg4dteag4.westeurope-01.azurewebsites.net/api/dec')
			.then(res => res.json())
			.then(res => res)
		console.log('decks', data)*/
	})

	/***
	**** @@@ Computed
	***/

	/***
	**** @@@ Methods
	***/
	function setDarkTheme() {
		isDarkMode.value = true
		document.documentElement.setAttribute("theme", "dark")
	}

	function setLightTheme() {
		isDarkMode.value = false
		document.documentElement.removeAttribute("theme")
	}

	function deleteDeck(id: number) {
		console.log('deleteDeck', id)
	}

  function getDeckStyles(colorIndex: number) {
		return {
			background: getDeckGradientStyle(colorIndex),
			'box-shadow': getDeckShadowStyle(colorIndex)
		}
	}
</script>

<style lang="scss" scoped>
/* @@@ @SCSS@ */
.theme-toggle {
	margin-left: 12px;
}
</style>
