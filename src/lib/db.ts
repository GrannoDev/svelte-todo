import type { Todo } from '$lib/todo/todo-store.svelte';
import { Dexie, type EntityTable } from 'dexie';

const db = new Dexie('svelte-todo') as Dexie & {
	todos: EntityTable<Todo, 'id'>;
};

db.version(1).stores({
	todos: 'id, text, completed, createdAt'
});
export { db };
