import Slider from "./Slider";

interface SettingsSideBarInterface {
    hue: number,
    light: number,
    saturation: number,
    setHue: (value: number) => void,
    setLight: (value: number) => void,
    setSaturation: (value: number) => void,
}

export default function SettingsSideBar({
    hue,
    setHue,
    light,
    setLight,
    saturation,
    setSaturation,
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
        hsl(${hue}, 0%, 50%),
        hsl(${hue}, 100%, 50%)
    )`
    const lightGradient = `linear-gradient(to right,
        hsl(${hue}, 100%, 0%),
        hsl(${hue}, 100%, 100%)
    )`

    return (
        <div className="SettingsSideBar" style={{ width: "300px" }}>
            General settings <br />
            Current settings
            <br />
            <Slider
                title="Hue"
                min={-180}
                max={180}
                value={hue}
                handleChange={(newVal: string) => {
                    const value = Number(newVal)
                    if (value >= -180 || value <= 180) {
                        setHue(value)
                    }
                }}
                bgGradient={hueGradient}
            />
            <Slider
                title="Saturation"
                min={-100}
                max={100}
                value={saturation}
                handleChange={(newVal: string) => {
                    const value = Number(newVal)
                    if (value >= -100 || value <= 100) {
                        setSaturation(value)
                    }
                }}
                bgGradient={saturationGradient}
            />
            <Slider
                title="Light"
                min={-100}
                max={100}
                value={light}
                handleChange={(newVal: string) => {
                    const value = Number(newVal)
                    if (value >= -100 || value <= 100) {
                        setLight(value)
                    }
                }}
                bgGradient={lightGradient}
            />
        </div>
    )
}