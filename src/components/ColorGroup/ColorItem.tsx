import Color from "../Color.ts"
import "./ColorItem.css"

function GetTextColorBasedOn(color: Color): Color {
    const crWhite: number = Color.checkContrast(color, Color.white)
    const crBlack: number = Color.checkContrast(color, Color.black)

    return crWhite > crBlack ? Color.white : Color.black
}

interface ColorItemProps {
    color: Color
    colorSettings: Color
    index: number
    itemCount: number
    hoveredSeparator: number | null
    setHoveredSeparator: (separator: number | null) => void
    addColorHandler: (index: number) => void
}

export default function ColorItem({
    color,
    colorSettings,
    index,
    itemCount,
    hoveredSeparator,
    setHoveredSeparator,
    addColorHandler,
}: ColorItemProps) {

    const buttonRadius = 50
    const buttonPadding = (sepWidth - buttonRadius) / 2

    const leftSepIdx = index
    const rightSepIdx = index + 1

    const isLeftVisible = hoveredSeparator === leftSepIdx
    const isRightVisible = hoveredSeparator === rightSepIdx

    const tempColor = color.getColorWithSettings(colorSettings)

    return (
        <div
            className="colorCard"
            style={{
                color: GetTextColorBasedOn(tempColor).toString(),
                backgroundColor: tempColor.toString(),
                // width: width,
                // height: height
            }}>
            <div
                className="separator"
                style={{
                    width: sepWidth,
                    height: height,
                }}
                onMouseEnter={() => setHoveredSeparator(leftSepIdx)}
                onMouseLeave={() => setHoveredSeparator(null)}
            >
                <button
                    className="addColorButton"
                    style={{
                        width: `${buttonRadius}px`,
                        height: `${buttonRadius}px`,
                        borderRadius: `${buttonRadius}px`,
                        opacity: isLeftVisible ? 1 : 0,
                        ...(index > 0 && { left: `${-buttonRadius / 2}px` }),
                        ...(index == 0 && { left: `${buttonPadding}px` })
                    }}
                    onClick={(event) => {
                        addColorHandler(leftSepIdx)
                        event.currentTarget.blur()
                    }}
                >+</button>
            </div>
            <div style={{
                backgroundColor: color.toString(),
                width: width,
                height: height
            }}></div>
            <div
                className="separator"
                style={{
                    right: 0,
                    width: sepWidth,
                    height: height,
                }}
                onMouseEnter={() => setHoveredSeparator(rightSepIdx)}
                onMouseLeave={() => setHoveredSeparator(null)}
            >
                <button
                    className="addColorButton"
                    style={{
                        width: `${buttonRadius}px`,
                        height: `${buttonRadius}px`,
                        borderRadius: `${buttonRadius}px`,
                        opacity: isRightVisible ? 1 : 0,
                        ...(index < itemCount - 1 && { right: `${-buttonRadius / 2}px` }),
                        ...(index == itemCount - 1 && { right: `${buttonPadding}px` })
                    }}
                    onClick={(event) => {
                        addColorHandler(rightSepIdx)
                        event.currentTarget.blur()
                    }}
                >+</button>
            </div>
        </div>

    )

}

