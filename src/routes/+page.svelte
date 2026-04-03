<script lang="ts">
	import TodoInput from '$lib/todo/todo-input.svelte';
	import TodoList from '$lib/todo/todo-list.svelte';
</script>

<div class="flex flex-col gap-6">
	<TodoInput />
	<TodoList />
</div>
