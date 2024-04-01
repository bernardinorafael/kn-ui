import path from "node:path"

import { TanStackRouterVite } from "@tanstack/router-vite-plugin"
import react from "@vitejs/plugin-react"
import { defineConfig, InlineConfig, UserConfig } from "vite"

export default defineConfig({
	server: {
		port: 3000,
	},
	plugins: [TanStackRouterVite(), react()],
	resolve: {
		alias: {
			"@": path.resolve(__dirname, "./"),
		},
	},
	test: {
		globals: true,
		setupFiles: ["./test/setup.ts"],
		environment: "happy-dom",
	},
} as UserConfig & {
	test: InlineConfig
})
