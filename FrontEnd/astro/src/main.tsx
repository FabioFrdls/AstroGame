import { AuthProvider } from './context/AuthContext.tsx'
import { createRoot } from 'react-dom/client'
import './index.css'
import Home from './pages/Home.tsx'

createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <Home />
  </AuthProvider>,
)
