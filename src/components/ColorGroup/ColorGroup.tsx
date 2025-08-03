import { useCallback, useEffect, useState } from "react";

import ColorItem from "./ColorItem.tsx"
import AnalogGenerator from "../ColorGenerators/Analog.ts"
import Color from "../Color.ts"
import "./ColorGroup.css"

const generators = {
    "Analog": new AnalogGenerator()
}

const defaultGenerator = "Analog";
const defaultNumOfColors = 5;

interface ColorGroupinterface {
    hue: number,
    saturation: number,
    light: number
}

export default function ColorGroup({
    hue,
    saturation,
    light
}: ColorGroupinterface) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars 
    const [generator, _setGenerator] = useState(generators[defaultGenerator])
    const [colors, setColors] = useState(generator.generate(defaultNumOfColors, []))

    const h = (hue + 180) / 360
    const s = (saturation + 100) / 200
    const l = (light + 100) / 200

    const colorSettings = Color.fromHSL(h, s, l)

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


    const addColorHandler = (index: number) => {
        setColors(prevColors => {

            const localColors = [...prevColors]
            let averageColor: Color
            if (index == 0) {
                averageColor = Color.generateInBetween(localColors[index], Color.black, 0.8)
            } else if (index == localColors.length) {
                averageColor = Color.generateInBetween(localColors[index - 1], Color.white, 0.8)
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
                        <ColorItem
                            key={index}
                            color={colors[index]}
                            colorSettings={colorSettings}
                            index={index}
                            itemCount={colors.length}
                            hoveredSeparator={hoveredSeparator}
                            setHoveredSeparator={setHoveredSeparator}
                            addColorHandler={addColorHandler}
                        />
                    )
                })
            }
        </div>
    )
}