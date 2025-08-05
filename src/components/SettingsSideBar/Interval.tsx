
interface IntervalInterface {
    text: string,
    minValue: number,
    maxValue: number,
    setMin: (value: number) => void
    setMax: (value: number) => void
}

export default function Interval({
    text,
    minValue,
    maxValue,
    setMin,
    setMax,
}: IntervalInterface) {
    return (
        <div style={{
            display: "flex",
            justifyContent: "space-between"
        }}>
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                Min
                <input
                    style={{
                        width: "50px"
                    }}
                    type="text"
                    // min={min}
                    // max={maxValue - 1}
                    value={minValue}
                    onBlur={(e) => setMin(Number(e.target.value))}
                />
            </div>
            {text}
            <div style={{
                display: "flex",
                flexDirection: "column"
            }}>
                Max
                <input
                    style={{
                        width: "50px"
                    }}

                    type="text"
                    // min={minValue + 1}
                    // max={max}
                    value={maxValue}
                    onBlur={(e) => setMax(Number(e.target.value))}
                />
            </div>
        </div>
    )
    // TODO FINISH ONBLUE/ONCHANGE/ONCLICK?????? nu merge update corect
}