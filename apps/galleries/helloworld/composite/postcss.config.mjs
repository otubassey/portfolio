import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const __dirname = dirname(fileURLToPath(import.meta.url));
// Go up 5 levels to reach the root
const rootPath = join(__dirname, "../../../../../");

const config = {
  plugins: {
    "@tailwindcss/postcss": {
      base: rootPath
    }
  }
};

export default config;
