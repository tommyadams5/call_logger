import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/server": "http://localhost:3000",
      "/samples": "http://localhost:3000",
      "/submit_question_and_documents": "http://localhost:3000",
      "/get_question_and_facts": "http://localhost:3000",
    },
  },
});
