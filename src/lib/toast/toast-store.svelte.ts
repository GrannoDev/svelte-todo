import { getContext, setContext } from 'svelte';
import { MediaQuery, SvelteMap } from 'svelte/reactivity';

export type Toast = {
	id: string;
	message: string;
	type: 'success' | 'error' | 'info';
};

export class ToastStore {
	#activeToasts = new SvelteMap<string, ReturnType<typeof setTimeout>>();
	toasts: Toast[] = $state([]);
	isDesktop = new MediaQuery('(min-width: 1024px)');
	add(message: string, type: 'success' | 'error' | 'info' = 'info') {
		if (!this.isDesktop.current) {
			return;
		}
		const id = crypto.randomUUID();
		this.toasts = [...this.toasts, { id, message, type }];
		const timeoutId = setTimeout(() => this.remove(id), 3000);
		this.#activeToasts.set(id, timeoutId);
	}

	remove(id: string) {
		this.toasts = this.toasts.filter((toast) => toast.id !== id);
		const timeoutId = this.#activeToasts.get(id);
		if (timeoutId) {
			clearTimeout(timeoutId);
			this.#activeToasts.delete(id);
		}
	}
	destroy() {
		for (const timeout of this.#activeToasts.values()) {
			clearTimeout(timeout);
		}
		this.#activeToasts.clear();
	}
}

const TOAST_STORE_KEY = Symbol('TOAST_STORE');

export function setToastStore() {
	return setContext(TOAST_STORE_KEY, new ToastStore());
}

export function getToastStore() {
	return getContext<ReturnType<typeof setToastStore>>(TOAST_STORE_KEY);
}
