import { defineManifest } from '@crxjs/vite-plugin'
import packageData from '../package.json'

//@ts-ignore
const isDev = process.env.NODE_ENV == 'development'

let manifest = {
  name: `${packageData.displayName || packageData.name}${isDev ? ` ➡️ Dev` : ''}`,
  description: packageData.description,
  version: packageData.version,
  manifest_version: 3,
  icons: {
    16: 'img/logo-16_x_16.png',
    32: 'img/logo-32_x_32.png',
    64: 'img/logo-64_x_64.png',
    128: 'img/logo-128_x_128.png',
  },
  action: {
    default_popup: 'popup.html',
    default_icon: 'img/logo-64_x_64.png',
  },
  background: {
    service_worker: 'src/background/index.ts',
  },
  content_scripts: [
    {
      matches: [
        'https://*.item.taobao.com/*',
        'https://*.detail.tmall.com/*',
        'https://*.detail.1688.com/*',
      ],
      js: ['src/contentScript/index.tsx'],
    },
  ],
  side_panel: {
    default_path: 'sidepanel.html',
  },
  web_accessible_resources: [
    {
      resources: ['img/logo-16_x_16.png', 'img/logo-32_x_32.png', 'img/logo-64_x_64.png', 'img/logo-128_x_128.png'],
      matches: [],
    },
  ],
  permissions: ['sidePanel', 'storage', 'activeTab'],
}

export default defineManifest(manifest)
