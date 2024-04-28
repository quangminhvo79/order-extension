import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProvinceData from './contact.json'

import View from './view'

type Province = {
  name: string,
  code: number,
  codename: string,
  division_type: string,
  phone_code: number,
  districts: District[],
}

type District = {
  name: string,
  code: number,
  codename: string,
  division_type: string,
  short_codename: string,
  wards: Ward[],
}

type Ward = {
  name: string,
  code: number,
  codename: string,
  division_type: string,
  short_codename: string
}

const ContactFormContainer = () => {

  const [province, setProvince] = useState<string>('')
  const [district, setDistrict] = useState<string>('')
  const [ward, setWard] = useState<string>('')
  const [address, setAddress] = useState<string>('')
  const [recipient, setRecipient] = useState<string>('')
  const [phone, setPhone] = useState<string>('')
  const [note, setNote] = useState<string>('')
  const formRef = useRef<HTMLFormElement>(null)

  const getDistrict = useCallback((province: string) => {
    const selectedProvince = ProvinceData.find((data: Province) => data.name === province) as Province
    return selectedProvince ? selectedProvince.districts.map((district) => district.name) : []
  }, [])

  const getWard = useCallback((province: string, district: string) => {
    const selectedProvince = ProvinceData.find((data: Province) => data.name === province) as Province
    const selectedDistrict = selectedProvince?.districts.find((data: District) => data.name === district) as District
    return selectedDistrict ? selectedDistrict.wards.map((ward: Ward) => ward.name) : []
  }, [])

  const provinces = useMemo(() => {
    return ProvinceData.map((province: Province) => province.name)
  }, [])

  const districts = useMemo(() => {
    if (province) {
      return getDistrict(province)
    }
    return null
  }, [getDistrict, province])

  const wards = useMemo(() => {
    if (province && district) {
      return getWard(province, district)
    }
    return null
  }, [district, getWard, province])

  const onSubmit = useCallback(() => {
    if (formRef.current?.checkValidity()) {
      chrome.storage.sync.set({
        contact: {
          province,
          district,
          ward,
          address,
          recipient,
          phone,
          note,
        },
      })
      chrome.runtime.sendMessage({ action: 'RELOAD_CONTACT_INFO' })
      chrome.windows.getCurrent((currentWindow) => {
        if (currentWindow.id) chrome.windows.remove(currentWindow.id)
      })
    }
  }, [address, district, note, phone, province, recipient, ward])

  useEffect(() => {
    const fetchContact = async () => {
      const { contact } = await chrome.storage.sync.get('contact')

      if (contact) {
        setProvince(contact.province)
        setDistrict(contact.district)
        setWard(contact.ward)
        setAddress(contact.address)
        setRecipient(contact.recipient)
        setPhone(contact.phone)
        setNote(contact.note)
      }
    }
    fetchContact()
  }, [])

  const computedProps = {
    provinces,
    districts,
    wards,
    province,
    district,
    ward,
    setProvince,
    setDistrict,
    setWard,
    address,
    recipient,
    phone,
    note,
    setAddress,
    setRecipient,
    setPhone,
    setNote,
    onSubmit,
    formRef,
  }

  return <View {...computedProps}/>
}

export default ContactFormContainer
