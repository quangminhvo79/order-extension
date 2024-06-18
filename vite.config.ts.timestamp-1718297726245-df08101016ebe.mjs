// vite.config.ts
import { defineConfig } from "file:///Users/minhvo/works/personal/order-extension/node_modules/vite/dist/node/index.js";
import { crx } from "file:///Users/minhvo/works/personal/order-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";
import react from "file:///Users/minhvo/works/personal/order-extension/node_modules/@vitejs/plugin-react/dist/index.mjs";
import alias from "file:///Users/minhvo/works/personal/order-extension/node_modules/@rollup/plugin-alias/dist/es/index.js";
import { resolve } from "path";

// src/manifest.ts
import { defineManifest } from "file:///Users/minhvo/works/personal/order-extension/node_modules/@crxjs/vite-plugin/dist/index.mjs";

// package.json
var package_default = {
  name: "todo-logistics-order-tool",
  displayName: "TODO Logistics - Order Tool",
  version: "0.0.1",
  author: "MinhVo",
  description: "Tool gi\xFAp kh\xE1ch h\xE0ng \u0111\u1EB7t h\xE0ng \u1EDF c\xE1c ch\u1EE3 th\u01B0\u01A1ng m\u1EA1i \u0111i\u1EC7n t\u1EED d\u1EC3 d\xE0ng h\u01A1n",
  type: "module",
  license: "MIT",
  keywords: [
    "todo-logistics",
    "order-tool"
  ],
  engines: {
    node: ">=14.18.0"
  },
  scripts: {
    dev: "vite",
    build: "tsc && vite build",
    preview: "vite preview",
    fmt: "prettier --write '**/*.{tsx,ts,json,css,scss,md}'",
    zip: "npm run build && node src/zip.js"
  },
  dependencies: {
    "@emotion/react": "^11.11.4",
    "@emotion/styled": "^11.11.5",
    "@fontsource/roboto": "^5.0.13",
    "@medusajs/medusa": "^1.20.6",
    "@mui/icons-material": "^5.15.15",
    "@mui/material": "^5.15.15",
    "@tanstack/react-query": "^5.36.0",
    "@types/lodash": "^4.17.0",
    autoprefixer: "^10.4.19",
    axios: "^1.6.8",
    classnames: "^2.5.1",
    dotenv: "^16.4.5",
    eslint: "8.36.0",
    "eslint-config-prettier": "8.8.0",
    "eslint-config-react-app": "7.0.1",
    "eslint-define-config": "1.15.0",
    "eslint-plugin-prettier": "4.2.1",
    "flowbite-react": "^0.9.0",
    localforage: "^1.10.0",
    lodash: "^4.17.21",
    "match-sorter": "^6.3.4",
    postcss: "^8.4.38",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.23.0",
    "react-toastify": "^10.0.5",
    "sort-by": "^1.2.0",
    yarn: "^1.22.22"
  },
  devDependencies: {
    "@crxjs/vite-plugin": "^2.0.0-beta.19",
    "@rollup/plugin-alias": "^5.1.0",
    "@types/chrome": "^0.0.246",
    "@types/react": "^18.2.28",
    "@types/react-dom": "^18.2.13",
    "@vitejs/plugin-react": "^4.1.0",
    gulp: "^4.0.2",
    "gulp-zip": "^6.0.0",
    prettier: "^3.0.3",
    "rollup-plugin-uglify": "^6.0.4",
    sass: "^1.75.0",
    "style-loader": "^4.0.0",
    tailwindcss: "^3.4.3",
    typescript: "^5.2.2",
    vite: "^4.4.11"
  }
};

// src/manifest.ts
var isDev = process.env.NODE_ENV == "development";
var manifest = {
  name: `${package_default.displayName || package_default.name}${isDev ? ` \u27A1\uFE0F Dev` : ""}`,
  description: package_default.description,
  version: package_default.version,
  manifest_version: 3,
  icons: {
    16: "img/logo-16_x_16.png",
    32: "img/logo-32_x_32.png",
    64: "img/logo-64_x_64.png",
    128: "img/logo-128_x_128.png"
  },
  action: {
    default_popup: "popup.html",
    default_icon: "img/logo-64_x_64.png"
  },
  // options_page: 'options.html',
  // devtools_page: 'devtools.html',
  background: {
    service_worker: "src/background/index.ts"
  },
  content_scripts: [
    {
      matches: [
        "https://*.item.taobao.com/*",
        "https://*.detail.tmall.com/*",
        "https://*.detail.1688.com/*",
        "https://*.zara.com/*"
      ],
      js: ["src/contentScript/index.tsx"]
    }
  ],
  side_panel: {
    default_path: "sidepanel.html"
  },
  web_accessible_resources: [
    {
      resources: ["img/logo-16_x_16.png", "img/logo-32_x_32.png", "img/logo-64_x_64.png", "img/logo-128_x_128.png"],
      matches: []
    }
  ],
  permissions: ["sidePanel", "storage"],
  chrome_url_overrides: {
    // newtab: 'newtab.html',
  }
};
var manifest_default = defineManifest(manifest);

// vite.config.ts
import dotenv from "file:///Users/minhvo/works/personal/order-extension/node_modules/dotenv/lib/main.js";
import { uglify } from "file:///Users/minhvo/works/personal/order-extension/node_modules/rollup-plugin-uglify/index.js";
var __vite_injected_original_dirname = "/Users/minhvo/works/personal/order-extension";
var projectRootDir = resolve(__vite_injected_original_dirname);
dotenv.config();
var { BACKEND_DOMAIN, BACKEND_DEV_DOMAIN } = process.env;
dotenv.config();
var vite_config_default = defineConfig(({ mode }) => {
  return {
    build: {
      emptyOutDir: true,
      outDir: "build",
      rollupOptions: {
        output: {
          chunkFileNames: "assets/chunk-[hash].js"
        }
      }
    },
    server: {
      port: 5173,
      strictPort: true,
      hmr: {
        port: 5173
      }
    },
    define: {
      "process.env": JSON.stringify({
        BACKEND_DOMAIN,
        BACKEND_DEV_DOMAIN
      })
    },
    plugins: [
      crx({ manifest: manifest_default }),
      react({
        include: "**/*.tsx"
      }),
      alias({
        entries: [
          {
            find: "@",
            replacement: resolve(projectRootDir, "src")
          }
        ]
      }),
      uglify()
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAic3JjL21hbmlmZXN0LnRzIiwgInBhY2thZ2UuanNvbiJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9taW5odm8vd29ya3MvcGVyc29uYWwvb3JkZXItZXh0ZW5zaW9uXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvbWluaHZvL3dvcmtzL3BlcnNvbmFsL29yZGVyLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWluaHZvL3dvcmtzL3BlcnNvbmFsL29yZGVyLWV4dGVuc2lvbi92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGRlZmluZUNvbmZpZyB9IGZyb20gJ3ZpdGUnXG5pbXBvcnQgeyBjcnggfSBmcm9tICdAY3J4anMvdml0ZS1wbHVnaW4nXG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnXG5pbXBvcnQgYWxpYXMgZnJvbSAnQHJvbGx1cC9wbHVnaW4tYWxpYXMnXG5pbXBvcnQgeyByZXNvbHZlIH0gZnJvbSAncGF0aCdcbmltcG9ydCBtYW5pZmVzdCBmcm9tICcuL3NyYy9tYW5pZmVzdCdcbmNvbnN0IHByb2plY3RSb290RGlyID0gcmVzb2x2ZShfX2Rpcm5hbWUpO1xuaW1wb3J0IGRvdGVudiBmcm9tIFwiZG90ZW52XCJcbmRvdGVudi5jb25maWcoKTtcblxuY29uc3QgeyBCQUNLRU5EX0RPTUFJTiwgQkFDS0VORF9ERVZfRE9NQUlOIH0gPSBwcm9jZXNzLmVudjtcbmltcG9ydCB7IHVnbGlmeSB9IGZyb20gXCJyb2xsdXAtcGx1Z2luLXVnbGlmeVwiO1xuXG5kb3RlbnYuY29uZmlnKCk7XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKCh7IG1vZGUgfSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGJ1aWxkOiB7XG4gICAgICBlbXB0eU91dERpcjogdHJ1ZSxcbiAgICAgIG91dERpcjogJ2J1aWxkJyxcbiAgICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgY2h1bmtGaWxlTmFtZXM6ICdhc3NldHMvY2h1bmstW2hhc2hdLmpzJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICBzZXJ2ZXI6IHtcbiAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICBzdHJpY3RQb3J0OiB0cnVlLFxuICAgICAgaG1yOiB7XG4gICAgICAgIHBvcnQ6IDUxNzMsXG4gICAgICB9LFxuICAgIH0sXG4gICAgZGVmaW5lOiB7XG4gICAgICBcInByb2Nlc3MuZW52XCI6IEpTT04uc3RyaW5naWZ5KHtcbiAgICAgICAgQkFDS0VORF9ET01BSU4sXG4gICAgICAgIEJBQ0tFTkRfREVWX0RPTUFJTlxuICAgICAgfSlcbiAgICB9LFxuICAgIHBsdWdpbnM6IFtcbiAgICAgIGNyeCh7IG1hbmlmZXN0IH0pLFxuICAgICAgcmVhY3Qoe1xuICAgICAgICBpbmNsdWRlOiBcIioqLyoudHN4XCIsXG4gICAgICB9KSxcbiAgICAgIGFsaWFzKHtcbiAgICAgICAgZW50cmllczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGZpbmQ6ICdAJyxcbiAgICAgICAgICAgIHJlcGxhY2VtZW50OiByZXNvbHZlKHByb2plY3RSb290RGlyLCAnc3JjJylcbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH0pLFxuICAgICAgdWdsaWZ5KClcbiAgICBdLFxuICB9XG59KVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvbWluaHZvL3dvcmtzL3BlcnNvbmFsL29yZGVyLWV4dGVuc2lvbi9zcmNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9taW5odm8vd29ya3MvcGVyc29uYWwvb3JkZXItZXh0ZW5zaW9uL3NyYy9tYW5pZmVzdC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMvbWluaHZvL3dvcmtzL3BlcnNvbmFsL29yZGVyLWV4dGVuc2lvbi9zcmMvbWFuaWZlc3QudHNcIjtpbXBvcnQgeyBkZWZpbmVNYW5pZmVzdCB9IGZyb20gJ0Bjcnhqcy92aXRlLXBsdWdpbidcbmltcG9ydCBwYWNrYWdlRGF0YSBmcm9tICcuLi9wYWNrYWdlLmpzb24nXG5cbi8vQHRzLWlnbm9yZVxuY29uc3QgaXNEZXYgPSBwcm9jZXNzLmVudi5OT0RFX0VOViA9PSAnZGV2ZWxvcG1lbnQnXG5cbmxldCBtYW5pZmVzdCA9IHtcbiAgbmFtZTogYCR7cGFja2FnZURhdGEuZGlzcGxheU5hbWUgfHwgcGFja2FnZURhdGEubmFtZX0ke2lzRGV2ID8gYCBcdTI3QTFcdUZFMEYgRGV2YCA6ICcnfWAsXG4gIGRlc2NyaXB0aW9uOiBwYWNrYWdlRGF0YS5kZXNjcmlwdGlvbixcbiAgdmVyc2lvbjogcGFja2FnZURhdGEudmVyc2lvbixcbiAgbWFuaWZlc3RfdmVyc2lvbjogMyxcbiAgaWNvbnM6IHtcbiAgICAxNjogJ2ltZy9sb2dvLTE2X3hfMTYucG5nJyxcbiAgICAzMjogJ2ltZy9sb2dvLTMyX3hfMzIucG5nJyxcbiAgICA2NDogJ2ltZy9sb2dvLTY0X3hfNjQucG5nJyxcbiAgICAxMjg6ICdpbWcvbG9nby0xMjhfeF8xMjgucG5nJyxcbiAgfSxcbiAgYWN0aW9uOiB7XG4gICAgZGVmYXVsdF9wb3B1cDogJ3BvcHVwLmh0bWwnLFxuICAgIGRlZmF1bHRfaWNvbjogJ2ltZy9sb2dvLTY0X3hfNjQucG5nJyxcbiAgfSxcbiAgLy8gb3B0aW9uc19wYWdlOiAnb3B0aW9ucy5odG1sJyxcbiAgLy8gZGV2dG9vbHNfcGFnZTogJ2RldnRvb2xzLmh0bWwnLFxuICBiYWNrZ3JvdW5kOiB7XG4gICAgc2VydmljZV93b3JrZXI6ICdzcmMvYmFja2dyb3VuZC9pbmRleC50cycsXG4gIH0sXG4gIGNvbnRlbnRfc2NyaXB0czogW1xuICAgIHtcbiAgICAgIG1hdGNoZXM6IFtcbiAgICAgICAgJ2h0dHBzOi8vKi5pdGVtLnRhb2Jhby5jb20vKicsXG4gICAgICAgICdodHRwczovLyouZGV0YWlsLnRtYWxsLmNvbS8qJyxcbiAgICAgICAgJ2h0dHBzOi8vKi5kZXRhaWwuMTY4OC5jb20vKicsXG4gICAgICAgICdodHRwczovLyouemFyYS5jb20vKicsXG4gICAgICBdLFxuICAgICAganM6IFsnc3JjL2NvbnRlbnRTY3JpcHQvaW5kZXgudHN4J10sXG4gICAgfSxcbiAgXSxcbiAgc2lkZV9wYW5lbDoge1xuICAgIGRlZmF1bHRfcGF0aDogJ3NpZGVwYW5lbC5odG1sJyxcbiAgfSxcbiAgd2ViX2FjY2Vzc2libGVfcmVzb3VyY2VzOiBbXG4gICAge1xuICAgICAgcmVzb3VyY2VzOiBbJ2ltZy9sb2dvLTE2X3hfMTYucG5nJywgJ2ltZy9sb2dvLTMyX3hfMzIucG5nJywgJ2ltZy9sb2dvLTY0X3hfNjQucG5nJywgJ2ltZy9sb2dvLTEyOF94XzEyOC5wbmcnXSxcbiAgICAgIG1hdGNoZXM6IFtdLFxuICAgIH0sXG4gIF0sXG4gIHBlcm1pc3Npb25zOiBbJ3NpZGVQYW5lbCcsICdzdG9yYWdlJ10sXG4gIGNocm9tZV91cmxfb3ZlcnJpZGVzOiB7XG4gICAgLy8gbmV3dGFiOiAnbmV3dGFiLmh0bWwnLFxuICB9LFxufVxuXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVNYW5pZmVzdChtYW5pZmVzdClcbiIsICJ7XG4gIFwibmFtZVwiOiBcInRvZG8tbG9naXN0aWNzLW9yZGVyLXRvb2xcIixcbiAgXCJkaXNwbGF5TmFtZVwiOiBcIlRPRE8gTG9naXN0aWNzIC0gT3JkZXIgVG9vbFwiLFxuICBcInZlcnNpb25cIjogXCIwLjAuMVwiLFxuICBcImF1dGhvclwiOiBcIk1pbmhWb1wiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiVG9vbCBnaVx1MDBGQXAga2hcdTAwRTFjaCBoXHUwMEUwbmcgXHUwMTExXHUxRUI3dCBoXHUwMEUwbmcgXHUxRURGIGNcdTAwRTFjIGNoXHUxRUUzIHRoXHUwMUIwXHUwMUExbmcgbVx1MUVBMWkgXHUwMTExaVx1MUVDN24gdFx1MUVFRCBkXHUxRUMzIGRcdTAwRTBuZyBoXHUwMUExblwiLFxuICBcInR5cGVcIjogXCJtb2R1bGVcIixcbiAgXCJsaWNlbnNlXCI6IFwiTUlUXCIsXG4gIFwia2V5d29yZHNcIjogW1xuICAgIFwidG9kby1sb2dpc3RpY3NcIixcbiAgICBcIm9yZGVyLXRvb2xcIlxuICBdLFxuICBcImVuZ2luZXNcIjoge1xuICAgIFwibm9kZVwiOiBcIj49MTQuMTguMFwiXG4gIH0sXG4gIFwic2NyaXB0c1wiOiB7XG4gICAgXCJkZXZcIjogXCJ2aXRlXCIsXG4gICAgXCJidWlsZFwiOiBcInRzYyAmJiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmV2aWV3XCI6IFwidml0ZSBwcmV2aWV3XCIsXG4gICAgXCJmbXRcIjogXCJwcmV0dGllciAtLXdyaXRlICcqKi8qLnt0c3gsdHMsanNvbixjc3Msc2NzcyxtZH0nXCIsXG4gICAgXCJ6aXBcIjogXCJucG0gcnVuIGJ1aWxkICYmIG5vZGUgc3JjL3ppcC5qc1wiXG4gIH0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkBlbW90aW9uL3JlYWN0XCI6IFwiXjExLjExLjRcIixcbiAgICBcIkBlbW90aW9uL3N0eWxlZFwiOiBcIl4xMS4xMS41XCIsXG4gICAgXCJAZm9udHNvdXJjZS9yb2JvdG9cIjogXCJeNS4wLjEzXCIsXG4gICAgXCJAbWVkdXNhanMvbWVkdXNhXCI6IFwiXjEuMjAuNlwiLFxuICAgIFwiQG11aS9pY29ucy1tYXRlcmlhbFwiOiBcIl41LjE1LjE1XCIsXG4gICAgXCJAbXVpL21hdGVyaWFsXCI6IFwiXjUuMTUuMTVcIixcbiAgICBcIkB0YW5zdGFjay9yZWFjdC1xdWVyeVwiOiBcIl41LjM2LjBcIixcbiAgICBcIkB0eXBlcy9sb2Rhc2hcIjogXCJeNC4xNy4wXCIsXG4gICAgXCJhdXRvcHJlZml4ZXJcIjogXCJeMTAuNC4xOVwiLFxuICAgIFwiYXhpb3NcIjogXCJeMS42LjhcIixcbiAgICBcImNsYXNzbmFtZXNcIjogXCJeMi41LjFcIixcbiAgICBcImRvdGVudlwiOiBcIl4xNi40LjVcIixcbiAgICBcImVzbGludFwiOiBcIjguMzYuMFwiLFxuICAgIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiOiBcIjguOC4wXCIsXG4gICAgXCJlc2xpbnQtY29uZmlnLXJlYWN0LWFwcFwiOiBcIjcuMC4xXCIsXG4gICAgXCJlc2xpbnQtZGVmaW5lLWNvbmZpZ1wiOiBcIjEuMTUuMFwiLFxuICAgIFwiZXNsaW50LXBsdWdpbi1wcmV0dGllclwiOiBcIjQuMi4xXCIsXG4gICAgXCJmbG93Yml0ZS1yZWFjdFwiOiBcIl4wLjkuMFwiLFxuICAgIFwibG9jYWxmb3JhZ2VcIjogXCJeMS4xMC4wXCIsXG4gICAgXCJsb2Rhc2hcIjogXCJeNC4xNy4yMVwiLFxuICAgIFwibWF0Y2gtc29ydGVyXCI6IFwiXjYuMy40XCIsXG4gICAgXCJwb3N0Y3NzXCI6IFwiXjguNC4zOFwiLFxuICAgIFwicmVhY3RcIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1kb21cIjogXCJeMTguMi4wXCIsXG4gICAgXCJyZWFjdC1yb3V0ZXItZG9tXCI6IFwiXjYuMjMuMFwiLFxuICAgIFwicmVhY3QtdG9hc3RpZnlcIjogXCJeMTAuMC41XCIsXG4gICAgXCJzb3J0LWJ5XCI6IFwiXjEuMi4wXCIsXG4gICAgXCJ5YXJuXCI6IFwiXjEuMjIuMjJcIlxuICB9LFxuICBcImRldkRlcGVuZGVuY2llc1wiOiB7XG4gICAgXCJAY3J4anMvdml0ZS1wbHVnaW5cIjogXCJeMi4wLjAtYmV0YS4xOVwiLFxuICAgIFwiQHJvbGx1cC9wbHVnaW4tYWxpYXNcIjogXCJeNS4xLjBcIixcbiAgICBcIkB0eXBlcy9jaHJvbWVcIjogXCJeMC4wLjI0NlwiLFxuICAgIFwiQHR5cGVzL3JlYWN0XCI6IFwiXjE4LjIuMjhcIixcbiAgICBcIkB0eXBlcy9yZWFjdC1kb21cIjogXCJeMTguMi4xM1wiLFxuICAgIFwiQHZpdGVqcy9wbHVnaW4tcmVhY3RcIjogXCJeNC4xLjBcIixcbiAgICBcImd1bHBcIjogXCJeNC4wLjJcIixcbiAgICBcImd1bHAtemlwXCI6IFwiXjYuMC4wXCIsXG4gICAgXCJwcmV0dGllclwiOiBcIl4zLjAuM1wiLFxuICAgIFwicm9sbHVwLXBsdWdpbi11Z2xpZnlcIjogXCJeNi4wLjRcIixcbiAgICBcInNhc3NcIjogXCJeMS43NS4wXCIsXG4gICAgXCJzdHlsZS1sb2FkZXJcIjogXCJeNC4wLjBcIixcbiAgICBcInRhaWx3aW5kY3NzXCI6IFwiXjMuNC4zXCIsXG4gICAgXCJ0eXBlc2NyaXB0XCI6IFwiXjUuMi4yXCIsXG4gICAgXCJ2aXRlXCI6IFwiXjQuNC4xMVwiXG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBc1QsU0FBUyxvQkFBb0I7QUFDblYsU0FBUyxXQUFXO0FBQ3BCLE9BQU8sV0FBVztBQUNsQixPQUFPLFdBQVc7QUFDbEIsU0FBUyxlQUFlOzs7QUNKb1MsU0FBUyxzQkFBc0I7OztBQ0EzVjtBQUFBLEVBQ0UsTUFBUTtBQUFBLEVBQ1IsYUFBZTtBQUFBLEVBQ2YsU0FBVztBQUFBLEVBQ1gsUUFBVTtBQUFBLEVBQ1YsYUFBZTtBQUFBLEVBQ2YsTUFBUTtBQUFBLEVBQ1IsU0FBVztBQUFBLEVBQ1gsVUFBWTtBQUFBLElBQ1Y7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUFBLEVBQ0EsU0FBVztBQUFBLElBQ1QsTUFBUTtBQUFBLEVBQ1Y7QUFBQSxFQUNBLFNBQVc7QUFBQSxJQUNULEtBQU87QUFBQSxJQUNQLE9BQVM7QUFBQSxJQUNULFNBQVc7QUFBQSxJQUNYLEtBQU87QUFBQSxJQUNQLEtBQU87QUFBQSxFQUNUO0FBQUEsRUFDQSxjQUFnQjtBQUFBLElBQ2Qs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
