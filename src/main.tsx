import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// StrictMode is intentionally omitted: the ReactBits WebGL backgrounds call
// loseContext() on unmount, and StrictMode's dev double-mount would reuse the
// lost canvas context and render nothing.
createRoot(document.getElementById('root')!).render(<App />)
