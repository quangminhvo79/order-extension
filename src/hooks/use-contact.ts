import { useCallback, useEffect, useState } from 'react'
import { Contact } from '@/models/contact'

const useContact = () => {
  const [contact, setContact] = useState<Contact>()

  const saveContact = useCallback((contact: Contact) => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      chrome.storage.sync.set({
        contact,
      })

      console.log('save contact')
      setContact(contact)
      chrome.runtime.sendMessage({ action: 'RELOAD_CONTACT_INFO' })
    })
  }, [])

  const getContact = useCallback(async () => {
    const { contact } = await chrome.storage.sync.get('contact')
    console.log('useContact', contact)
    setContact(contact)

    return contact
  }, [])

  useEffect(() => {
    getContact()
  }, [])

  return {
    saveContact,
    getContact,
    contact,
    setContact,
  }
}

export default useContact
