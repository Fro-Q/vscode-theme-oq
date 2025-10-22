/**
 * Color utility functions - TypeScript implementation
 * Based on the Lua util.lua file
 */

export interface Palette {
  [key: string]: string | Palette
}

export interface HSLuv {
  hex_to_hsluv: (hex: string) => [number, number, number]
  hsluv_to_hex: (hsl: [number, number, number]) => string
}

export class ColorUtil {
  public static bg = '#000000'
  public static fg = '#ffffff'
  public static dayBrightness = 0.3

  /**
   * Convert hex color to RGB array
   */
  private static rgb(color: string): [number, number, number] {
    const c = color.toLowerCase()
    return [
      Number.parseInt(c.substr(1, 2), 16),
      Number.parseInt(c.substr(3, 2), 16),
      Number.parseInt(c.substr(5, 2), 16),
    ]
  }

  /**
   * Blend two colors with alpha blending
   * @param foreground - foreground color in hex format
   * @param alpha - blend amount (0-1), where 0 = background, 1 = foreground
   * @param background - background color in hex format
   */
  public static blend(foreground: string, alpha: number | string, background: string): string {
    // Convert string alpha (hex) to number
    const alphaValue = typeof alpha === 'string'
      ? Number.parseInt(alpha, 16) / 0xFF
      : alpha

    const bg = this.rgb(background)
    const fg = this.rgb(foreground)

    const blendChannel = (i: number): number => {
      const result = alphaValue * fg[i] + (1 - alphaValue) * bg[i]
      return Math.floor(Math.min(Math.max(0, result), 255) + 0.5)
    }

    return `#${blendChannel(0).toString(16).padStart(2, '0')}${blendChannel(1).toString(16).padStart(2, '0')}${blendChannel(2).toString(16).padStart(2, '0')}`
  }

  /**
   * Blend color with background
   * @param hex - color to blend
   * @param amount - blend amount (0-1)
   * @param bg - background color (optional, defaults to ColorUtil.bg)
   */
  public static blendBg(hex: string, amount: number, bg?: string): string {
    return this.blend(hex, amount, bg || this.bg)
  }

  /**
   * Alias for blendBg - darkens the color
   */
  public static darken = this.blendBg

  /**
   * Blend color with foreground
   * @param hex - color to blend
   * @param amount - blend amount (0-1)
   * @param fg - foreground color (optional, defaults to ColorUtil.fg)
   */
  public static blendFg(hex: string, amount: number, fg?: string): string {
    return this.blend(hex, amount, fg || this.fg)
  }

  /**
   * Alias for blendFg - lightens the color
   */
  public static lighten = this.blendFg

  /**
   * Make color darker by blending with black
   */
  public static darker(hex: string): string {
    return this.blendBg(hex, 0.7, '#000000')
  }

  /**
   * Make color lighter by blending with white
   */
  public static lighter(hex: string): string {
    return this.blendFg(hex, 0.7, '#ffffff')
  }

  /**
   * Highlight color based on style
   * @param hex - color to adjust
   * @param style - "dark" or "light"
   */
  public static hl(hex: string, style: 'dark' | 'light'): string {
    if (style === 'dark') {
      return this.lighter(hex)
    }
    else if (style === 'light') {
      return this.darker(hex)
    }
    else {
      console.warn(`Unknown style: ${style}`)
      return hex
    }
  }

  /**
   * Fade color based on style
   * @param hex - color to adjust
   * @param style - "dark" or "light"
   */
  public static fd(hex: string, style: 'dark' | 'light'): string {
    if (style === 'dark') {
      return this.darker(hex)
    }
    else if (style === 'light') {
      return this.lighter(hex)
    }
    else {
      console.warn(`Unknown style: ${style}`)
      return hex
    }
  }

  /**
   * Invert color using HSLuv color space
   * Requires HSLuv implementation to be provided
   * @param color - color to invert (string or Palette object)
   * @param hsluv - HSLuv implementation
   */
  public static invert<T extends string | Palette>(color: T, hsluv?: HSLuv): T {
    if (typeof color === 'object' && color !== null) {
      const result = { ...color } as Palette
      for (const [key, value] of Object.entries(result)) {
        result[key] = this.invert(value, hsluv) as any
      }
      return result as T
    }
    else if (typeof color === 'string') {
      if (!hsluv) {
        throw new Error('HSLuv implementation required for color inversion')
      }

      if (color !== 'NONE') {
        const hsl = hsluv.hex_to_hsluv(color)
        hsl[2] = 100 - hsl[2] // Invert lightness

        if (hsl[2] < 40) {
          hsl[2] = hsl[2] + (100 - hsl[2]) * this.dayBrightness
        }

        return hsluv.hsluv_to_hex(hsl) as T
      }
    }

    return color
  }

  /**
   * Brighten color by increasing lightness and saturation
   * Requires HSLuv implementation to be provided
   * @param color - hex color to brighten
   * @param lightnessAmount - amount to increase lightness (default: 0.05)
   * @param saturationAmount - amount to increase saturation (default: 0.2)
   * @param hsluv - HSLuv implementation
   */
  public static brighten(
    color: string,
    lightnessAmount: number = 0.05,
    saturationAmount: number = 0.2,
    hsluv?: HSLuv,
  ): string {
    if (!hsluv) {
      throw new Error('HSLuv implementation required for color brightening')
    }

    const hsl = hsluv.hex_to_hsluv(color)

    // Increase lightness slightly
    hsl[2] = Math.min(hsl[2] + (lightnessAmount * 100), 100)

    // Increase saturation to make color more vivid
    hsl[1] = Math.min(hsl[1] + (saturationAmount * 100), 100)

    return hsluv.hsluv_to_hex(hsl)
  }

  /**
   * Template string interpolation
   * @param str - template string with ${key} placeholders
   * @param data - object with key-value pairs for replacement
   */
  public static template(str: string, data: Record<string, any>): string {
    return str.replace(/\$\{([^}]+)\}/g, (match, key) => {
      const keys = key.split('.')
      let value = data

      for (const k of keys) {
        value = value?.[k]
        if (value === undefined) {
          return match // Return original placeholder if key not found
        }
      }

      return String(value)
    })
  }
}

/**
 * Standalone utility functions (non-class approach)
 */

export const bg = '#000000'
export const fg = '#ffffff'
export const dayBrightness = 0.3

/**
 * Convert hex color to RGB array
 */
export function rgb(color: string): [number, number, number] {
  const c = color.toLowerCase()
  return [
    Number.parseInt(c.substr(1, 2), 16),
    Number.parseInt(c.substr(3, 2), 16),
    Number.parseInt(c.substr(5, 2), 16),
  ]
}

/**
 * Blend two colors with alpha blending
 */
export function blend(foreground: string, alpha: number | string, background: string): string {
  const alphaValue = typeof alpha === 'string'
    ? Number.parseInt(alpha, 16) / 0xFF
    : alpha

  const bgRgb = rgb(background)
  const fgRgb = rgb(foreground)

  const blendChannel = (i: number): number => {
    const result = alphaValue * fgRgb[i] + (1 - alphaValue) * bgRgb[i]
    return Math.floor(Math.min(Math.max(0, result), 255) + 0.5)
  }

  return `#${blendChannel(0).toString(16).padStart(2, '0')}${blendChannel(1).toString(16).padStart(2, '0')}${blendChannel(2).toString(16).padStart(2, '0')}`
}

/**
 * Blend color with background
 */
export function blendBg(hex: string, amount: number, background?: string): string {
  return blend(hex, amount, background || bg)
}

/**
 * Blend color with foreground
 */
export function blendFg(hex: string, amount: number, foreground?: string): string {
  return blend(hex, amount, foreground || fg)
}

/**
 * Darken color (alias for blendBg)
 */
export const darken = blendBg

/**
 * Lighten color (alias for blendFg)
 */
export const lighten = blendFg

/**
 * Make color darker by blending with black
 */
export function darker(hex: string): string {
  return blendBg(hex, 0.7, '#000000')
}

/**
 * Make color lighter by blending with white
 */
export function lighter(hex: string): string {
  return blendFg(hex, 0.7, '#ffffff')
}

/**
 * Highlight color based on style
 */
export function hl(hex: string, style: 'dark' | 'light'): string {
  if (style === 'dark') {
    return lighter(hex)
  }
  else if (style === 'light') {
    return darker(hex)
  }
  else {
    console.warn(`Unknown style: ${style}`)
    return hex
  }
}

/**
 * Fade color based on style
 */
export function fd(hex: string, style: 'dark' | 'light'): string {
  if (style === 'dark') {
    return darker(hex)
  }
  else if (style === 'light') {
    return lighter(hex)
  }
  else {
    console.warn(`Unknown style: ${style}`)
    return hex
  }
}

/**
 * Invert color using HSLuv color space
 */
export function invert<T extends string | Palette>(color: T, hsluv?: HSLuv): T {
  if (typeof color === 'object' && color !== null) {
    const result = { ...color } as Palette
    for (const [key, value] of Object.entries(result)) {
      result[key] = invert(value, hsluv) as any
    }
    return result as T
  }
  else if (typeof color === 'string') {
    if (!hsluv) {
      throw new Error('HSLuv implementation required for color inversion')
    }

    if (color !== 'NONE') {
      const hsl = hsluv.hex_to_hsluv(color)
      hsl[2] = 100 - hsl[2]

      if (hsl[2] < 40) {
        hsl[2] = hsl[2] + (100 - hsl[2]) * dayBrightness
      }

      return hsluv.hsluv_to_hex(hsl) as T
    }
  }

  return color
}

/**
 * Brighten color by increasing lightness and saturation
 */
export function brighten(
  color: string,
  lightnessAmount: number = 0.05,
  saturationAmount: number = 0.2,
  hsluv?: HSLuv,
): string {
  if (!hsluv) {
    throw new Error('HSLuv implementation required for color brightening')
  }

  const hsl = hsluv.hex_to_hsluv(color)

  hsl[2] = Math.min(hsl[2] + (lightnessAmount * 100), 100)
  hsl[1] = Math.min(hsl[1] + (saturationAmount * 100), 100)

  return hsluv.hsluv_to_hex(hsl)
}

/**
 * Template string interpolation
 */
export function template(str: string, data: Record<string, any>): string {
  return str.replace(/\$\{([^}]+)\}/g, (match, key) => {
    const keys = key.split('.')
    let value = data

    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        return match
      }
    }

    return String(value)
  })
}

// Default export
export default {
  ColorUtil,
  bg,
  fg,
  dayBrightness,
  rgb,
  blend,
  blendBg,
  blendFg,
  darken,
  lighten,
  darker,
  lighter,
  hl,
  fd,
  invert,
  brighten,
  template,
}
