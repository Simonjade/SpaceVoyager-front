import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import daisyui from "vite-plugin-daisyui";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), daisyui()],
});

// import VitePluginDaisyUI from "vite-plugin-daisyui";
// VitePluginDaisyUI()
