import './App.css'
import ColorGroup from "./components/ColorGroup/ColorGroup.tsx"
import Header from './components/Header.tsx'
import SettingsSideBar from './components/SettingsSideBar/SettingsSideBar.tsx'

import { useState } from 'react'


function App() {
  const [hue, setHue] = useState(0)
  const [saturation, setSaturation] = useState(0)
  const [light, setLight] = useState(0)
  const [showSettings, setShowSettings] = useState<boolean>(true)
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
        {showSettings && <SettingsSideBar
          hue={hue}
          setHue={setHue}
          light={light}
          setLight={setLight}
          saturation={saturation}
          setSaturation={setSaturation}
        />}
        <ColorGroup
          hue={hue}
          saturation={saturation}
          light={light}
        />
      </div>
    </>
  )
}

export default App
