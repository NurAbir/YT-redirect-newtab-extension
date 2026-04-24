// Background script (Firefox — Manifest V2, event page)
// Handles toggle state and opens new tabs on request from content script

const STORAGE_KEY = "redirectEnabled";

browser.runtime.onInstalled.addListener(() => {
  browser.storage.local.get(STORAGE_KEY).then((data) => {
    if (data[STORAGE_KEY] === undefined) {
      browser.storage.local.set({ [STORAGE_KEY]: true });
    }
  });
});

browser.runtime.onMessage.addListener((message, sender) => {
  // Content script asks: is redirect enabled?
  if (message.type === "GET_STATE") {
    return browser.storage.local.get(STORAGE_KEY).then((data) => {
      return { enabled: data[STORAGE_KEY] !== false };
    });
  }

  // Content script says: open this URL in a new tab
  if (message.type === "OPEN_TAB") {
    browser.tabs.create({
      url: message.url,
      openerTabId: sender.tab?.id
    });
    return Promise.resolve({ ok: true });
  }

  // Popup toggle
  if (message.type === "SET_STATE") {
    return browser.storage.local.set({ [STORAGE_KEY]: message.enabled }).then(() => {
      return { ok: true };
    });
  }
});
