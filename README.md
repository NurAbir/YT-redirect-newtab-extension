# YouTube → yout-ube Redirector

> A lightweight Chromium extension that intercepts YouTube **video link** clicks and opens them on **yout-ube.com** in a new tab — while keeping your current page completely unchanged.

---

## What It Does

When you click a YouTube **watch** link anywhere, this extension:

1. **Blocks** the current tab from navigating away
2. **Opens** the video on `yout-ube.com` in a brand new tab

```
You click:     https://www.youtube.com/watch?v=QBVUjVqCW4o
New tab opens: https://www.yout-ube.com/watch?v=QBVUjVqCW4o
Current tab:   stays exactly where it was ✅
```

Only `/watch` links are intercepted. Clicking the YouTube homepage, channel pages, playlists, or search results opens them **normally** without any redirect.

---

## What Gets Redirected

| Link type | Example | Redirected? |
|-----------|---------|-------------|
| Video watch link | `youtube.com/watch?v=...` | ✅ Yes |
| YouTube homepage | `youtube.com` | ❌ No |
| Channel page | `youtube.com/@channel` | ❌ No |
| Search results | `youtube.com/results?search_query=...` | ❌ No |
| Playlist page | `youtube.com/playlist?list=...` | ❌ No |
| Address bar typing | any youtube.com URL | ❌ No |

---

## Features

- ✅ Only redirects `/watch` video links — nothing else
- ✅ Original tab never navigates — zero flicker, zero page change
- ✅ Opens yout-ube.com in a new tab on every video click
- ✅ Works from any website, email, doc, or inside YouTube itself
- ✅ Ignores Ctrl+Click, Cmd+Click, Shift+Click
- ✅ Toggle on/off from the extension popup
- ✅ No data collected, no external servers, fully local
- ✅ Manifest V3 compliant

---

## Browser Compatibility

| Browser | Supported |
|---------|-----------|
| Google Chrome | ✅ |
| Microsoft Edge | ✅ |
| Brave | ✅ |
| Opera | ✅ |
| Vivaldi | ✅ |
| Firefox | ❌ (different extension API) |

---

## File Structure

```
yt-redirect-newtab-extension/
├── manifest.json      # Extension config (Manifest V3)
├── background.js      # Service worker — tab creation & state storage
├── content.js         # Injected into all pages — intercepts /watch clicks
├── popup.html         # Toggle UI shown on icon click
├── popup.js           # Popup interaction logic
└── icons/
    ├── icon16.png
    ├── icon48.png
    └── icon128.png
```

---

## How It Works (Technical)

```
User clicks a link
        │
content.js (useCapture: true, synchronous)
        │
        ├── Is redirectEnabled cached state true?     → No:  ignore
        ├── Is this a plain left click?               → No:  ignore
        ├── Does href match youtube.com/watch?...?    → No:  ignore
        │
        ▼
e.preventDefault()   ← synchronous, browser never navigates
e.stopPropagation()
        │
chrome.runtime.sendMessage → background.js
        │
chrome.tabs.create({ url: "yout-ube.com/watch?v=..." })
```

**Why synchronous matters:** `preventDefault()` only works when called during the original event dispatch. The enabled state is cached locally in the content script via `chrome.storage.local` so there is zero async delay — the browser is blocked before it even starts navigating.

---

## Permissions Used

| Permission | Reason |
|------------|--------|
| `tabs` | Create new tab with the redirected URL |
| `storage` | Persist and sync the on/off toggle state |
| `host_permissions: *.youtube.com` | Allows opening yout-ube.com tabs |
| `host_permissions: <all_urls>` | Content script needs to intercept clicks on any page that may contain a YouTube link |

---

## Changelog

| Version | Change |
|---------|--------|
| 1.0.0 | Initial release using `declarativeNetRequest` |
| 1.1.0 | Switched to `webNavigation` — respects typed URLs |
| 1.2.0 | New tab edition using `webNavigation` |
| 1.3.0 | Rewrote with content script + synchronous `preventDefault()` — original tab never navigates |
| 1.4.0 | Redirect scoped to `/watch` links only — homepage, channels, search unaffected |

---

## License

MIT — free to use, modify, and distribute.
.
