import { useCallback, useEffect, useState } from "react";

import ColorItem from "./ColorItem.tsx"
import AnalogGenerator from "./ColorGenerators/Analog.ts"
import Color from "./Color.ts"
import "./ColorGroup.css"

const generators = {
    "Analog": new AnalogGenerator()
}

const defaultGenerator = "Analog";
const defaultNumOfColors = 5;
export default function ColorGroup() {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [generator, _setGenerator] = useState(generators[defaultGenerator])
    const [colors, setColors] = useState(generator.generate(defaultNumOfColors, []))

    const [hoveredSeparator, setHoveredSeparator] = useState<number | null>(null)

    const keyDownHandler = useCallback((event: KeyboardEvent) => {
        if (event.key === ' ') {
            setColors((colors) => generator.generate(colors.length, colors));
        }
    }, [generator]);
    useEffect(() => {

        document.addEventListener('keydown', keyDownHandler);
        return () => {
            document.removeEventListener('keydown', keyDownHandler);
        };
    }, [keyDownHandler]);

    const colorCardWidth = window.innerWidth / colors.length
    const colorCardHeight = window.innerHeight

    const sections = 5
    const sepWidth = colorCardWidth / sections
    const colorWidth = colorCardWidth
    const colorHeight = colorCardHeight

    const addColorHandler = (index: number) => {
        setColors(prevColors => {

            const localColors = [...prevColors]
            let averageColor = new Color(0, 0, 0)
            if (index == 0) {
                averageColor = Color.generateInBetween(new Color(0, 0, 0), localColors[index])
            } else if (index == localColors.length) {
                averageColor = Color.generateInBetween(localColors[index - 1], new Color(255, 255, 255))
            } else {
                averageColor = Color.generateInBetween(localColors[index - 1], localColors[index])
            }
            localColors.splice(index, 0, averageColor)
            return localColors
        })
    }

    return (
        <div className="colorGroup">
            {
                colors.map((_, index) => {
                    return (
                        <div style={{ display: "flex" }} key={index}>
                            <ColorItem
                                key={index}
                                color={colors[index]}
                                width={colorWidth}
                                height={colorHeight}
                                sepWidth={sepWidth}
                                index={index}
                                itemCount={colors.length}
                                hoveredSeparator={hoveredSeparator}
                                setHoveredSeparator={setHoveredSeparator}
                                addColorHandler={addColorHandler}
                            />
                        </div>
                    )
                })
            }
        </div>
    )
}