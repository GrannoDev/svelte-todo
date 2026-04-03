<script lang="ts">
	import { getToastStore } from '$lib/toast/toast-store.svelte';
	import Toast from './toast.svelte';

	const toastStore = getToastStore();
</script>

<div class="fixed right-4 bottom-4 z-50 flex flex-col gap-2">
	{#each toastStore.toasts as toast (toast.id)}
		<Toast {toast} />
	{/each}
</div>
