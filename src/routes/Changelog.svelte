<h2>Changelog</h2>
<div class="lexend-deca-body changelog">
	<p class="date">1.2.0 (01/13/25)</p>
	<ul>
		<li>Updated fonts (again).</li>
		<li>Changed color and logo to comply with Spotify Developer terms.</li>
	</ul>
	<p class="date">1.1.5 (01/09/25)</p>
	<ul>
		<li>Fixed height and width.</li>
		<li>Changed fonts.</li>
	</ul>
	<p class="date">1.1.4 (01/07/25)</p>
	<ul>
		<li>Fixed extra padding in image.</li>
		<li>Heavily improved website layout (image and controls are now side-by-side on desktop).</li>
		<li>Adjusted UPLB background.</li>
	</ul>
	<p class="date">1.1.3 (12/31/24)</p>
	<ul>
		<li>Happy new year!</li>
		<li>Adjusted padding.</li>
		<li>Changed from wordmark logo to icon only.</li>
		<li>Made small, unnoticeable changes to the background images.</li>
	</ul>
	<p class="date">1.1.2 (12/12/24)</p>
	<ul>
		<li>Added loading animation.</li>
		<li>Added brat summer.</li>
		<li>Bug fixes.</li>
	</ul>
	<p class="date">1.1.1 (12/11/24)</p>
	<ul>
		<li>Added 4 different styles!</li>
	</ul>
	<p class="date">1.1 (12/10/24)</p>
	<ul>
		<li>Renamed to Mirage and revamped almost everything. This is no longer an unnamed app.</li>
		<li>Rewritten from the ground up using SvelteKit!</li>
		<li>Now makes use of cookies for the access token instead of storing it in the URL.</li>
		<li>Better security.</li>
		<li>Bye glassmorphism :( You caused too many issues.</li>
	</ul>
	<p class="date">1.0 (03/2024–12/2024)</p>
	<ul>
		<li>The original version of this application, unnamed app, existed.</li>
		<li>
			Because it was buggy and had outdated code practices, I came to the decision to revamp the
			application.
		</li>
		<li>Here we go! :)</li>
	</ul>
	<p style="padding-top: 3em;">
		Made with 🤍 by <a href="https://christopermarlo.dev" style="text-decoration: underline;"
			>Chris</a
		>.
	</p>
</div>

<style>
	.changelog {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		justify-content: flex-start;
		align-items: center;
	}

	h2 {
		color: var(--persian-green);
		font-size: 1em;
		font-family: 'Lexend Deca', sans-serif;
		font-optical-sizing: auto;
		font-weight: bold;
		text-align: center;
	}

	.date {
		width: 100%;
	}

	ul {
		display: flex;
		text-align: left;
		flex-direction: column;
		justify-content: flex-start;
		align-items: flex-start;
		flex-wrap: wrap;
		width: 90%;
	}

	li {
		width: 100%;
		margin: 0;
		text-indent: 0;
	}
</style>
