<script lang="ts" context="module">
	const logout = async () => {
		const response = await fetch('/logout', {
			method: 'POST'
		});

		if (response.ok) {
			window.location.reload();
		} else {
			console.error('Failed to log out');
		}
	};
</script>

<div class="lexend-deca-body">
	<button on:click={logout} class="lexend-deca-body">Log Out</button>
</div>

<style>
	div {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		row-gap: 1em;
		padding: 1em;
	}

	button {
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1em;
		width: 15em;
		height: 3em;
		background: var(--persian-green);
		border-radius: 1.875rem;
		border: none;
		color: var(--night);
		cursor: pointer;
	}
</style>
