import { defineConfig, createLogger } from "vite";
import { reactRouter } from "@react-router/dev/vite";

const logger = createLogger();
const originalWarn = logger.warn;
logger.warn = (msg, options) => {
  if (msg.includes("envFile")) return;
  originalWarn(msg, options);
};

export default defineConfig({
  base: "/",
  customLogger: logger,
  plugins: [reactRouter()],
});

