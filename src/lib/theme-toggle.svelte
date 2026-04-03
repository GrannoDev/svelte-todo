<script lang="ts">
	import Moon from 'phosphor-svelte/lib/MoonIcon';
	import Sun from 'phosphor-svelte/lib/SunIcon';
	let theme = $state(localStorage.getItem('theme') || 'dark');

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		localStorage.setItem('theme', theme);
	}
	$effect(() => {
		document.documentElement.setAttribute('data-theme', theme);
	});
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
