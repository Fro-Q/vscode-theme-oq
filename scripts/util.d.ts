/**
 * Type definitions for color utility functions
 */

export type HexColor = string
export type AlphaValue = number | string
export type ColorStyle = 'dark' | 'light'

export interface Palette {
  [key: string]: HexColor | Palette
}

export interface HSLuv {
  hex_to_hsluv: (hex: HexColor) => [number, number, number]
  hsluv_to_hex: (hsl: [number, number, number]) => HexColor
}

export interface ColorUtilConfig {
  bg: HexColor
  fg: HexColor
  dayBrightness: number
}

export declare class ColorUtil {
  static bg: HexColor
  static fg: HexColor
  static dayBrightness: number

  static blend(foreground: HexColor, alpha: AlphaValue, background: HexColor): HexColor
  static blendBg(hex: HexColor, amount: number, bg?: HexColor): HexColor
  static blendFg(hex: HexColor, amount: number, fg?: HexColor): HexColor
  static darken(hex: HexColor, amount: number, bg?: HexColor): HexColor
  static lighten(hex: HexColor, amount: number, fg?: HexColor): HexColor
  static darker(hex: HexColor): HexColor
  static lighter(hex: HexColor): HexColor
  static hl(hex: HexColor, style: ColorStyle): HexColor
  static fd(hex: HexColor, style: ColorStyle): HexColor
  static invert<T extends HexColor | Palette>(color: T, hsluv?: HSLuv): T
  static brighten(
    color: HexColor,
    lightnessAmount?: number,
    saturationAmount?: number,
    hsluv?: HSLuv
  ): HexColor
  static template(str: string, data: Record<string, any>): string
}

// Standalone function declarations
export declare const bg: HexColor
export declare const fg: HexColor
export declare const dayBrightness: number

export declare function rgb(color: HexColor): [number, number, number]
export declare function blend(foreground: HexColor, alpha: AlphaValue, background: HexColor): HexColor
export declare function blendBg(hex: HexColor, amount: number, background?: HexColor): HexColor
export declare function blendFg(hex: HexColor, amount: number, foreground?: HexColor): HexColor
export declare function darken(hex: HexColor, amount: number, background?: HexColor): HexColor
export declare function lighten(hex: HexColor, amount: number, foreground?: HexColor): HexColor
export declare function darker(hex: HexColor): HexColor
export declare function lighter(hex: HexColor): HexColor
export declare function hl(hex: HexColor, style: ColorStyle): HexColor
export declare function fd(hex: HexColor, style: ColorStyle): HexColor
export declare function invert<T extends HexColor | Palette>(color: T, hsluv?: HSLuv): T
export declare function brighten(
  color: HexColor,
  lightnessAmount?: number,
  saturationAmount?: number,
  hsluv?: HSLuv,
): HexColor
export declare function template(str: string, data: Record<string, any>): string

export interface ColorUtilModule {
  ColorUtil: typeof ColorUtil
  bg: HexColor
  fg: HexColor
  dayBrightness: number
  rgb: typeof rgb
  blend: typeof blend
  blendBg: typeof blendBg
  blendFg: typeof blendFg
  darken: typeof darken
  lighten: typeof lighten
  darker: typeof darker
  lighter: typeof lighter
  hl: typeof hl
  fd: typeof fd
  invert: typeof invert
  brighten: typeof brighten
  template: typeof template
}

declare const _default: ColorUtilModule
export default _default
