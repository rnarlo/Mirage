<script lang="ts">
	import SpotifyIcon from '$lib/images/icon-black.png';
	import SpotifyIconWhite from '$lib/images/icon-white.png';
	import YellowBg from '$lib/images/backgrounds/yellow-bg.png';
	import RedBg from '$lib/images/backgrounds/red-bg.png';
	import UpLosBanos from '$lib/images/backgrounds/uplb.jpg';
	import UpDiliman from '$lib/images/backgrounds/upd.png';
	import BratSummer from '$lib/images/backgrounds/brat-summer.png';
	import saveAs from 'file-saver';
	import html2canvas from 'html2canvas';
	import { onMount } from 'svelte';

	export let topList: { short_term: SpotifyTrack[]; medium_term: SpotifyTrack[]; long_term: SpotifyTrack[] } | null;
	export let selectedTerm: 'short_term' | 'medium_term' | 'long_term';
	export let selectedStyle: 'yellow2024' | 'red2023' | 'bratsummer' | 'upd' | 'uplb';

	interface SpotifyTrack {
		id: string;
		name: string;
		album: {
			name: string;
			images: Array<{ url: string }>;
		};
		artists: Array<{ name: string }>;
	}

	const termLabels = {
		short_term: 'Last Month',
		medium_term: 'Last Six Months',
		long_term: 'Last Year'
	};

	const styleBackground = {
		yellow2024: YellowBg,
		red2023: RedBg,
		bratsummer: BratSummer,
		upd: UpDiliman,
		uplb: UpLosBanos
	};

	let backgroundLoaded: boolean = false;

	function generateRandomCode(length: number): string {
		let text = '';
		const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

		for (let i = 0; i < length; i++) {
			text += possible.charAt(Math.floor(Math.random() * possible.length));
		}
		return text;
	}

	export async function downloadImage() {
		const imageContainer = document.getElementById('inner-tracks-container');
		if (!imageContainer) {
			alert('Could not find the image container!');
			return;
		}

		try {
			const canvas = await html2canvas(imageContainer, { scale: 5, useCORS: true });
			const dataURL = canvas.toDataURL('image/jpeg', 5.0);

			if (navigator.onLine) {
				const selectedRadio = document.querySelector('input[name="background"]:checked') as HTMLInputElement;
				if (selectedRadio) {
					saveAs(
						dataURL,
						`mirage-${selectedRadio.value}-${generateRandomCode(5)}.jpg`
					);
				} else {
					saveAs(dataURL, `mirage-${selectedStyle}-${generateRandomCode(5)}.jpg`);
				}
			} else {
				alert('You are offline!');
			}
		} catch (error) {
			console.error('Error creating image:', error);
			alert('Failed to download the image. Please try again.');
		}
	}

	onMount(() => {
		const img = document.querySelector('.background') as HTMLImageElement;
		if (img && img.complete) {
			backgroundLoaded = true;
		}

		const albumCovers = document.querySelectorAll('.album-cover');
		albumCovers.forEach((cover) => {
			cover.addEventListener('contextmenu', (event) => event.preventDefault());
		});
	});
</script>

<div class="tracks-container" id="tracks-container" data-selected-style={selectedStyle}>
	<div class="inner-tracks-container" id="inner-tracks-container">
		<img
			src={styleBackground[selectedStyle]}
			alt="This is the background you have selected"
			class="background"
			class:background-loaded={backgroundLoaded}
			on:load={() => (backgroundLoaded = true)}
		/>
		<div class="background-loading {backgroundLoaded ? 'hidden' : ''}"></div>
		<div class="information-container {backgroundLoaded ? 'shown' : 'hidden'}">
			<div class="title-container">
				<h1 class="circular-black">My Top Songs</h1>
				<p class="track-artist dm-sans-body">
					{termLabels[selectedTerm]}
				</p>
			</div>
			{#if topList}
				<ol>
					{#each topList[selectedTerm].slice(0, 5) as track (track.id)}
						<li>
							<div class="track">
								<img
									src={track.album.images[0]?.url}
									alt={track.album.name}
									class="album-cover"
								/>

								<a href="https://open.spotify.com/track/{track.id}" class="track-info">
									<div class="inner-track-info">
										<p class="track-name circular-black">{track.name}</p>
										<p class="track-artist dm-sans-body">
											{track.artists.map((artist) => artist.name).join(', ')}
										</p>
									</div>
								</a>
							</div>
						</li>
					{/each}
				</ol>
			{:else}
				<p style="color: var(--night);">Loading~</p>
			{/if}
			<div class="branding">
				<a href="https://www.spotify.com" target="_blank" rel="noopener noreferrer"
					><img
						src={selectedStyle == 'yellow2024' ||
					selectedStyle == 'red2023' ||
					selectedStyle == 'bratsummer'
						? SpotifyIcon
						: SpotifyIconWhite}
						alt="The Spotify icon"
						crossorigin="anonymous"
					/>
				</a>
				<h1 class="circular-black">M4S.VERCEL.APP</h1>
			</div>
		</div>
	</div>
</div>

<style>
	.tracks-container {
		position: static;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		flex: 1;
		width: 325px;
		aspect-ratio: 1080/1920;
	}

	.inner-tracks-container {
		position: relative;
		display: flex;
		justify-content: flex-end;
		flex-direction: column;
		width: 100%;
		height: 100%;
		color: var(--night);
		margin: 0;
	}

	.information-container {
		padding: 0.2rem 1.3rem;
	}

	.background {
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		position: absolute;
		z-index: -1;
		display: none;
		opacity: 0;
		transition: opacity 0.5s ease;
		width: 325px;
		aspect-ratio: 1080/1921;
		overflow: hidden;
	}

	.branding,
	.title-container {
		position: relative;
	}

	.branding {
		bottom: 0;
	}

	.branding {
		display: flex;
		flex-direction: row;
		width: 100%;
		padding: 0 0 3px 0;
		justify-content: space-between;
		align-items: center;
	}

	.branding * {
		margin: 0;
	}

	.branding a {
		margin-top: 0em;
	}

	.branding img {
		padding: 0;
		width: 33px;
		scale: 1;
	}

	.title-container {
		display: flex;
		flex-direction: column;
		justify-content: center;
		gap: 0.2em;
	}

	.title-container * {
		margin: 0;
	}

	.branding h1 {
		font-size: 0.9em;
	}

	h1 {
		color: var(--night);
		font-size: 0.86em !important;
		margin: 0.5em;
		font-weight: 500 !important;
	}

	.track-name {
		font-weight: 500 !important;
		line-height: 120%;
	}

	.track-artist {
		font-weight: 400 !important;
	}

	p {
		font-size: 0.65em !important;
	}

	ol {
		position: relative;
		display: flex;
		flex-direction: column;
		height: auto;
		list-style-type: none;
		counter-reset: list-counter;
		padding: 0;
		margin: 1.5em 0em 1.25em 0em;
		row-gap: 0.5em;
	}

	ol li {
		display: flex;
		flex-direction: row;
		align-items: center;
		counter-increment: list-counter;
		color: var(--night);
		height: 3.9rem;
		gap: 0.8em;
		width: 100%;
	}

	ol li * {
		color: var(--night);
		padding-left: 0;
	}

	ol li::before {
		font-family: 'Radio Canada Big', 'Lexend Deca', sans-serif;
		font-weight: 700;
		width: 1.25rem;
		font-size: 1.9em;
		content: counter(list-counter);
		color: var(--night);
		text-align: center;
	}

	/* The number 4 in this font looks more similar to Wrapped */
	ol li:nth-child(4)::before {
		font-family: 'Fira Sans', sans-serif !important;
	}

	.track {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: row;
		gap: 0.5rem;
	}

	.album-cover {
		position: relative;
		height: 100%;
		padding: 0;
		margin: 0;
		border-radius: 2px;
		-webkit-user-select: none !important;
		-webkit-user-drag: none;
		-webkit-app-region: no-drag;
		-ms-user-select: none;
		-webkit-touch-callout: none !important;
		user-select: none;
	}

	.track-info {
		display: flex;
		width: 100%;
		height: 100%;
	}

	.inner-track-info {
		display: flex;
		flex-direction: column;
		justify-content: center;
		width: 100%;
		gap: 0.2rem;
	}

	.inner-track-info p {
		margin: 0;
		padding: 0;
		width: 100%;
	}

	/* THIS SECTION IS FOR DYNAMIC STYLING BASED ON SELECTED STYLE */

	.tracks-container[data-selected-style='yellow2024'] {
		--text-color: var(--night);
	}

	.tracks-container[data-selected-style='red2023'] {
		--text-color: var(--night);
	}

	.tracks-container[data-selected-style='upd'] {
		--text-color: var(--snow-style);
	}

	.tracks-container[data-selected-style='uplb'] {
		--text-color: var(--snow-style);
	}

	.tracks-container h1,
	.tracks-container p,
	.tracks-container .track-info p {
		color: var(--text-color);
	}

	.tracks-container ol li::before {
		color: var(--text-color);
	}

	.background-loaded {
		display: block;
		opacity: 1;
	}

	.background-loading {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background: linear-gradient(90deg, #111111 25%, #222222 50%, #111111 75%);
		background-size: 200% 100%;
		animation: shimmer 1.5s infinite;
	}

	@keyframes shimmer {
		0% {
			background-position: -200% 0;
		}
		100% {
			background-position: 200% 0;
		}
	}

	.shown {
		display: block;
	}

	.hidden {
		display: none;
	}
</style>