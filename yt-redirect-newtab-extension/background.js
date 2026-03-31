// Background service worker
// Handles toggle state and opens new tabs on request from content script

const STORAGE_KEY = "redirectEnabled";

chrome.runtime.onInstalled.addListener(() => {
  chrome.storage.local.get(STORAGE_KEY, (data) => {
    if (data[STORAGE_KEY] === undefined) {
      chrome.storage.local.set({ [STORAGE_KEY]: true });
    }
  });
});

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  // Content script asks: is redirect enabled?
  if (message.type === "GET_STATE") {
    chrome.storage.local.get(STORAGE_KEY, (data) => {
      sendResponse({ enabled: data[STORAGE_KEY] !== false });
    });
    return true;
  }

  // Content script says: open this URL in a new tab
  if (message.type === "OPEN_TAB") {
    chrome.tabs.create({
      url: message.url,
      openerTabId: sender.tab?.id
    });
    return false;
  }

  // Popup toggle
  if (message.type === "SET_STATE") {
    chrome.storage.local.set({ [STORAGE_KEY]: message.enabled }, () => {
      sendResponse({ ok: true });
    });
    return true;
  }
});
