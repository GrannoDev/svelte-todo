<script lang="ts">
	import './layout.css';
	import favicon16 from '$lib/assets/favicon-16x16.png';
	import favicon32 from '$lib/assets/favicon-32x32.png';
	import faviconIco from '$lib/assets/favicon.ico';
	import { resolve } from '$app/paths';
	import { setToastStore } from '$lib/toast/toast-store.svelte';
	import Toaster from '$lib/toast/toaster.svelte';
	import { setTodoStore } from '$lib/todo/todo-store.svelte';
	import { onDestroy } from 'svelte';
	import ThemeToggle from '$lib/theme-toggle.svelte';

	let { children } = $props();

	const toastStore = setToastStore();
	setTodoStore();
	onDestroy(() => {
		toastStore.destroy();
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon16} />
	<link rel="icon" href={favicon32} />
	<link rel="shortcut icon" href={faviconIco} />
</svelte:head>

<header class="mx-auto flex h-20 max-w-5xl items-center justify-between px-8">
	<a href={resolve('/')} class="text-3xl font-bold text-neutral-700 dark:text-neutral-200"
		>Svelte Todo</a
	>
	<ThemeToggle />
</header>
<main class="mx-auto max-w-5xl p-8">
	{@render children()}
	<Toaster />
</main>
