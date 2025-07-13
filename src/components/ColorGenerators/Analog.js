
import ColorGenerator from "../ColorGenerator"
import Color from "../Color";

export default class AnalogGenerator extends ColorGenerator {
    generate(num_of_colors, colors) {
        const angleMin = 0.036;
        const angleMax = 0.076;
        function uniformRand(min, max) {
            return Math.random() * (max - min) + min;
        }
        const angle = uniformRand(angleMin, angleMax)
        function generateAnalog(baseColor, direction, angle) {
            let [h, s, l] = baseColor.toHSL();
            h = (h + direction * angle) % 1;
            let newColor = new Color();
            newColor.fromHSL(h, s, l);
            return newColor;
        }
        let baseColor = colors.find((element) => element.base);
        if (baseColor === undefined || !baseColor.lock) {
            // const r = Math.floor(Math.random() * 256);
            // const g = Math.floor(Math.random() * 256);
            // const b = Math.floor(Math.random() * 256);
            baseColor = new Color(0, 0, 0);
            // TODO better hsl generation
            const h = Math.random();
            // const l = uniformRand(0.3, 0.85);
            const l = 0.85
            const s = 0.9
            // const s = uniformRand(0.6, 1.0);
            baseColor.fromHSL(h, s, l);

            baseColor.base = true;
        }
        let generatedColors = []
        const before = Math.floor((num_of_colors - 1) / 2)
        const after = num_of_colors - before - 1;

        generatedColors = [baseColor];
        for (let i = 0; i < before; i++) {
            const newColor = generateAnalog(generatedColors[0], -1, angle);
            generatedColors.unshift(newColor);
        }
        for (let i = 0; i < after; i++) {
            const newColor = generateAnalog(generatedColors[generatedColors.length - 1], 1, angle);
            generatedColors.push(newColor);
        }

        return generatedColors

    }
}

