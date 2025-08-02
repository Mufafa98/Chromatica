import './App.css'
import ColorGroup from "./components/ColorGroup.tsx"
import Header from './components/Header.tsx'
import SettingsSideBar from './components/SettingsSideBar.tsx'

import { useState } from 'react'

function App() {
  const [showSettings, setShowSettings] = useState<boolean>(false)
  const toggleSettings = () => {
    setShowSettings(showSettings => !showSettings)
  }
  return (
    <>
      <Header
        toggleSettings={toggleSettings}
      />
      <div style={{
        display: "flex",
        width: "100vw",
        height: "calc(100vh - 50px)",
      }}>
        {showSettings && <SettingsSideBar />}
        <ColorGroup />
      </div>
    </>
  )
}

export default App
