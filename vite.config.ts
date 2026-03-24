import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { componentTagger } from "lovable-tagger";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
  },
  plugins: [react(), mode === "development" && componentTagger()].filter(
    Boolean
  ),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // Prioritize country-state-city as separate chunk
          if (id.includes('country-state-city')) {
            return 'country-state-city';
          }
          // Separate vendor code
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/@tanstack/react-query') ||
            id.includes('node_modules/react-router-dom')
          ) {
            return 'vendor';
          }
          // Separate UI framework
          if (id.includes('node_modules/framer-motion')) {
            return 'animations';
          }
        },
      },
    },
    minify: "terser",
    terserOptions: {
      compress: {
        drop_console: true,
        passes: 2,
      },
      mangle: {
        properties: { regex: /^_/ }, // Mangle private properties
      },
      format: {
        comments: false,
      },
    },
    // Important for slow networks: enable gzip compression
    assetsInlineLimit: 2048, // Inline small assets (< 2KB)
    cssCodeSplit: true, // Split CSS per chunk
  },
}));
