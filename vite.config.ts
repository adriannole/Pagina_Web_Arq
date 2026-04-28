import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // Target modern browsers — smaller, faster output
    target: "es2020",
    rollupOptions: {
      output: {
        // Split vendor chunks so browser can cache react/framer-motion
        // independently from app code
        manualChunks: {
          "vendor-react": ["react", "react-dom", "react-router-dom"],
          "vendor-motion": ["framer-motion"],
        },
      },
    },
    // Larger inline limit means fewer round trips for small assets
    assetsInlineLimit: 8192,
  },
  // Optimize dev HMR
  server: {
    hmr: { overlay: true },
  },
  // Optimize dependency prebundling
  optimizeDeps: {
    include: ["react", "react-dom", "react-router-dom", "framer-motion"],
  },
});
