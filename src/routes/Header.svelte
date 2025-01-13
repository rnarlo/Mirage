<script lang="ts">
	import { page } from '$app/stores';
	import { onMount } from 'svelte';

	let isScrolled = false;
	let isMenuOpen = false;

	const handleScroll = () => {
		isScrolled = window.scrollY > 60;
	};

	const toggleMenu = () => {
		isMenuOpen = !isMenuOpen;
	};

	onMount(() => {
		window.addEventListener('scroll', handleScroll);

		return () => {
			window.removeEventListener('scroll', handleScroll);
			isScrolled = false;
		};
	});
</script>

<header class:isScrolled-bg={isScrolled} class:menu-opened={isMenuOpen} class="lexend-deca-body">
	<div class="header-content">
		<button
			class="hamburger"
			aria-label="Toggle hamburger menu"
			on:click={toggleMenu}
			aria-expanded={isMenuOpen}
		>
			<div class:open={isMenuOpen}></div>
			<div class:open={isMenuOpen}></div>
			<div class:open={isMenuOpen}></div>
		</button>
		<nav class:open={isMenuOpen}>
			<ul>
				<li class="underline">
					<a href="/" rel="noopener noreferrer">Home</a>
				</li>
				<li class="underline" aria-current={$page.url.pathname === '/about' ? 'page' : undefined}>
					<a href="/about" rel="noopener noreferrer">What is this?</a>
				</li>
				<li class="underline" aria-current={$page.url.pathname === '/privacy' ? 'page' : undefined}>
					<a href="/privacy" rel="noopener noreferrer">Privacy Policy</a>
				</li>
			</ul>
		</nav>
	</div>
</header>

<style>
	header {
		position: fixed;
		top: 0;
		display: flex;
		z-index: 1;
		justify-content: center;
		width: 100vw;
		transition: all 300ms ease;
	}

	.header-content {
		display: flex;
		justify-content: flex-end;
		align-items: center;
		max-width: 1100px;
		width: 90vw;
		padding: 1.3em 0;
	}

	.hamburger {
		display: none;
		flex-direction: column;
		justify-content: center;
		gap: 5px;
		border: none;
		background: none;
		cursor: pointer;
		width: auto;
		height: 30px;
		/* background-color: red; */
	}

	.hamburger div {
		width: 2em;
		height: 0.25em;
		background: var(--snow);
		border-radius: 26px;
		transition:
			transform 0.1s linear,
			opacity 0.1s linear;
	}

	.hamburger div.open:nth-child(1) {
		transform: translateY(8px) rotate(45deg);
	}

	.hamburger div.open:nth-child(2) {
		opacity: 0;
	}

	.hamburger div.open:nth-child(3) {
		transform: translateY(-8px) rotate(-45deg);
	}

	nav {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	ul {
		display: flex;
		gap: 2em;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	li {
		position: relative;
	}

	li[aria-current='page'] > a {
		color: var(--persian-green) !important;
	}

	li[aria-current='page']::after {
		content: '';
		display: block;
		height: 2px;
		background-color: var(--persian-green);
		position: relative;
		width: 100%;
	}

	nav a {
		text-decoration: none;
		transition: color 0.2s linear;
	}

	a:hover {
		color: var(--persian-green);
	}

	.isScrolled-bg {
		background-color: rgba(19, 21, 21, 0.7);
		backdrop-filter: blur(8px);
		box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
		transition: all 300ms linear;
	}

	.menu-opened {
		transition: all 0ms linear;
		background-color: #111111 !important;
		backdrop-filter: blur(0px);
	}

	@media (max-width: 768px) {
		.hamburger {
			display: flex;
		}

		nav {
			display: none;
			position: absolute;
			top: 100%;
			right: 0;
			background-color: #111111;
			padding: 1em 0;
			width: 100vw;
			text-align: center;
		}

		li[aria-current='page']::after {
			display: none;
		}

		nav.open {
			display: block;
		}

		ul {
			flex-direction: column;
			gap: 1.3em;
		}
	}
</style>
