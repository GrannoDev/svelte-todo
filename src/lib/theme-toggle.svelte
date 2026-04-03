<script lang="ts">
	import Moon from 'phosphor-svelte/lib/MoonIcon';
	import Sun from 'phosphor-svelte/lib/SunIcon';
	import { onMount } from 'svelte';

	let theme = $state(localStorage.getItem('theme') || 'dark');

	onMount(() => {
		document.documentElement.setAttribute('data-theme', theme);
	});
	function applyTheme(nextTheme: string) {
		theme = nextTheme;
		localStorage.setItem('theme', nextTheme);
		document.documentElement.setAttribute('data-theme', nextTheme);
	}

	function toggleTheme() {
		const nextTheme = theme === 'dark' ? 'light' : 'dark';

		if (!document.startViewTransition) {
			applyTheme(nextTheme);
			return;
		}

		document.startViewTransition(() => {
			applyTheme(nextTheme);
		});
	}
</script>

<button
	type="button"
	class="grid size-7 place-items-center text-neutral-700 dark:text-neutral-200"
	aria-label="Toggle theme"
	onclick={toggleTheme}
>
	{#if theme === 'dark'}
		<Sun class="size-5" />
	{:else}
		<Moon class="size-5" />
	{/if}
</button>
