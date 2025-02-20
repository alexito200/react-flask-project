import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import { makeServer } from "./mirage/mirageServer";

if (import.meta.env.MODE === "development") {
  makeServer();
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
