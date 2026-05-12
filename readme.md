# InPlacely

A Manifest V3 browser extension that translates web pages in-place using Google Translate.

Supports Chrome 102+, Firefox 128+, Edge, and Brave.

## Install

### Firefox

Desktop users can download from [Mozilla Addons](https://addons.mozilla.org/firefox/addon/traduzir-paginas-web/).

Android users:
1. Install Firefox v120+ from Google Play.
2. Open the extension manager.
3. Scroll down and tap **Find more add-ons**.
4. Search for **InPlacely** on the add-ons website.
5. Install **InPlacely**.

### Chrome, Edge, and Brave

Load the extension manually:
1. Download the latest release ZIP from the [Releases](https://github.com/KilimcininKorOglu/InPlacely/releases) page.
2. Extract the ZIP.
3. Go to `chrome://extensions`, enable **Developer mode**.
4. Click **Load unpacked** and select the extracted folder.

## Features

- In-page translation without opening new tabs
- Automatic translation for specified sites or languages
- Per-site settings (target language, custom dictionary)
- Selected text translation popup
- Hover translation mode
- Custom dictionary for word replacements
- Wildcard hostname matching for site rules
- 43 interface languages
- Keyboard shortcuts for common actions

## Screenshots

| Menu | Options | Translated |
|:----:|:-------:|:----------:|
| <img src="https://addons.mozilla.org/user-media/previews/full/258/258434.png" height="200"> | <img src="https://addons.mozilla.org/user-media/previews/full/258/258435.png" height="200"> | <img src="https://addons.mozilla.org/user-media/previews/full/258/258436.png" height="200"> |

## Build

Prerequisites: Node.js and npm.

```bash
npm install
npm run build:local-sourcemaps   # Development build
npm run build                    # Production build
```

Output is in the `build/` directory. See [build-instructions.md](build-instructions.md) for details.

## Development

Load the extension directly from `src/` without building:
- **Chrome**: `chrome://extensions` > Developer mode > Load unpacked > select `src/`
- **Firefox**: `about:debugging` > Load Temporary Add-on > select `src/manifest.json`

## Privacy

We do not collect any information. To translate, the contents of web pages are sent to Google servers.

Full policy: [Privacy Policy](https://addons.mozilla.org/addon/traduzir-paginas-web/privacy/)

## Contribute

To help translate the extension interface, use [Crowdin](https://crowdin.com/project/translate-web-pages).

## FAQ

**Why does the extension need access to all websites?**

Translating a website requires reading and modifying the page text. This permission enables that.

**Are there limitations?**

Some pages like `support.mozilla.org` and `addons.mozilla.org` cannot be translated. Browsers block extensions from accessing these sites for security reasons.

## License

[Mozilla Public License 2.0](LICENSE)
