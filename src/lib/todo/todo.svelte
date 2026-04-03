<script lang="ts">
	import { fade, fly } from 'svelte/transition';
	import { getTodoStore, type Todo } from './todo-store.svelte';
	import Minus from 'phosphor-svelte/lib/MinusIcon';

	const todoStore = getTodoStore();
	const { todo }: { todo: Todo } = $props();

	let createdAt = $derived.by(() => {
		const date = new Date(todo.createdAt);
		return date.toDateString();
	});

	function updateTodo(todo: Todo) {
		todoStore.update(todo);
	}
	function deleteTodo(id: string) {
		todoStore.remove(id);
	}
</script>

<div class="flex w-full gap-2" in:fade out:fly={{ x: '100vw', duration: 500 }}>
	<div
		class="flex w-full items-center justify-between gap-6 border-b border-neutral-500 px-4 py-4 pr-1 text-neutral-700 dark:border-neutral-700 dark:text-neutral-200"
	>
		<label for={todo.id}>
			<input
				id={todo.id}
				type="checkbox"
				checked={todo.completed}
				onchange={() => updateTodo({ ...todo, completed: !todo.completed })}
				class="peer sr-only"
			/>
			<div
				class="size-5 rounded border-2 border-neutral-600 transition-colors peer-checked:border-neutral-700 peer-checked:bg-neutral-700 dark:border-neutral-400 dark:peer-checked:border-neutral-300 dark:peer-checked:bg-neutral-300"
			></div>
		</label>
		<div class="mr-auto">
			<p class:line-through={todo.completed} class="text-sm sm:text-base">{todo.text}</p>
			<p class="text-[10px] text-neutral-500 sm:text-xs">{createdAt}</p>
		</div>
		<button
			type="button"
			onclick={() => deleteTodo(todo.id)}
			class="grid aspect-square size-9 place-items-center rounded hover:bg-neutral-400/10"
		>
			<Minus size={24} class="shrink-0" />
		</button>
	</div>
</div>
