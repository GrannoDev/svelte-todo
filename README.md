# Svelte Todo

A small todo app built with modern Svelte tooling and local-first storage.

It keeps the experience simple:

- Add tasks quickly
- Mark tasks as complete
- Delete tasks
- Persist todos locally with IndexedDB
- Switch between light and dark themes

## Tech Stack

### Svelte 5 runes

The UI is built with Svelte 5 and rune-based reactivity such as `$state`, `$derived`, and `$effect`.

Why it matters:

- Keeps component state concise
- Makes derived UI values easy to read
- Fits this small app without extra state libraries

### Dexie

Todos are stored in IndexedDB through Dexie.

Why it matters:

- Data stays in the browser
- Todos persist across refreshes
- `liveQuery` keeps the UI in sync with the database

### Tailwind CSS

Styling is handled with Tailwind CSS utility classes.

Why it matters:

- Fast UI iteration
- Consistent spacing and typography
- Simple dark mode styling

### Vitest

Unit tests are written with Vitest.

Why it matters:

- Fast test runs during development
- Good fit with Vite and Svelte projects
- Helps verify the todo and toast store behavior

## Project Structure

```text
src/
  lib/
    db.ts                # Dexie database setup
    todo/                # Todo UI and store
    toast/               # Toast state and components
    theme-toggle.svelte  # Light/dark theme toggle
  routes/
    +page.svelte         # Main todo page
    +layout.svelte       # App shell
```

## How It Works

1. The user adds a todo from the input form.
2. The todo store writes it to Dexie.
3. Dexie `liveQuery` updates the store whenever data changes.
4. Svelte runes reactively update the UI.
5. Vitest covers the store logic.

## Scripts

```sh
npm run dev
npm run build
npm run preview
npm run check
npm run lint
npm run test
```

## Local Development

```sh
npm install
npm run dev
```

Open the app in your browser and your todos will be saved locally in IndexedDB.

## Why This Stack Works Well For A Todo App

- Svelte 5 keeps the UI logic small and readable
- Dexie adds reliable browser persistence without a backend
- Tailwind CSS makes the interface quick to style
- Vitest keeps the core behavior easy to test

## Summary

This project is a minimal, local-first todo app using:

- `Svelte 5 runes` for reactive UI
- `Dexie` for IndexedDB persistence
- `Tailwind CSS` for styling
- `Vitest` for unit testing
