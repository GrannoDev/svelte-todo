import { db } from '$lib/db';

import { beforeEach, describe, expect, it } from 'vitest';

describe('Todo Store', () => {
	beforeEach(async () => {
		await db.todos.clear();
	});

	it('Adding a todo should add it to the database', async () => {
		const newTodo = {
			id: crypto.randomUUID(),
			text: 'Test Todo',
			completed: false,
			createdAt: Date.now()
		};
		await db.todos.add(newTodo);
		const todos = await db.todos.toArray();
		expect(todos.length).toBe(1);
		expect(todos[0].text).toBe('Test Todo');
	});
	it('Updating a todo should update it in the database', async () => {
		const newTodo = {
			id: crypto.randomUUID(),
			text: 'Test Todo',
			completed: false,
			createdAt: Date.now()
		};
		await db.todos.add(newTodo);
		await db.todos.update(newTodo.id, { completed: true });
		const updatedTodo = await db.todos.get(newTodo.id);
		expect(updatedTodo?.completed).toBe(true);
	});
	it('Removing a todo should delete it from the database', async () => {
		const newTodo = {
			id: crypto.randomUUID(),
			text: 'Test Todo',
			completed: false,
			createdAt: Date.now()
		};
		await db.todos.add(newTodo);
		await db.todos.delete(newTodo.id);
		const deletedTodo = await db.todos.get(newTodo.id);
		expect(deletedTodo).toBeUndefined();
	});
});
