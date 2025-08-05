import type { ColorSettings } from "../App";
import type Color from "./Color";


export default class ColorGenerator {
    constructor() {
    }
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    generate(_num_of_colors: number, _colors: Array<Color>, _colorSettings: ColorSettings) {
        throw "Generate not implemented"
    }
}