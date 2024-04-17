import React from 'react'
import { createRoot } from 'react-dom/client';
import { NewTab } from '../newtab/NewTab';

const body = document.querySelector('body')
const app = document.createElement('div')

app.id = 'react-root'

if (body && document.location.hostname === 'www.google.com') {
  body.prepend(app)
}

createRoot(document.getElementById('react-root') as HTMLElement).render(
  <React.StrictMode>
    <NewTab />
  </React.StrictMode>,
)

console.info('Order Extension Loaded')

