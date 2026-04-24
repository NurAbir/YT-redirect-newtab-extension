// Popup script (Firefox — uses browser.* Promise API)

const toggle = document.getElementById("toggleSwitch");
const dot    = document.getElementById("statusDot");
const text   = document.getElementById("statusText");

function applyState(enabled) {
  toggle.checked = enabled;
  dot.className  = "status-dot" + (enabled ? "" : " off");
  text.textContent = enabled ? "Active — opening in new tab" : "Paused — YouTube links open normally";
}

// Load current state
browser.runtime.sendMessage({ type: "GET_STATE" }).then((res) => {
  applyState(res?.enabled !== false);
});

// User flips the switch
toggle.addEventListener("change", () => {
  const enabled = toggle.checked;
  applyState(enabled);
  browser.runtime.sendMessage({ type: "SET_STATE", enabled });
});
