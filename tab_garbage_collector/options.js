document.addEventListener('DOMContentLoaded', () => {
  const maxTabsInput = document.getElementById('maxTabs');
  const statusElement = document.getElementById('status');

  // Load current setting
  chrome.storage.sync.get('maxTabs', (data) => {
    maxTabsInput.value = data.maxTabs || 20;
  });

  // Update setting when input changes
  maxTabsInput.addEventListener('change', () => {
    const maxTabs = parseInt(maxTabsInput.value);
    if (maxTabs >= 1 && maxTabs <= 100) {
      chrome.storage.sync.set({ maxTabs: maxTabs }, () => {
        statusElement.textContent = 'Settings saved';
        setTimeout(() => {
          statusElement.textContent = '';
        }, 2000);
      });
    } else {
      statusElement.textContent = 'Please enter a number between 1 and 100';
    }
  });
});