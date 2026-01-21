import React from 'react'
import { createRoot } from 'react-dom/client'
import './tailwind.css'
import KGCallWidget from './components/KGCallWidget'

const rootElement = document.getElementById('kg-widget-root')
if (rootElement) {
    createRoot(rootElement).render(
        <React.StrictMode>
            <KGCallWidget />
        </React.StrictMode>,
    )
}
