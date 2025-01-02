<script lang="ts">
	import '../app.css';
	import Header from './Header.svelte';

	let { children } = $props();
</script>

<div class="app">
	<main>
		<Header />
		{@render children()}
	</main>

	<footer>
		<p class="lexend-deca-body">© 2024 Mirage for Spotify. All rights reserved.</p>
	</footer>
</div>

<style>
	.app {
		display: grid;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		min-height: 100vh;
	}

	main {
		flex: 100%;
		display: flex;
		align-items: center;
		flex-direction: column;
		min-height: 90vh;
		width: 1000px;
		max-width: 90vw;
		margin: 0;
		padding-top: 6em;
	}

	footer {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		padding-top: 3em;
		height: 4em;
	}

	footer p {
		font-size: 0.6em;
	}

	@media (min-width: 480px) {
		footer {
			padding: 12px 0;
		}
	}
</style>
