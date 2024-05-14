export type Customer = {
  email: string
  password: string
  firstName: string
  lastName: string
}

export type CreateCustomer = Customer & {
  selected_locale?: string
  password_confirmation?: string
  public_metadata?: object
  private_metadata?: object
}

export type AuthInfo = {
  access_token: string
  token_type: 'Bearer'
  expires_in: number
  refresh_token: string
  created_at: number
}
