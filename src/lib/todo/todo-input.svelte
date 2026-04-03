<script lang="ts">
	import Plus from 'phosphor-svelte/lib/PlusIcon';

	import { getTodoStore } from './todo-store.svelte';
	const todoStore = getTodoStore();

	let value = $state('');

	function addTodo() {
		todoStore.add(value);
	}
</script>

<div>
	<form
		onsubmit={(e) => {
			e.preventDefault();
			addTodo();
			value = '';
		}}
		class="flex h-12 gap-2 rounded-md border-2 border-neutral-400 p-1 text-sm transition-colors has-focus:border-neutral-600 has-focus:outline-none dark:border-neutral-400 dark:has-focus:border-neutral-200"
	>
		<input
			type="text"
			name="todo"
			bind:value
			id="todo"
			placeholder="What needs to be done?"
			class="peer w-full bg-transparent px-3 text-sm text-neutral-800 placeholder:text-neutral-500 focus:outline-none dark:text-neutral-200 dark:placeholder:text-neutral-400"
		/>

		<button
			type="submit"
			disabled={!value.trim()}
			class="grid aspect-square place-items-center gap-2 rounded bg-neutral-800 text-neutral-200 transition-transform duration-300 active:scale-95 dark:bg-neutral-200 dark:text-neutral-800"
		>
			<Plus size={24} class="shrink-0" />
		</button>
	</form>
	<span class="text-[10px] font-semibold text-neutral-500">PRESS ENTER TO SAVE</span>
</div>
