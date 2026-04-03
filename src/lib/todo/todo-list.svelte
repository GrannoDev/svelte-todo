<script lang="ts">
	import { flip } from 'svelte/animate';
	import { getTodoStore } from './todo-store.svelte';
	import Todo from './todo.svelte';

	const todoStore = getTodoStore();
</script>

<section class="flex flex-col gap-1">
	{#each todoStore.todos as todo (todo.id)}
		<div animate:flip={{ duration: 300 }}>
			<Todo {todo} />
		</div>
	{/each}
</section>
