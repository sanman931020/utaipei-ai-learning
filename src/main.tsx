import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/learn.css'
import './styles/videos.css'
import './styles/prompts.css'
import { App } from './ui/App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
