<script lang="ts">
	export let selectedTerm: 'short_term' | 'medium_term' | 'long_term';
</script>

<div class="controls-section">
	<h2>Time Range</h2>
	<div class="radio-selector">
		<label class="radio-input">
			<input type="radio" bind:group={selectedTerm} value="short_term" />
			<span class="radio-label">Last Month</span>
		</label>

		<label class="radio-input">
			<input type="radio" bind:group={selectedTerm} value="medium_term" />
			<span class="radio-label">Last Six Months</span>
		</label>

		<label class="radio-input">
			<input type="radio" bind:group={selectedTerm} value="long_term" />
			<span class="radio-label">Last Year</span>
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