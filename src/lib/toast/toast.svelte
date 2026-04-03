<script lang="ts">
	import type { Toast } from './toast-store.svelte.ts';

	import WarningCircle from 'phosphor-svelte/lib/WarningCircleIcon';
	import CheckCircle from 'phosphor-svelte/lib/CheckCircleIcon';
	import InfoCircle from 'phosphor-svelte/lib/InfoIcon';
	import { getToastStore } from '$lib/toast/toast-store.svelte';
	import { fly } from 'svelte/transition';

	let { toast }: { toast: Toast } = $props();
	const toastStore = getToastStore();
</script>

<button
	type="button"
	in:fly={{ y: 20, duration: 150 }}
	out:fly={{ y: 20, duration: 150 }}
	class="flex w-64 items-center gap-4 rounded-lg border border-neutral-700 bg-neutral-200 px-4 py-3 font-medium dark:bg-neutral-800"
	onclick={() => toastStore.remove(toast.id)}
>
	<div class="mb-auto shrink-0 text-neutral-900 dark:text-neutral-300">
		{#if toast.type === 'success'}
			<CheckCircle size={24} />
		{:else if toast.type === 'error'}
			<WarningCircle size={24} />
		{:else}
			<InfoCircle size={24} />
		{/if}
	</div>

	<span class="line-clamp-2 text-sm text-neutral-700 dark:text-neutral-200">{toast.message}</span>
</button>
