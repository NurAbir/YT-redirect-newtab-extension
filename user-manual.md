# User Manual — YouTube → yout-ube Redirector

---

## What to Expect

Once installed, clicking a YouTube **video link** works like this:

- The page you are on **stays exactly as it is**
- A **new tab opens** automatically with the video on `yout-ube.com`
- You never get redirected away from what you were reading

Only video links (`youtube.com/watch?v=...`) are affected. Clicking the YouTube homepage, a channel, a playlist, or search results opens them completely normally — no redirect.

---

## Installation

### Step 1 — Download & Unzip
Download `yt-redirect-newtab-extension.zip` and unzip it to a folder on your computer.

### Step 2 — Open the Extensions Page
Type the following in your browser address bar and press **Enter**:
```
chrome://extensions/
```

### Step 3 — Enable Developer Mode
In the top-right corner, switch on the **Developer mode** toggle.

### Step 4 — Load the Extension
Click **"Load unpacked"** and select the unzipped `yt-redirect-newtab-extension` folder.

### Step 5 — Done ✅
The red play button icon appears in your toolbar. The extension is now active.

> **Tip:** Click the puzzle piece icon in the toolbar and pin the extension so it is always visible.

---

## Using the Extension

### Clicking a YouTube Video Link
Click any YouTube watch link from any page — an article, email, chat, social media, anywhere.

**What happens:**
- Your current tab stays on the same page ✅
- A new tab opens with the video on `yout-ube.com` ✅

**Example:**
```
You click:     https://www.youtube.com/watch?v=QBVUjVqCW4o
New tab opens: https://www.yout-ube.com/watch?v=QBVUjVqCW4o
Current tab:   unchanged
```

### Clicking a Video Inside YouTube
If you are already on YouTube and click a video thumbnail or recommendation, the same applies — a new tab opens on `yout-ube.com` and the YouTube tab stays where it was.

### Links That Are NOT Redirected
These open normally, with no extension involvement:

| Action | Result |
|--------|--------|
| Click YouTube homepage link | Opens `youtube.com` normally |
| Click a YouTube channel link | Opens channel normally |
| Click YouTube search results | Opens search normally |
| Click a YouTube playlist | Opens playlist normally |
| Type `youtube.com` in address bar | Opens normally |
| Ctrl+Click / Cmd+Click any link | Browser handles it normally |
| Shift+Click any link | Browser handles it normally |
| Right-click → Open in new tab | Browser handles it normally |

---

## Toggle On / Off

To temporarily pause the redirect:

1. Click the extension icon (red play button) in the toolbar
2. Flip the **Auto Redirect** toggle to **OFF**
3. Status changes to **"Paused"**

YouTube video links will open normally until you turn it back on. Your preference is saved and survives browser restarts.

---

## Updating the Extension

1. Go to `chrome://extensions/`
2. Find **"YouTube → yout-ube Redirector (New Tab)"** and click **Remove**
3. Unzip the new version
4. Click **"Load unpacked"** and select the new folder

---

## Uninstalling

1. Go to `chrome://extensions/`
2. Find **"YouTube → yout-ube Redirector (New Tab)"**
3. Click **Remove** and confirm

---

## Troubleshooting

| Problem | Solution |
|---------|----------|
| Current tab still navigates to YouTube | You may have the old version installed — remove it and load the latest zip |
| No new tab opens when clicking a video link | Check the toggle is ON in the popup |
| Homepage / channel links are being redirected | Make sure you have v1.4.0+ — older versions redirected all YouTube links |
| "Load unpacked" button not visible | Turn on Developer mode (top-right toggle on the extensions page) |
| New tab opens but shows an error | yout-ube.com may be temporarily unavailable — try again shortly |
| Toggle doesn't seem to apply | Refresh the current page once after toggling |

---

## Privacy

This extension:
- Does **not** collect or transmit any data
- Does **not** read page content or browsing history
- Only inspects the `href` of links you physically click
- Only acts when the href matches `youtube.com/watch?...`
- All processing happens entirely inside your browser

---

## Version

**v1.4.0** — Watch-link-only redirect with synchronous click interception.
