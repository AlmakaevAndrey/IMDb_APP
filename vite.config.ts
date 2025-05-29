import { defineConfig, UserConfigExport, ConfigEnv } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig ({
    plugins: [react()],
    base: "/IMDb_APP/",
    server: {
      port: 9000,
      open: true
  }
});
