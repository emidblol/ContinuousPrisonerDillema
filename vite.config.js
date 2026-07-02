import { defineConfig } from 'vite'
import { svelte } from '@sveltejs/vite-plugin-svelte'

// https://vite.dev/config/
// Don't you dare touch it
export default defineConfig({
  plugins: [svelte()],
})
