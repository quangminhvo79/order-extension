export type Address = {
  id: number
  type: 'address'
  attributes: {
    firstname: string
    lastname: string
    address1: string
    address2: string
    city: string
    zipcode: number | string
    phone: number
    state_name: string
    company: string
    country_name: string
    country_iso3: string
    country_iso: string
    label: string
    state_code: string
  }
}

export type CreateAddress = {
  firstname: string
  lastname: string
  address1: string
  address2?: string
  city: string
  phone: number
  zipcode?: number
  company?: string
  label?: string
  country_iso: string
  note?: string
  district?: string
  ward?: string
}

export type UpdateAddress = {
  firstname: string
  lastname: string
  address1: string
  address2?: string
  city: string
  phone: number
  zipcode?: number
  company?: string
  label?: string
  country_iso: string
  note?: string
  district?: string
  ward?: string
}
