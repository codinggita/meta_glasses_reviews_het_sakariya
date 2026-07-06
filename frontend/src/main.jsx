import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { HelmetProvider } from 'react-helmet-async'
import { Toaster } from 'react-hot-toast'
import './index.css'
import App from './App.jsx'
import { store } from './store/store.js'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <HelmetProvider>
        <App />
        <Toaster />
      </HelmetProvider>
    </Provider>
  </StrictMode>,
)
