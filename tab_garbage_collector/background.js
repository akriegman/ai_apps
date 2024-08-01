let MAX_TABS = 20;

chrome.storage.sync.get('maxTabs', (data) => {
  MAX_TABS = data.maxTabs || 20;
});

chrome.storage.onChanged.addListener((changes, namespace) => {
  if (namespace === 'sync' && changes.maxTabs) {
    MAX_TABS = changes.maxTabs.newValue;
  }
});

chrome.tabs.onActivated.addListener(() => {
  updateTabs();
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === 'complete') {
    updateTabs();
  }
});

function updateTabs() {
  chrome.tabs.query({ currentWindow: true }, (tabs) => {
    if (tabs.length > MAX_TABS) {
      const tabsToClose = tabs
        .sort((a, b) => b.lastAccessed - a.lastAccessed)
        .slice(MAX_TABS);
      
      const tabIdsToClose = tabsToClose.map(tab => tab.id);
      chrome.tabs.remove(tabIdsToClose);
    }
  });
}

self.addEventListener('install', (event) => {
  self.skipWaiting();
});