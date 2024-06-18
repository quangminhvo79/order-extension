import axios from 'axios'

const backendDomain = process.env.NODE_ENV == 'development' ? process.env.BACKEND_DEV_DOMAIN : process.env.BACKEND_DOMAIN
const storefrontURL = `${backendDomain}/api/v2/storefront`

export const storefrontAPI = axios.create({
  baseURL: storefrontURL,
  headers: {
    'Content-type': 'application/json',
  },
})

export const api = axios.create({
  baseURL: `${backendDomain}/api/v2`,
  headers: {
    'Content-type': 'application/json',
  },
})

export const authAPI = axios.create({
  baseURL: `${backendDomain}/spree_oauth`,
  headers: {
    'Content-type': 'application/json',
  },
})
