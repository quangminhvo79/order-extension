import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProvinceData from './contact.json'

import View from './view'
import useContact from '@/hooks/use-contact'
import { useNavigate } from 'react-router-dom'

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

const ContactFormContainer = ({ newWindow }: { newWindow?: boolean }) => {
  const [province, setProvince] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [ward, setWard] = useState<string>()
  const [address, setAddress] = useState<string>()
  const [recipient, setRecipient] = useState<string>()
  const [phone, setPhone] = useState<string>()
  const [note, setNote] = useState<string>()
  const formRef = useRef<HTMLFormElement>(null)
  const { saveContact, contact } = useContact()
  const navigate = useNavigate()

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
      const _district = getDistrict(province)
      if (!district) setDistrict(_district[0])

      return _district
    }
    return null
  }, [district, getDistrict, province])

  const wards = useMemo(() => {
    let _wards

    if (province && district) {
      _wards = getWard(province, district)
    } else if (province && districts && districts.length > 0) {
      _wards = getWard(province, districts[0])
    }

    if (_wards) {
      if (!ward) setWard(_wards[0])
      return _wards
    }

    return null
  }, [province, district, districts, getWard, ward])

  const onSubmit = useCallback(() => {
    if (formRef.current?.checkValidity()) {
      saveContact({
        province,
        district,
        ward,
        address,
        recipient,
        phone,
        note,
      })

      if (newWindow) {
        chrome.windows.getCurrent((currentWindow) => {
          if (currentWindow.id) chrome.windows.remove(currentWindow.id)
        })
      } else {
        navigate('/')
      }
    }
  }, [address, district, navigate, newWindow, note, phone, province, recipient, saveContact, ward])

  useEffect(() => {
    if (contact) {
      setProvince(contact.province)
      setDistrict(contact.district)
      setWard(contact.ward)
      setAddress(contact.address)
      setRecipient(contact.recipient)
      setPhone(contact.phone)
      setNote(contact.note)
    }
  }, [contact])

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
