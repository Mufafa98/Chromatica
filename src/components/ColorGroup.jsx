import { useCallback, useEffect, useState } from "react";

import ColorItem from "./ColorItem"
import ColorGenerator from "./ColorGenerator"
import AnalogGenerator from "./ColorGenerators/Analog"
import Header from "./Header";

const Harmony = Object.freeze({
    Analog: "Analog",
    Mono: "Mono"
})


const generators = {
    "Analog": new AnalogGenerator()
}

const defaultGenerator = "Analog";
const defaultNumOfColors = 5;
export default function ColorGroup(){
    const [generator, setGenerator] = useState(generators[defaultGenerator])
    const [colors, setColors] = useState(generator.generate(defaultNumOfColors, []))

    
    const handleKeyPress = useCallback((event) => {
        if (event.key === ' ')
        {
            setColors((colors) => generator.generate(colors.length, colors))
        }
    },[generator])

    const setNumOfColors = (value) => {
        if (value < colors.length) {
            let tempColors = [...colors];
            if(tempColors.length % 2 == 0){
                tempColors.splice(tempColors.length - 1, 1)
            } else {
                tempColors.splice(0, 1)
            }
            setColors(tempColors);
        } else if (value > colors.length) {
            let tempColors = colors.map(color => {
                color.lock = true;
                return color;
            });
            
            tempColors = generator.generate(value, tempColors);
            tempColors = tempColors.map(color => {
                color.lock = false;
                return color;
            });


            setColors(tempColors);
        }
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);
        return () => {
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, [handleKeyPress]);

    return (
        <div>
            <Header
                defaultGenerator={defaultGenerator}
                generators={generators}
                setGenerator={setGenerator}
                numOfColors={colors.length}
                setNumOfColors={setNumOfColors}
            />
            <div
                style={{
                    display: "flex",
                    flexDirection: "row", // Change to "column" for column layout
                }}
            >
            {
                colors.map((_, index) => 
                    <ColorItem 
                    key={index}
                    index={index}
                    windowWidth={window.innerWidth}
                    windowHeight={window.innerHeight - 100}
                    colorsRef={colors}/>
                )
            }
            </div>
        </div>
    )
}