import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createContext, useState } from 'react'
import App from './App.jsx'

export const Context = createContext({isAuthenticated : false});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUSer] = useState(null);

  return (
    <Context.Provider value = {{isAuthenticated, setIsAuthenticated, user, setUSer}}>
      <App />
    </Context.Provider>
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>,
)
