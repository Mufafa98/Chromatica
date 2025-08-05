
import ColorGenerator from "../ColorGenerator"
import Color from "../Color";
import { uniformRand } from "../../utils";
import type { ColorSettings } from "../../App";

export default class AnalogGenerator extends ColorGenerator {
    constructor() {
        super()
    }

    generateAnalog(baseColor: Color, direction: number, angle: number) {
        // eslint-disable-next-line prefer-const
        let [h, s, l] = baseColor.toHSL()
        h = (h + direction * angle) % 1
        return Color.fromHSL(h, s, l)
    }
    generate(num_of_colors: number, colors: Array<Color>, colorSettings: ColorSettings) {
        const angleMin = 0.036;
        const angleMax = 0.076;
        const angle = uniformRand(angleMin, angleMax)
        let baseColor = colors.find((element) => element.base);
        if (baseColor === undefined || !baseColor.lock) {
            baseColor = Color.random(colorSettings)
            baseColor.base = true;
        }
        let generatedColors = []
        const before = Math.floor((num_of_colors - 1) / 2)
        const after = num_of_colors - before - 1;

        generatedColors = [baseColor];
        for (let i = 0; i < before; i++) {
            const newColor = this.generateAnalog(generatedColors[0], -1, angle);
            generatedColors.unshift(newColor);
        }
        for (let i = 0; i < after; i++) {
            const newColor = this.generateAnalog(generatedColors[generatedColors.length - 1], 1, angle);
            generatedColors.push(newColor);
        }
        return generatedColors

    }
}

