# Build Instructions

## Prerequisites

- Node.js and npm installed.
- Run `npm install` before any build command.

## Development Without Building

The extension can be loaded directly from the `src/` folder:
- **Chrome**: `chrome://extensions` > Developer mode > Load unpacked > select `src/`
- **Firefox**: `about:debugging` > Load Temporary Add-on > select `src/manifest.json`

## How to Build polyfill.js

Run `npm run polyfill` to compile the root `polyfill.js` file into `src/lib/polyfill.js`. The polyfill is a compilation of core-js polyfills. Do not edit `src/lib/polyfill.js` directly.

## How to Build the Extension

| Command                          | Description                                      |
|----------------------------------|--------------------------------------------------|
| `npm run build:local-sourcemaps` | Build with source maps embedded locally          |
| `npm run build`                  | Build with remote source maps (smaller download) |
| `npm run build:sign`             | Build and sign Chrome CRX (prompts for key file) |

The build output goes to the `build/` directory, producing ZIP packages for Firefox and Chromium.

The `npm run build` command generates remote source maps, configured to be hosted at a separate GitHub repository. This reduces the extension download size while still allowing users to debug without the original source code.

## Notes

- The `extra/` folder is a standalone Node.js project for fetching language data. It is not part of the extension build.
- The build uses Babel for transpilation, targeting Chrome 102+ and Firefox 128+.
