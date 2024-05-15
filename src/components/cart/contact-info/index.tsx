import { useCallback, useEffect, useMemo } from 'react'
import {  Button, Table } from 'flowbite-react'
import { Stack, Typography } from '@mui/material'
import LocationOnIcon from '@mui/icons-material/LocationOn'
import useAddress from '@/hooks/use-address'

const ContactInfo = () => {
  const {
    addresses,
    refetchAddresses,
  } = useAddress()

  const address = useMemo(() => {
    return addresses && addresses[0]
  }, [addresses])

  const onChangeContact = useCallback(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, ([tab]) => {
      // @ts-ignore
      chrome.windows.getCurrent((currentWindow) => {
        new Promise((resolve) => {
          chrome.windows.create({
            url: chrome.runtime.getURL('popup.html#/create_contact_on_new_window'),
            type: 'popup',
            width: 500,
            height: 950,
            focused: true,
            tabId: tab.id,
            top: currentWindow.top,
            left: currentWindow.width ? currentWindow.width - 400 : 0,
          }).then((window: any) => {
            resolve(window)
          })
        })
      })
    })
  }, [])

  useEffect(() => {
    chrome.runtime.onMessage.addListener(async (request) => {
      if (request.action === 'RELOAD_CONTACT_INFO') {
        refetchAddresses()
      }
    })
  }, [refetchAddresses])

  return (
    <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800" data-testid="contact-info">
      <Table.Cell className="font-medium text-orange-500 whitespace-nowrap dark:text-white" colSpan={6} >
        <Stack className="flex-col items-start justify-start space-y-3">
          <Typography className="space-x-1 font-semibold text-orange-500">
            <LocationOnIcon />
            <span>Địa chỉ nhận hàng</span>
          </Typography>
          <Stack className="flex-row items-center ml-2 space-x-5">
            {address && (
              <Typography className="text-black">
                <span className="font-bold">{address.attributes.firstname} {address.attributes.lastname} -- {address.attributes.phone}</span>
                <Typography className="space-x-1">
                  <span>{address.attributes.address1},</span>
                  <span>{address.attributes.ward},</span>
                  <span>{address.attributes.district},</span>
                  <span>{address.attributes.city},</span>
                  <span>{address.attributes.country_iso}</span>
                </Typography>
              </Typography>
            )}
            <Button color="light" className="text-sky-600 border-sky-600" size="md" onClick={onChangeContact}>Thay đổi</Button>
          </Stack>
        </Stack>
      </Table.Cell>
    </Table.Row>
  )
}

export default ContactInfo
