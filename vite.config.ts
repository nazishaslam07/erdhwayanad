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
        // Optimize chunk names for better caching
        chunkFileNames: 'assets/[name]-[hash:8].js',
        entryFileNames: 'assets/[name]-[hash:8].js',
        assetFileNames: 'assets/[name]-[hash:8][extname]',
        manualChunks(id) {
          // Prioritize country-state-city as separate chunk
          if (id.includes('country-state-city')) {
            return 'country-state-city';
          }
          // Separate vendor code for better caching
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/@tanstack/react-query') ||
            id.includes('node_modules/react-router-dom')
          ) {
            return 'vendor';
          }
          // Separate UI framework animations
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
        // More aggressive compression
        pure_getters: true,
        reduce_vars: true,
      },
      mangle: {
        // Mangle private properties
        properties: { regex: /^_/ },
      },
      format: {
        comments: false,
      },
    },
    // Optimization settings for slow networks
    assetsInlineLimit: 1024, // Inline small assets (< 1KB instead of 2KB)
    cssCodeSplit: true,
    // Reduce build output noise
    reportCompressedSize: false,
  },
  // Performance hints
  esbuild: {
    // Drop console in production
    drop: mode === 'production' ? ['console', 'debugger'] : [],
  },
}));
