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
	<title>Svelte Todo</title>
</svelte:head>

<header class="mx-auto flex h-20 max-w-5xl items-center justify-between px-6 sm:px-8">
	<a href={resolve('/')} class="text-3xl font-bold text-neutral-700 dark:text-neutral-200"
		>Svelte Todo</a
	>
	<ThemeToggle />
</header>
<main class="mx-auto min-h-[calc(100vh-80px-48px)] max-w-5xl p-6 pb-14 sm:p-8">
	{@render children()}
	<Toaster />
</main>

<footer class="h-12">
	<div class="mx-auto max-w-5xl px-6 py-4 text-center text-sm text-neutral-500 sm:px-8">
		<p>
			Made by
			<a
				href="https://magnusgranno.com/"
				target="_blank"
				rel="noopener noreferrer"
				class="text-neutral-800 hover:underline dark:text-neutral-200"
			>
				Magnus Granno
			</a>
		</p>
	</div>
</footer>
