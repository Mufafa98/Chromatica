
interface ColorCardSepProp {
    scale: number,
    left: boolean,
    edge: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

const buttonRadius = 50
const buttonPadding = 4

export default function ColorCardSeparator({
    scale,
    left,
    edge,
    onMouseEnter,
    onMouseLeave,
    onClick
}: ColorCardSepProp) {
    const padding = `${edge ? buttonPadding : -buttonRadius / 2}px`

    return (
        <div
            className="separator"
            style={
                left ? { left: 0 } : { right: 0 }
            }
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            <button
                className="addColorButton"
                style={{
                    width: `${buttonRadius}px`,
                    height: `${buttonRadius}px`,
                    borderRadius: `${buttonRadius}px`,
                    scale,
                    ...(left ? { left: padding } : { right: padding })
                }}
                onClick={onClick}
            >+</button>
        </div >)
}