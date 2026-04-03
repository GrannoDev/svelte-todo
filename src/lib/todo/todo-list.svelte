<script lang="ts">
	import { getTodoStore } from './todo-store.svelte';
	import Todo from './todo.svelte';

	const todoStore = getTodoStore();
	const completedTodos = $derived(todoStore.todos.filter((todo) => todo.completed).length);
	const totalTodos = $derived(todoStore.todos.length);
</script>

<section class="flex flex-col gap-1">
	{#each todoStore.todos as todo (todo.id)}
		<Todo {todo} />
	{/each}
	<div class="flex items-center justify-between px-4 py-2">
		<p class="text-xs text-neutral-500">{completedTodos} Completed</p>
		<p class="text-xs text-neutral-500">{totalTodos} Total</p>
	</div>
</section>
