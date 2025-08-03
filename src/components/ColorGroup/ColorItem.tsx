import Color from "../Color.ts"
import "./ColorItem.css"
import ColorCardSeparator from "./ColorCardSep.tsx"

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
            <ColorCardSeparator
                scale={isLeftVisible ? 1 : 0}
                left={true}
                edge={index == 0}
                onMouseEnter={() => { setHoveredSeparator(leftSepIdx) }}
                onMouseLeave={() => { setHoveredSeparator(null) }}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    addColorHandler(leftSepIdx)
                    event.currentTarget.blur()
                }}
            />
            <ColorCardSeparator
                scale={isRightVisible ? 1 : 0}
                left={false}
                edge={index == itemCount - 1}
                onMouseEnter={() => { setHoveredSeparator(rightSepIdx) }}
                onMouseLeave={() => { setHoveredSeparator(null) }}
                onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                    addColorHandler(rightSepIdx)
                    event.currentTarget.blur()
                }}
            />
        </div>

    )

}

