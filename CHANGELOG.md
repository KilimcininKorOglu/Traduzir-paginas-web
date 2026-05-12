# Changelog

## [1.0.0] - 2026-05-12

### Added
- Single Manifest V3 manifest for Chrome 102+ and Firefox 128+
- Service worker entry point with importScripts
- Migrate browserAction to action API
- Migrate in-memory state to chrome.storage.session
- Replace XMLHttpRequest with fetch for service worker
- Replace chrome.extension.inIncognitoContext with message-based check
- Update build pipeline for MV3 single manifest
- Site-specific settings (per-hostname target language, custom dictionary)
- GitHub Actions CI workflow (build on push/PR)
- GitHub Actions release workflow (ZIP, XPI, CRX on tag push)

### Removed
- TTS (Text-to-Speech) feature
- Bing, Yandex, DeepL translation services (Google Translate only)
- Service swap hotkey and UI
- Donation, Patreon, and PayPal references
- Dual manifest system (chrome_manifest.json)
- pageAction API usage
- browser.theme handling
- Obsolete Windows registry files

### Changed
- Rename extension from TWP to InPlacely
- Reset version to 1.0.0 for fresh start
- Update all repository references to KilimcininKorOglu/InPlacely
- Link privacy policy to local PRIVACY file
