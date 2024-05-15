import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import ProvinceData from './contact.json'

import View from './view'
// import useContact from '@/hooks/use-contact'
import { useNavigate } from 'react-router-dom'
import useAddress from '@/hooks/use-address'

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
  const [address1, setAddress1] = useState<string>()
  const [address2, setAddress2] = useState<string>()
  const [companyName, setCompanyName] = useState<string>()
  const [firstname, setFirstname] = useState<string>()
  const [lastname, setLastname] = useState<string>()
  const [city, setCity] = useState<string>()
  const [phone, setPhone] = useState<number>()
  const [zipcode, setZipcode] = useState<string>()
  const [countryIso, setCountryIso] = useState<string>()
  const [label, setLabel] = useState<string>()
  const [note, setNote] = useState<string>()
  const [district, setDistrict] = useState<string>()
  const [ward, setWard] = useState<string>()
  const [error, setError] = useState<string>()

  const formRef = useRef<HTMLFormElement>(null)
  const {
    addresses,
    createAddress,
    updateAddress,
  } = useAddress()

  const address = useMemo(() => addresses && addresses[0], [addresses])
  const navigate = useNavigate()

  const getDistrict = useCallback((city: string) => {
    const selectedProvince = ProvinceData.find((data: Province) => data.name === city) as Province
    return selectedProvince ? selectedProvince.districts.map((district) => district.name) : []
  }, [])

  const getWard = useCallback((city: string, district: string) => {
    const selectedProvince = ProvinceData.find((data: Province) => data.name === city) as Province
    const selectedDistrict = selectedProvince?.districts.find((data: District) => data.name === district) as District
    return selectedDistrict ? selectedDistrict.wards.map((ward: Ward) => ward.name) : []
  }, [])

  const cities = useMemo(() => {
    return ProvinceData.map((city: Province) => city.name)
  }, [])

  const districts = useMemo(() => {
    if (city) {
      const _district = getDistrict(city)
      if (!district) setDistrict(_district[0])

      return _district
    }
    return null
  }, [district, getDistrict, city])

  const wards = useMemo(() => {
    let _wards

    if (city && district) {
      _wards = getWard(city, district)
    } else if (city && districts && districts.length > 0) {
      _wards = getWard(city, districts[0])
    }

    if (_wards) {
      if (!ward) setWard(_wards[0])
      return _wards
    }

    return null
  }, [city, district, districts, getWard, ward])

  const buildAddress = useMemo(() => {
    if (!firstname || !lastname || !address1 || !city || !phone || !district) return null

    return {
      firstname,
      lastname,
      company: companyName,
      address1: [address1, ward].filter(Boolean).join(', '),
      address2,
      city,
      phone,
      state_name: district,
      country_iso: 'VN',
      label,
      zipcode: 650000,
      note,
    }
  }, [
    address1,
    address2,
    city,
    companyName,
    district,
    firstname,
    label,
    lastname,
    phone,
    ward,
    note,
  ])

  const [invalid, setInvalid] = useState(false)

  const onSubmit = useCallback(async () => {
    if (formRef.current?.checkValidity() && buildAddress) {
      console.log('buildAddress', buildAddress)
      console.log('addresses', addresses)
      let response = null
      if (Boolean(addresses.length)) {
        response = await updateAddress(buildAddress, addresses[0].id)
      } else {
        response = await createAddress(buildAddress)
      }

      console.log('response', response)
      if (response?.statusCode === 401) setError('Vui lòng đăng nhập để thực hiện chức năng này')
    } else {
      setInvalid(true)
    }
  }, [addresses, buildAddress, createAddress, updateAddress])

  const onBack = useCallback(() => {
    navigate('/')
  }, [navigate])

  useEffect(() => {
    if (address) {
      setAddress1(address.attributes.address1)
      setAddress2(address.attributes.address2)
      setCompanyName(address.attributes.company)
      setFirstname(address.attributes.firstname)
      setLastname(address.attributes.lastname)
      setCity(address.attributes.city)
      setPhone(address.attributes.phone)
      setZipcode(address.attributes.zipcode)
      setDistrict(address.attributes.state_name)
      setCountryIso(address.attributes.country_iso)
      setLabel(address.attributes.label)
      setNote(address.attributes.note)
    }
  }, [address])

  const computedProps = {
    cities,
    districts,
    wards,
    city,
    district,
    ward,
    firstname,
    lastname,
    address1,
    address2,
    phone,
    companyName,
    zipcode,
    countryIso,
    label,
    note,
    setAddress1,
    setAddress2,
    setFirstname,
    setLastname,
    setCompanyName,
    setLabel,
    setPhone,
    setCity,
    setDistrict,
    setWard,
    setNote,
    onSubmit,
    onBack,
    formRef,
    invalid,
    error,
  }

  return <View {...computedProps}/>
}

export default ContactFormContainer
