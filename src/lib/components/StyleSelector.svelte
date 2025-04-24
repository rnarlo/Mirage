<script lang="ts">
	export let selectedStyle: 'yellow2024' | 'red2023' | 'bratsummer' | 'upd' | 'uplb';

	function changeStyle(newStyle: 'yellow2024' | 'red2023' | 'bratsummer' | 'upd' | 'uplb') {
		selectedStyle = newStyle;
		dispatch('styleChange', { style: newStyle });
	}

	import { createEventDispatcher } from 'svelte';
	const dispatch = createEventDispatcher();
</script>

<div class="controls-section">
	<h2>Style</h2>
	<div class="radio-selector">
		<label class="radio-input">
			<input
				type="radio"
				bind:group={selectedStyle}
				name="background"
				value="yellow2024"
				on:change={() => changeStyle('yellow2024')}
			/>
			<span class="radio-label">2024 Yellow</span>
		</label>

		<label class="radio-input">
			<input
				type="radio"
				bind:group={selectedStyle}
				name="background"
				value="red2023"
				on:change={() => changeStyle('red2023')}
			/>
			<span class="radio-label">2023 Red</span>
		</label>

		<label class="radio-input">
			<input
				type="radio"
				bind:group={selectedStyle}
				name="background"
				value="bratsummer"
				on:change={() => changeStyle('bratsummer')}
			/>
			<span class="radio-label">brat summer</span>
		</label>

		<label class="radio-input">
			<input
				type="radio"
				bind:group={selectedStyle}
				name="background"
				value="upd"
				on:change={() => changeStyle('upd')}
			/>
			<span class="radio-label">UP Diliman</span>
		</label>

		<label class="radio-input">
			<input
				type="radio"
				bind:group={selectedStyle}
				name="background"
				value="uplb"
				on:change={() => changeStyle('uplb')}
			/>
			<span class="radio-label">UP Los Baños</span>
		</label>
	</div>
</div>

<style>
	h2 {
		color: var(--persian-green);
		font-size: 1em;
		font-family: 'Lexend Deca', sans-serif;
		font-optical-sizing: auto;
		font-weight: bold;
		text-align: center;
		margin: 0 0 1em 0;
	}

	.controls-section {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		width: 100%;
	}

	input[type='radio'] {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
	}

	.radio-selector {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
	}

	.radio-input .radio-label {
		display: inline-block;
		padding: 8px 8px;
		margin: 5px;
		background: var(--night);
		font-size: 15px;
		color: var(--snow);
		text-align: center;
		min-width: 100px;
		border: 3px solid transparent;
		border-radius: 26px;
		cursor: pointer;
		box-sizing: border-box;
		backdrop-filter: blur(10px);
		-webkit-backdrop-filter: blur(10px);
		padding: 0.5em 1em 0.5em 1em;
	}

	input[type='radio']:checked + .radio-label {
		background: var(--snow);
		color: var(--night);
		border: 3px solid var(--persian-green);
	}
</style>
