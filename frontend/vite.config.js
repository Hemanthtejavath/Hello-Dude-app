import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteCompression from "vite-plugin-compression";

export default defineConfig({
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5001",
        changeOrigin: true,
      },
    },
  },

  build: {
    // Increase the chunk size warning limit (optional)
    chunkSizeWarningLimit: 1000, // Set to 1000 kB

    // Configure Rollup for manual chunking
    rollupOptions: {
      output: {
        manualChunks: {
          // Split vendor libraries into a separate chunk
          vendor: ["react", "react-dom", "stream-chat-react"],
        },
      },
    },
  },

  // Add plugins for compression
  plugins: [
    react(),
    viteCompression({
      algorithm: "gzip", // Use gzip compression
      ext: ".gz", // Add .gz extension to compressed files
    }),
  ],
});
