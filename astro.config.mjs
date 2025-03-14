import { defineConfig } from "astro/config";
import react from "@astrojs/react";

import node from "@astrojs/node";

// https://astro.build/config
export default defineConfig({
    integrations: [react()],
    output: "server",
    adapter: node({
        mode: "standalone",
    }),
    vite: {
        ssr: {
            noExternal: ["react-toastify/dist/", "react-datepicker/dist/"],
        },
    },
});
