import { defineConfig } from 'vitest/config'

// Number of bugs caught through tests so far: 3

export default defineConfig({
    test: {
        environment: 'jsdom',
        coverage: {
            provider: 'v8',
            reporter: ['text-summary', 'html'],
            include: ['src/**']
        }
    }
})
