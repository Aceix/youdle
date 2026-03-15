# Copilot Instructions for youdle

## Project Overview

**youdle** is a desktop GUI application for [youtube-dl](https://github.com/ytdl-org/youtube-dl) (the original project; consider [yt-dlp](https://github.com/yt-dlp/yt-dlp) as a maintained fork), built with [Electron](https://www.electronjs.org/) and [Vue.js 2](https://v2.vuejs.org/). It allows users to download YouTube videos by entering a URL, manage downloads, and configure settings — all from a native desktop window.

## Tech Stack

- **Electron** (`^11.5.0`) — desktop shell; entry point is `src/main/index.js`
- **Vue.js 2** (`^2.5.16`) with **Vuex** (`^2.3.1`) for state management and **Vue Router** (`^2.5.3`) for client-side routing
- **shelljs** (`^0.8.5`) — used in the main process to invoke `youtube-dl` shell commands
- **Webpack 3** with the [electron-vue](https://github.com/SimulatedGREG/electron-vue) scaffolding (`node .electron-vue/build.js`)
- **Babel** (`babel-preset-env`, `babel-preset-stage-0`) for ES2015+ transpilation

## Project Structure

```
src/
  main/
    index.js          # Electron main process: window creation, IPC handlers, youtube-dl invocation
    index.dev.js      # Dev-only main process entry (hot reload shim)
  renderer/
    main.js           # Vue app bootstrap
    App.vue           # Root Vue component (layout shell with TopBar, StatusBar, router-view)
    router.js         # Vue Router routes: "/" → HomeView, "/settings" → SettingsView
    store.js          # Vuex store (state, getters, mutations)
    components/
      HomeView.vue        # Main download screen: URL input, active downloads, download history, trending
      SettingsView.vue    # Settings page: downloads directory, video quality
      AdvancedPanel.vue   # Advanced youtube-dl command panel (slide-in aside)
      DownloadlistView.vue# Download list view
      TopBar.vue          # Navigation bar (route links, aside toggle)
      StatusBar.vue       # Bottom status bar (displays current status text)
      VideoPreview.vue    # Inline YouTube video preview (iframe embed)
  index.ejs             # HTML template for the renderer
static/                 # Static assets (icons, images)
.electron-vue/          # Webpack and build configuration scripts
build/                  # Electron Builder configuration / icons
dist/                   # Build output (generated, not committed)
```

## IPC Communication (Main ↔ Renderer)

| Channel (renderer → main)       | Purpose                                              |
|---------------------------------|------------------------------------------------------|
| `download`                      | Start a youtube-dl download for a given URL          |
| `vue-app-ready`                 | Request initial config on app startup                |
| `update-config`                 | Persist updated app configuration                    |
| `execute-advanced-command`      | Run an arbitrary youtube-dl command string           |
| `change-downloads-directory`    | Open a native directory picker dialog                |

| Channel (main → renderer)       | Purpose                                              |
|---------------------------------|------------------------------------------------------|
| `download-started`              | Notify renderer that a download has begun            |
| `download-ended`                | Notify renderer that a download has finished         |
| `yt-status`                     | Stream stdout/stderr chunks from youtube-dl          |
| `config-updated`                | Send updated config object to renderer               |
| `update-config-error`           | Report a config save error                           |
| `advanced-command-status`       | Stream stdout/stderr from advanced command           |
| `change-downloads-directory-path` | Return chosen directory path to renderer           |

## Vuex Store

**State:** `busy`, `asideViewOpen`, `videoPreviewURL`, `isVideoPreviewShowing`, `appConfig`, `activeDownloadsList`, `advancedCommandHistory`, `downloadlist`

**Key mutations:** `setBusy`, `setVideoPreviewURL`, `setVideoPreviewShowingState`, `updateAppConfig`, `addToActiveDownloadsList`, `removeFromActiveDownloadsList`, `addToAdvancedCommandHistory`, `setAsideViewState`, `addToDownloadlist`

## Coding Conventions

- **Vue components** use the Options API (no Composition API). Each `.vue` file has `<template>`, `<script>`, and `<style scoped>` sections.
- Component names use **kebab-case** in templates and **PascalCase** in `components:` option.
- Use `this.$electron.ipcRenderer` in renderer components (provided by `vue-electron`).
- CSS uses **CSS custom properties** (`var(--accent-color)`, `var(--primary-color)`, `var(--background-color)`, `var(--primary-text-color)`) defined globally; do not hard-code those colors.
- Avoid `window.alert` for user feedback; prefer status bar updates via `this.$parent.currentStatusText` or an appropriate Vuex mutation.
- All IPC event names use **kebab-case** strings (e.g. `'download-started'`).
- Configuration is stored in `~/.youdle/config.json`.

## Development Workflow

```bash
# Install dependencies
npm install

# Run in development mode (Electron + hot reload)
npm run dev

# Build for production
npm run build

# Platform-specific builds
npm run build:linux
npm run build:darwin
npm run build:win32
```

> **External dependency:** `youtube-dl` must be installed and available in `PATH` at runtime. The app checks for it on startup and shows an error dialog if it is missing.

## Important Notes

- There are currently **no automated tests**. When adding new features, prefer writing logic in pure functions that can be unit-tested independently of Electron/Vue.
- The `dist/` directory is generated output and should not be manually edited or committed.
- When modifying IPC handlers in `src/main/index.js`, always add a corresponding listener in the relevant Vue component and vice versa.
- `appConfig` is loaded asynchronously at startup; always handle the case where it may be `null` before it resolves.
