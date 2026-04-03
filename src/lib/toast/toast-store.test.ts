import { afterEach, beforeEach, expect, it, test, vi } from 'vitest';
import { ToastStore } from './toast-store.svelte';
import { describe } from 'node:test';
test('Toast Store Initialization', () => {
	const toastStore = new ToastStore();
	expect(toastStore.toasts).toEqual([]);

	toastStore.add('Test Message', 'success');
	expect(toastStore.toasts.length).toBe(1);
	expect(toastStore.toasts[0].message).toBe('Test Message');
	expect(toastStore.toasts[0].type).toBe('success');

	toastStore.remove(toastStore.toasts[0].id);
	expect(toastStore.toasts.length).toBe(0);
});

describe('Toast Store', () => {
	let toastStore: ToastStore;
	beforeEach(() => {
		vi.useFakeTimers();
		toastStore = new ToastStore();
	});
	afterEach(() => {
		vi.useRealTimers();
		toastStore.destroy();
	});

	it('Store should be initialized with an empty toasts array', () => {
		expect(toastStore.toasts).toEqual([]);
	});
	it('Adding a toast should add it to the toasts array', () => {
		toastStore.add('Test Message', 'success');
		expect(toastStore.toasts.length).toBe(1);
		expect(toastStore.toasts[0].message).toBe('Test Message');
		expect(toastStore.toasts[0].type).toBe('success');
	});
	it('Removing a toast should remove it from the toasts array', () => {
		toastStore.add('Test Message', 'success');
		const toastId = toastStore.toasts[0].id;
		toastStore.remove(toastId);
		expect(toastStore.toasts.length).toBe(0);
	});
	it('Toast should be automatically removed after 3 seconds', () => {
		toastStore.add('Auto Remove Message', 'info');
		expect(toastStore.toasts.length).toBe(1);
		vi.advanceTimersByTime(3000);
		expect(toastStore.toasts.length).toBe(0);
	});
	it('Destroy should clear all active timeouts', () => {
		const cleaerTimeoutSpy = vi.spyOn(global, 'clearTimeout');
		toastStore.add('Message 1', 'info');
		toastStore.add('Message 2', 'success');
		toastStore.destroy();
		expect(cleaerTimeoutSpy).toHaveBeenCalledTimes(2);
	});
});
