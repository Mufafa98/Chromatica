import './App.css'
import ColorGroup from "./components/ColorGroup/ColorGroup.tsx"
import Header from './components/Header.tsx'
import Footer from './components/Footer.tsx'
import SettingsSideBar from './components/SettingsSideBar/SettingsSideBar.tsx'

import { useState } from 'react'

export class PaleteSettings {
  h: number
  s: number
  l: number
  constructor() {
    this.h = 0
    this.s = 0
    this.l = 0
  }

  getH() {
    return (this.h + 180) / 360
  }
  getS() {
    return (this.s + 100) / 200
  }
  getL() {
    return (this.l + 100) / 200
  }
}

export class ColorSettings {
  minSaturation: number
  maxSaturation: number

  constructor() {
    this.minSaturation = 20
    this.maxSaturation = 80
  }

  clone(): ColorSettings {
    const newSettings = new ColorSettings
    newSettings.minSaturation = this.minSaturation
    newSettings.maxSaturation = this.maxSaturation
    return newSettings
  }

  getSMax() {
    return this.maxSaturation / 100
  }

  getSMin() {
    return this.minSaturation / 100
  }
}

function App() {
  const [colorSettings, setColorSettings] = useState(new ColorSettings)
  const [paletteSettings, setPaletteSettings] = useState(new PaleteSettings)
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
        {showSettings && <SettingsSideBar
          paletteSettings={paletteSettings}
          setPaletteSettings={setPaletteSettings}
          colorSettings={colorSettings}
          setColorSettings={setColorSettings}
        />}
        <ColorGroup
          paletteSettings={paletteSettings}
          colorSettings={colorSettings}
        />
      </div>
      <Footer />
    </>
  )
}

export default App
