console.log('background is running')

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.type === 'COUNT') {
    console.log('background has received a message from popup, and count is ', request?.count)
  }

  if (request.action === 'openSidebar') {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // @ts-ignore
      chrome.sidePanel.open({ tabId: tab.id });
    });
  }
})
