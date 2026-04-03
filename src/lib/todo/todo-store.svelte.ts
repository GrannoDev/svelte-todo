import { db } from '$lib/db';
import { getToastStore } from '$lib/toast/toast-store.svelte';
import { liveQuery } from 'dexie';
import { getContext, onDestroy, setContext } from 'svelte';

export type Todo = {
	id: string;
	text: string;
	completed: boolean;
	createdAt: number;
};

class TodoStore {
	todos: Todo[] = $state([]);
	toastStore: ReturnType<typeof getToastStore>;

	constructor() {
		this.toastStore = getToastStore();
		const todosSubscription = liveQuery(() =>
			db.todos.toCollection().sortBy('createdAt')
		).subscribe((todos) => {
			this.todos = todos;
		});
		onDestroy(() => {
			todosSubscription.unsubscribe();
		});
	}
	async add(text: string) {
		const newTodo = {
			id: crypto.randomUUID(),
			text,
			completed: false,
			createdAt: Date.now()
		};
		try {
			await db.todos.add(newTodo);
			this.toastStore.add('Todo added', 'success');
		} catch (error) {
			this.toastStore.add('Failed to add todo', 'error');
			console.error('Error adding todo:', error);
			return;
		}
	}
	async update(todo: Todo) {
		try {
			await db.todos.update(todo.id, todo);
			this.toastStore.add('Todo updated', 'success');
		} catch (error) {
			this.toastStore.add('Failed to update todo', 'error');
			console.error('Error updating todo:', error);
			return;
		}
	}
	async remove(id: string) {
		try {
			await db.todos.delete(id);
			this.toastStore.add('Todo deleted', 'success');
		} catch (error) {
			this.toastStore.add('Failed to delete todo', 'error');
			console.error('Error deleting todo:', error);
			return;
		}
	}
}

const TODO_STORE_KEY = Symbol('TODO_STORE');

export function setTodoStore() {
	return setContext(TODO_STORE_KEY, new TodoStore());
}
export function getTodoStore() {
	return getContext<ReturnType<typeof setTodoStore>>(TODO_STORE_KEY);
}
