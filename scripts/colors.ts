import { comments } from '@antfu/eslint-config'
import util from './util'

export const colors = {
  black: '#000',
  white: '#fff',
  rose: ['#f6c4c4', '#e79a9a', '#a86464'],
  coral: ['#f4b894', '#e0926d', '#a35f3b'],
  amber: ['#efd391', '#d9b56a', '#9b7a3f'],
  cyan: ['#9ddcdc', '#6ab9b9', '#3e7f7f'],
  teal: ['#94d8b8', '#64bfa0', '#3c7b66'],
  azure: ['#a4c8f5', '#6fa8f0', '#466b9d'],
  indigo: ['#b3b5e6', '#8487d8', '#51549b'],
  moss: ['#b7d6a0', '#8ab57a', '#58774d'],
  olive: ['#d1c98c', '#aaa162', '#6e673b'],
  emerald: ['#9ce0b3', '#6ec896', '#3d825b'],
  sage: ['#c4d5c2', '#99b19a', '#667865'],
  mauve: ['#cdb2dc', '#a982c3', '#6f5590'],
  plum: ['#deb3d1', '#bd84ad', '#7e5676'],
  iris: ['#b2b1e1', '#8886c7', '#59589a'],

  soft_50: '#fff9f5',
  soft_100: '#e7e2de',
  soft_200: '#cfcac7',
  soft_300: '#b7b3b0',
  soft_400: '#9f9c99',
  soft_500: '#878583',
  soft_600: '#6f6d6c',
  soft_700: '#575655',
  soft_800: '#3f3f3e',
  soft_900: '#272727',
  soft_950: '#0f1010',
}

// [dark, light]
export const VitesseThemes = {
  // primary: ['#4d9375', '#1c6b48'],
  // primary: '#64bfa0',

  bg: [colors.soft_950, colors.soft_50],
  bgAlt: [colors.soft_900, colors.soft_100],
  bgFloat: [colors.soft_950, colors.soft_50],
  bgReversed: [colors.soft_100, colors.soft_900],
  bgHighlight: [colors.soft_400, colors.soft_600],

  fg: [colors.soft_300, colors.soft_700],
  fgMuted: [colors.soft_600, colors.soft_400],
  fgDim: [colors.soft_800, colors.soft_200],
  fgReversed: [colors.soft_900, colors.soft_100],
  fgStrong: [colors.soft_50, colors.soft_950],

  bgSelection: [colors.soft_900, colors.soft_100],
  bgCurLine: [colors.soft_900, colors.soft_100],
  bgFold: [util.blendFg(colors.soft_950, 0.8), util.blendBg(colors.soft_50, 0.8)],
  bgCurSearch: util.blendBg(colors.amber[1], 0.5),
  bgIncurSearch: util.blendBg(colors.amber[1], 0.4),
  bgSubstitue: colors.rose[1],
  bgStatusLine: [colors.soft_900, colors.soft_100],

  border: [colors.soft_600, colors.soft_400],
  borderMuted: [colors.soft_900, colors.soft_100],
  divider: [colors.soft_800, colors.soft_200],
  shadow: [colors.soft_900, colors.soft_100],

  // soft overrides
  softBg: [util.blendFg(colors.soft_950, 0.9), util.blendBg(colors.soft_50, 0.9)],
  softBgFloat: [util.blendFg(colors.soft_950, 0.9), util.blendBg(colors.soft_50, 0.9)],

  // git
  gitAdd: colors.emerald[0],
  gitDelete: colors.rose[0],
  gitChange: colors.amber[0],
  gitIgnore: [colors.soft_600, colors.soft_400],

  // diag
  diagError: colors.rose[1],
  diagWarn: colors.amber[1],
  diagInfo: colors.cyan[1],
  diagHint: colors.emerald[1],
  diagOk: colors.moss[1],

  // msg
  msgSuccess: colors.emerald[1],
  msgFailure: colors.rose[1],
  msgWarning: colors.amber[1],
  msgInfo: colors.cyan[1],

  // comments
  commentsError: colors.rose[1],
  commentsTodo: colors.iris[1],
  commentsWarning: colors.amber[1],
  commentsInfo: colors.cyan[1],
  commentsNote: colors.teal[1],
  commentsHint: colors.emerald[1],

  comment: [colors.soft_600, colors.soft_400],
  constant: colors.teal[1],
  string: [colors.soft_600, colors.soft_400],
  character: colors.cyan[1],
  number: colors.azure[1],
  boolean: colors.azure[1],
  float: colors.azure[1],
  identifier: colors.iris[1],
  func: colors.coral[1],
  statement: colors.azure[1],
  conditional: colors.azure[1],
  repeat: colors.cyan[1],
  label: [colors.soft_300, colors.soft_700],
  operator: [colors.soft_600, colors.soft_400],
  keyword: colors.teal[1],
  exception: colors.rose[1],
  preProc: colors.cyan[1],
  include: colors.cyan[1],
  define: colors.azure[1],
  macro: colors.coral[1],
  preCondit: colors.teal[1],
  type: colors.cyan[1],
  storageClass: colors.sage[1],
  structure: colors.teal[1],
  typeDef: colors.cyan[1],
  special: colors.iris[1],
  specialChar: colors.rose[1],
  tag: colors.cyan[1],
  delimiter: [colors.soft_600, colors.soft_400],
  specialComment: [colors.soft_600, colors.soft_400],
  debug: colors.rose[1],
  variable: [colors.soft_50, colors.soft_950],
  property: [colors.soft_300, colors.soft_700],
  method: [colors.soft_300, colors.soft_700],
  parameter: colors.coral[1],

  accent1: colors.teal[1],
  accent2: colors.coral[1],
} satisfies Record<string, [string, string] | string>
