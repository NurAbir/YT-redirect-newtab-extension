// Content script — runs on every page (Firefox)
// Only intercepts clicks on YouTube /watch links

const YT_WATCH_RE = /^https?:\/\/(www\.)?youtube\.com\/watch\?/;

function toYoutUbe(url) {
  return url
    .replace("www.youtube.com", "www.yout-ube.com")
    .replace(/^(https?:\/\/)youtube\.com/, "$1yout-ube.com");
}

// Cache enabled state locally so preventDefault() fires SYNCHRONOUSLY
let redirectEnabled = true;

browser.storage.local.get("redirectEnabled").then((data) => {
  if (data.redirectEnabled !== undefined) {
    redirectEnabled = data.redirectEnabled;
  }
});

browser.storage.onChanged.addListener((changes) => {
  if (changes.redirectEnabled) {
    redirectEnabled = changes.redirectEnabled.newValue;
  }
});

document.addEventListener("click", (e) => {
  if (!redirectEnabled) return;
  if (e.button !== 0) return;                        // left click only
  if (e.ctrlKey || e.metaKey || e.shiftKey) return; // ignore modifier clicks

  // Walk up DOM to find nearest <a>
  const anchor = e.composedPath().find((el) => el.tagName === "A");
  if (!anchor) return;

  const href = anchor.href;
  if (!href) return;

  // ✅ Only act on youtube.com/watch?... links — nothing else
  if (!YT_WATCH_RE.test(href)) return;

  e.preventDefault();
  e.stopPropagation();

  browser.runtime.sendMessage({ type: "OPEN_TAB", url: toYoutUbe(href) });

}, true);
