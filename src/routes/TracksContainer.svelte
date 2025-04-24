<script lang="ts">
	import Logout from './Logout.svelte';
	import TrackPreview from '$lib/components/TrackPreview.svelte';
	import TimeRangeSelector from '$lib/components/TimeRangeSelector.svelte';
	import StyleSelector from '$lib/components/StyleSelector.svelte';

	export let topList: {
		short_term: SpotifyTrack[];
		medium_term: SpotifyTrack[];
		long_term: SpotifyTrack[];
	} | null;

	interface SpotifyTrack {
		id: string;
		name: string;
		album: {
			name: string;
			images: Array<{ url: string }>;
		};
		artists: Array<{ name: string }>;
	}

	let selectedTerm: 'short_term' | 'medium_term' | 'long_term' = 'short_term';
	let selectedStyle: 'yellow2024' | 'red2023' | 'bratsummer' | 'upd' | 'uplb' = 'yellow2024';
	let trackPreviewComponent: TrackPreview;

	function handleStyleChange() {}
</script>

<section>
	<div class="inner-container">
		<h2 class="lexend-deca-header">Your Top Tracks</h2>
		<TrackPreview
			bind:this={trackPreviewComponent}
			{topList}
			bind:selectedTerm
			bind:selectedStyle
		/>
		<button on:click={() => trackPreviewComponent?.downloadImage()} class="lexend-deca-body">
			Download Image
		</button>
	</div>
	<div class="controls">
		<TimeRangeSelector bind:selectedTerm />
		<StyleSelector bind:selectedStyle on:styleChange={handleStyleChange} />
		<Logout />
	</div>
</section>

<style>
	section {
		display: flex;
		flex-direction: row;
		flex-wrap: wrap;
		justify-content: center;
		column-gap: 2rem;
		row-gap: 3rem;
	}

	.inner-container {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 3em;
	}

	.inner-container h2 {
		text-align: center;
		margin: 0;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em;
		width: 15rem;
		height: 3rem;
		background: var(--persian-green);
		border-radius: 1.875rem;
		border: none;
		color: var(--night);
		cursor: pointer;
	}

	.controls {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		gap: 2em;
		width: 400px;
		max-width: 90vw;
	}
</style>
