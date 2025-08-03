
interface SliderInterface {
    title: string,
    min: number,
    max: number,
    value: number,
    bgGradient?: string
    handleChange: (value: string) => void
}

export default function Slider({
    title,
    min,
    max,
    value,
    handleChange,
    bgGradient
}: SliderInterface) {
    return (
        <div style={{
            display: "flex",
            flexDirection: "column",
            margin: "10px"
        }}>
            <div style={{
                display: "flex",
                justifyContent: "space-between"
            }}>
                {title}
                <input
                    type="number"
                    value={value}
                    min={min}
                    max={max}
                    onChange={(e) => handleChange(e.target.value)}
                />
            </div>
            <input
                type="range"
                value={value}
                min={min}
                max={max}
                onChange={(e) => handleChange(e.target.value)}
                style={bgGradient ? {
                    appearance: "none",
                    height: "8px",
                    borderRadius: "4px",
                    outline: "none",
                    background: bgGradient
                } : {}}
            />
        </div>
    )
}