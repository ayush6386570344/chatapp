import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
// import { AuthProvider } from '../usecontext/authcontext.jsx'
import { AuthProvider } from '../usecontext/authprovider.jsx'
import App from './App.jsx'
import {ChatProvider} from '../usecontext/chatcontext.jsx'
createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <AuthProvider>
  <ChatProvider>
    <App />
  </ChatProvider>
  </AuthProvider>
  </BrowserRouter>
)
