import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/base.css'
import './styles/components.css'
import './styles/layout.css'
import './styles/home.css'
import './styles/learn.css'
import './styles/videos.css'
import './styles/prompts.css'
// Last: interaction and atmosphere layer that refines the components above.
import './styles/tech.css'
// Theme materials for light and dark; refines everything above.
import './styles/theme.css'
// Typography system and light-mode titanium materials.
import './styles/refine.css'
import { App } from './ui/App'

createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)
