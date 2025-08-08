import DividerWithText from "../DividerWithText";
import Slider from "./Slider";

import "./SettingsSideBar.css"
import { ColorSettings, PaleteSettings } from "../../App";
// import Interval from "./Interval";

interface SettingsSideBarInterface {
    paletteSettings: PaleteSettings,
    setPaletteSettings: (value: PaleteSettings) => void
    colorSettings: ColorSettings
    setColorSettings: (value: ColorSettings) => void
}

export default function SettingsSideBar({
    paletteSettings,
    setPaletteSettings,
    // colorSettings,
    // setColorSettings,
}: SettingsSideBarInterface) {

    const hueGradient = `linear-gradient(to right, 
        hsl(0, 100%, 50%),
        hsl(60, 100%, 50%),
        hsl(120, 100%, 50%),
        hsl(180, 100%, 50%),
        hsl(240, 100%, 50%),
        hsl(300, 100%, 50%),
        hsl(360, 100%, 50%)
    )`
    const saturationGradient = `linear-gradient(to right, 
        hsl(${paletteSettings.h}, 0%, 50%),
        hsl(${paletteSettings.h}, 100%, 50%)
    )`
    const lightGradient = `linear-gradient(to right,
        hsl(${paletteSettings.h}, 100%, 0%),
        hsl(${paletteSettings.h}, 100%, 100%)
    )`

    return (
        <div className="settings-side-bar">
            <div className="settings-pannel">
                <DividerWithText
                    text="Palette"
                />
                <Slider
                    title="Hue"
                    min={-180}
                    max={180}
                    value={paletteSettings.h}
                    handleChange={(newVal: string) => {
                        const value = Number(newVal)
                        if (value >= -180 && value <= 180) {
                            const newSettings = new PaleteSettings()
                            newSettings.h = value
                            newSettings.s = paletteSettings.s
                            newSettings.l = paletteSettings.l
                            setPaletteSettings(newSettings)
                        }
                    }}
                    bgGradient={hueGradient}
                />
                <Slider
                    title="Saturation"
                    min={-100}
                    max={100}
                    value={paletteSettings.s}
                    handleChange={(newVal: string) => {
                        const value = Number(newVal)
                        if (value >= -100 && value <= 100) {
                            const newSettings = new PaleteSettings()
                            newSettings.h = paletteSettings.h
                            newSettings.s = value
                            newSettings.l = paletteSettings.l
                            setPaletteSettings(newSettings)
                        }
                    }}
                    bgGradient={saturationGradient}
                />
                <Slider
                    title="Light"
                    min={-100}
                    max={100}
                    value={paletteSettings.l}
                    handleChange={(newVal: string) => {
                        const value = Number(newVal)
                        if (value >= -100 && value <= 100) {
                            const newSettings = new PaleteSettings()
                            newSettings.h = paletteSettings.h
                            newSettings.s = paletteSettings.s
                            newSettings.l = value
                            setPaletteSettings(newSettings)
                        }
                    }}
                    bgGradient={lightGradient}
                />
            </div>
            <div className="settings-pannel">
{/*                 <DividerWithText text="Color Generation" /> */}
                {/* <Interval
                    text={"Saturation"}
                    minValue={colorSettings.minSaturation}
                    maxValue={colorSettings.maxSaturation}
                    setMin={(value: number) => {
                        if (value >= 0 && value <= colorSettings.maxSaturation) {
                            const newSetting = colorSettings.clone()
                            newSetting.minSaturation = value
                            setColorSettings(newSetting)
                        }
                    }}
                    setMax={(value: number) => {
                        if (value <= 100 && value >= colorSettings.minSaturation) {
                            const newSetting = colorSettings.clone()
                            newSetting.maxSaturation = value
                            setColorSettings(newSetting)
                        }
                    }}
                /> */}
            </div>
        </div>
    )
}
