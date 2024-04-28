import React from 'react'
import ReactDOM from 'react-dom/client'

import '@fontsource/roboto/300.css'
import '@fontsource/roboto/400.css'
import '@fontsource/roboto/500.css'
import '@fontsource/roboto/700.css'

import '@/styles/global.scss'
import 'react-toastify/dist/ReactToastify.css'
import ContactForm from '@/components/contact-form'

ReactDOM.createRoot(document.getElementById('app') as HTMLElement).render(
  <React.StrictMode>
    <ContactForm />
  </React.StrictMode>,
)
