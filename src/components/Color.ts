import type { ColorSettings } from "../App"
import { uniformRand } from "../utils"

export default class Color {
    static white = new Color(255, 255, 255)
    static black = new Color(0, 0, 0)

    r: number
    g: number
    b: number
    lock: boolean
    base: boolean


    constructor(r: number, g: number, b: number) {
        this.r = r
        this.g = g
        this.b = b
        this.lock = false
        this.base = false
    }

    static random(colorSettings: ColorSettings): Color {
        const h = Math.random();
        const l = uniformRand(0.2, 0.9);
        const s = uniformRand(
            colorSettings.getSMin(),
            colorSettings.getSMax()
        );
        return Color.fromHSL(h, s, l)
    }

    static checkContrast(color1: Color, color2: Color): number {
        const l1 = color1.getRelativeLuminance()
        const l2 = color2.getRelativeLuminance()
        return (max(l1, l2) + 0.05) / (min(l1, l2) + 0.05)
    }

    static generateInBetween(color1: Color, color2: Color): Color {
        const r = (color1.r + color2.r) / 2
        const g = (color1.g + color2.g) / 2
        const b = (color1.b + color2.b) / 2
        return new Color(r, g, b)
    }

    getRelativeLuminance(): number {
        const R = linearize(this.r);
        const G = linearize(this.g);
        const B = linearize(this.b);

        return 0.2126 * R + 0.7152 * G + 0.0722 * B;
    }

    toHSL(): Array<number> {
        return rgbToHsl(this.r, this.g, this.b)
    }

    static fromHSL(h: number, s: number, l: number) {
        const [r, g, b] = hslToRgb(h, s, l);
        return new Color(r, g, b)
    }

    toString(): string {
        return `rgb(${this.r},${this.g},${this.b})`;
    }

    getColorWithSettings(settings: Color): Color {
        let [h, s, l] = this.toHSL()
        const [sh, ss, sl] = settings.toHSL()
        h = h + sh
        h = h > 1 ? h - 1 : h
        s = mapPiecewise(ss, 0.5, s, false)
        l = mapPiecewise(sl, 0.5, l, false)

        return Color.fromHSL(h, s, l)
    }
}

function mapPiecewise(m: number, split: number, nSplit: number, wrap: boolean = false): number {
    let n: number
    if (m <= split) {
        n = (m / split) * nSplit;
    } else {
        n = nSplit + ((m - split) / (1 - split)) * (1 - nSplit);
    }
    if (wrap) {
        return ((n % 1) + 1) % 1
    } else {
        return n
    }
}


/**
 * Linearize an sRGB channel value (0–255) to linear light (0–1)
 * @param {number} channel - R, G, or B value (0–255)
 * @returns {number} Linearized value (0–1)
 */
function linearize(channel: number): number {
    const srgb = channel / 255;
    return srgb <= 0.03928
        ? srgb / 12.92
        : Math.pow((srgb + 0.055) / 1.055, 2.4);
}

const { min, max, round } = Math;
/**
 * Converts an RGB color value to HSL. Conversion formula
 * adapted from http://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes r, g, and b are contained in the set [0, 255] and
 * returns h, s, and l in the set [0, 1].
 *
 * @param   {number}  r       The red color value
 * @param   {number}  g       The green color value
 * @param   {number}  b       The blue color value
 * @return  {Array}           The HSL representation
 */
function rgbToHsl(r: number, g: number, b: number): Array<number> {
    r /= 255
    g /= 255
    b /= 255
    const vmax = max(r, g, b), vmin = min(r, g, b);
    let h: number = 0
    let s: number = 0
    const l: number = (vmax + vmin) / 2;

    if (vmax === vmin) {
        return [0, 0, l]; // achromatic
    }

    const d = vmax - vmin;
    s = l > 0.5 ? d / (2 - vmax - vmin) : d / (vmax + vmin);
    if (vmax === r) h = (g - b) / d + (g < b ? 6 : 0);
    if (vmax === g) h = (b - r) / d + 2;
    if (vmax === b) h = (r - g) / d + 4;
    h /= 6;

    return [h, s, l];
}


/**
 * Converts an HSL color value to RGB. Conversion formula
 * adapted from https://en.wikipedia.org/wiki/HSL_color_space.
 * Assumes h, s, and l are contained in the set [0, 1] and
 * returns r, g, and b in the set [0, 255].
 *
 * @param   {number}  h       The hue
 * @param   {number}  s       The saturation
 * @param   {number}  l       The lightness
 * @return  {Array}           The RGB representation
 */
function hslToRgb(h: number, s: number, l: number): Array<number> {
    function hueToRgb(p: number, q: number, t: number): number {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1 / 6) return p + (q - p) * 6 * t;
        if (t < 1 / 2) return q;
        if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
        return p;
    }
    let r, g, b;

    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hueToRgb(p, q, h + 1 / 3);
        g = hueToRgb(p, q, h);
        b = hueToRgb(p, q, h - 1 / 3);
    }

    return [round(r * 255), round(g * 255), round(b * 255)];
}
