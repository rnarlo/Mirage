<script lang="ts">
	import Logout from './Logout.svelte';
	import Login from './Login.svelte';
	import Changelog from './Changelog.svelte';
	import TracksContainer from './TracksContainer.svelte';
	export let data: {
		access_token: string | null;
		topList: { short_term: any[]; medium_term: any[]; long_term: any[] } | null;
	};
</script>

<section>
	{#if data.access_token}
		<div class="lexend-deca-body main">
			<h2 class="lexend-deca-header">Your Top Tracks</h2>
			<TracksContainer topList={data.topList} />
		</div>
		<Logout />
	{:else}
		<h1 class="lexend-deca-header">Mirage for Spotify</h1>

		<Login />
		<Changelog />
	{/if}
</section>

<style>
	h1 {
		color: var(--snow);
		text-align: center;
	}

	h2 {
		text-align: center;
	}

	section {
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 1em;
	}

	.main {
		display: flex;
		flex-direction: column;
		flex-wrap: wrap;
		align-items: center;
	}
</style>
