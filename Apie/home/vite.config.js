import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import federation from "vite-plugin-federation";
import path from "path";

// Get dependencies from package.json
const deps = require("./package.json").dependencies;

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "home", // The name of the current microfrontend (this build)
      filename: "remoteEntry.js", // The entry point for Module Federation
      remotes: {
        // Other remote apps this app can consume
        pdp: "pdp@http://localhost:3001/remoteEntry.js",
        // cart: 'cart@http://localhost:3002/remoteEntry.js',
      },
      exposes: {
        // Expose modules from this app
        "./Header": "./src/Header.jsx",
        "./Footer": "./src/Footer.jsx",
        "./HomeContent": "./src/HomeContent.jsx",
        "./MainLayout": "./src/MainLayout.jsx",
      },
      shared: {
        react: {
          singleton: true, // Ensure a single version of react across all federated apps
          requiredVersion: deps.react,
        },
        "react-dom": {
          singleton: true, // Ensure a single version of react-dom
          requiredVersion: deps["react-dom"],
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"), // Set up aliases for easier imports
    },
  },
  server: {
    port: 3000, // Port for the development server
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow CORS for development
    },
    historyApiFallback: true, // Handle client-side routing
  },
  build: {
    rollupOptions: {
      external: ["react", "react-dom"], // Exclude react and react-dom from being bundled
    },
  },
});
