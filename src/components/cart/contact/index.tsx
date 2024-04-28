import { useCallback, useEffect, useState } from 'react'
import {  Button, Table } from 'flowbite-react'
import { Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import { ContactType } from '@/components/contact-form/types'

const Contact = () => {
  const [contactData, setContact] = useState<ContactType>()
  const onChangeContact = useCallback(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // @ts-ignore
      chrome.windows.getCurrent((currentWindow) => {
        chrome.windows.create({
          url: chrome.runtime.getURL('contact.html'),
          type: 'popup',
          width: 400,
          height: 700,
          focused: true,
          tabId: tab.id,
          top: currentWindow.top,
          left: currentWindow.width ? currentWindow.width - 400 : 0,
        })
      })
    })
  }, [])

  useEffect(() => {
    const fetchContact = async () => {
      const { contact } = await chrome.storage.sync.get('contact')
      setContact(contact)
    }
    fetchContact()

    chrome.runtime.onMessage.addListener(async (request) => {
      if (request.action === 'RELOAD_CONTACT_INFO') {
        fetchContact()
      }
    })
  }, [])

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" data-testid="contact-info">
      <Table.Cell className="font-medium text-orange-500 whitespace-nowrap dark:text-white" colSpan={6} >
        <Stack className="flex-col items-start justify-start space-y-3">
          <Typography className="space-x-1 font-semibold text-orange-500">
            <LocationOnIcon />
            <span>Địa chỉ nhận hàng</span>
          </Typography>
          <Stack className="flex-row items-center ml-2 space-x-5">
            {contactData && (
              <Typography className="space-x-3 text-black">
                <span className="font-bold">{contactData.recipient} {contactData.phone}</span>
                <span>---</span>
                <span className="">{contactData.address}, {contactData.ward}, {contactData.district}, {contactData.province}</span>
              </Typography>
            )}
            <Button color="light" className="text-sky-600 border-sky-600" size="md" onClick={onChangeContact}>Thay đổi</Button>
          </Stack>
        </Stack>
      </Table.Cell>
    </Table.Row>
  )
}

export default Contact
