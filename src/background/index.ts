console.log('background is running')

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }

  // Check if the message is to open the sidebar
  if (request.action === 'openSidebar') {
    // Open the sidebar (example: open a new window)
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.sidePanel.open({ tabId: tab.id });
    });
  }
})
