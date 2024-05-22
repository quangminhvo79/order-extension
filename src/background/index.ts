import { OPEN_CART_PAGE } from '@/utils/constants'

console.log('background is running')

chrome.runtime.onMessage.addListener(async (request) => {
  if (request.action === OPEN_CART_PAGE) {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // @ts-ignore
      chrome.sidePanel.open({ tabId: tab.id })
    })
  }
})
