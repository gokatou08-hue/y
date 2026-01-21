chrome.action.onClicked.addListener(async tab => {
  const data = await chrome.storage.local.get("enabled");
  const enabled = data.enabled !== false; // デフォルトON

  await chrome.storage.local.set({ enabled: !enabled });

  // ページをリロードして即反映
  chrome.tabs.reload(tab.id);
});
