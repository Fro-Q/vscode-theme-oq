import type { GetThemeOptions } from './helper'
import { read } from 'node:fs'
import { stringify } from 'node:querystring'
import { deprecate } from 'node:util'
import { toArray } from '@antfu/utils'
import { VitesseThemes } from './colors'
import { createThemeHelpers } from './helper'

export default function getTheme(options: GetThemeOptions) {
  const {
    pick,
    v,
    colors,
  } = createThemeHelpers(options)

  const theme = {
    name: options.name,
    base: pick({ light: 'vs', dark: 'vs-dark' }),
    colors: {
      'focusBorder': v('border'),
      'foreground': v('fg'),
      'descriptionForeground': v('fgMuted'),
      'errorForeground': v('diagError'),

      'textLink.foreground': v('accent1'),
      'textLink.activeForeground': v('accent1'),
      'textBlockQuote.background': v('bg'),
      'textBlockQuote.border': v('borderMuted'),
      'textCodeBlock.background': v('bg'),
      'textPreformat.foreground': v('fgMuted'),
      'textSeparator.foreground': v('fgMuted'),

      'button.background': v('bgReversed'),
      'button.foreground': v('fgReversed'),
      'button.hoverBackground': v('bgReversed'),

      'checkbox.background': v('bg'),
      // 'checkbox.border': pick({ light: colors.gray[3], dark: colors.gray[1] }),
      'checkbox.border': v('borderMuted'),

      'dropdown.background': v('bg'),
      'dropdown.border': v('borderMuted'),
      'dropdown.foreground': v('fg'),
      'dropdown.listBackground': v('bg'),

      'input.background': v('bg'),
      'input.border': v('borderMuted'),
      'input.foreground': v('fg'),
      'input.placeholderForeground': v('fgMuted'),
      'inputOption.activeBackground': v('bgAlt'),

      'badge.foreground': v('fgReversed'),
      'badge.background': v('bgReversed'),

      'progressBar.background': v('accent1'),

      'titleBar.activeForeground': v('fgStrong'),
      'titleBar.activeBackground': v('bg'),
      'titleBar.inactiveForeground': v('fgMuted'),
      'titleBar.inactiveBackground': v('bg'),
      'titleBar.border': v('borderMuted'),

      'activityBar.foreground': v('fg'),
      'activityBar.inactiveForeground': v('fgMuted'),
      'activityBar.background': v('bg'),
      'activityBarBadge.foreground': v('fgReversed'),
      'activityBarBadge.background': v('bgReversed'),
      'activityBar.activeBorder': v('accent1'),
      'activityBar.border': v('borderMuted'),

      'sideBar.foreground': v('fg'),
      'sideBar.background': v('bgFloat'),
      'sideBar.border': v('borderMuted'),
      'sideBarTitle.foreground': v('fgStrong'),
      'sideBarSectionHeader.foreground': v('fgStrong'),
      'sideBarSectionHeader.background': v('bgAlt'),
      'sideBarSectionHeader.border': v('borderMuted'),

      'list.hoverForeground': v('fg'),
      'list.inactiveSelectionForeground': v('fgMuted'),
      'list.activeSelectionForeground': v('fgStrong'),
      'list.hoverBackground': v('bgSelection'),
      'list.inactiveSelectionBackground': v('bg'),
      'list.activeSelectionBackground': v('bgAlt'),
      'list.inactiveFocusBackground': v('bg'),
      'list.focusBackground': v('bgAlt'),
      'list.highlightForeground': v('fg'),

      'tree.indentGuidesStroke': v('divider'),

      'notificationCenterHeader.foreground': v('fgStrong'),
      'notificationCenterHeader.background': v('bg'),
      'notifications.foreground': v('fg'),
      'notifications.background': v('bg'),
      'notifications.border': v('borderMuted'),
      'notificationsErrorIcon.foreground': v('diagError'),
      'notificationsWarningIcon.foreground': v('diagWarn'),
      'notificationsInfoIcon.foreground': v('diagInfo'),

      'pickerGroup.border': v('borderMuted'),
      'pickerGroup.foreground': v('fg'),
      'quickInput.background': v('bg'),
      'quickInput.foreground': v('fg'),
      'quickInputList.focusBackground': v('bgAlt'),

      'statusBar.foreground': v('fg'),
      'statusBar.background': v('bgStatusLine'),
      'statusBar.border': v('bg'),
      'statusBar.noFolderBackground': v('bg'),
      'statusBar.debuggingBackground': v('bg'),
      'statusBar.debuggingForeground': v('fg'),
      'statusBarItem.prominentBackground': v('bgAlt'),

      'editorGroupHeader.tabsBackground': v('bg'),
      'editorGroupHeader.tabsBorder': v('borderMuted'),
      'editorGroup.border': v('borderMuted'),

      'tab.activeForeground': v('fgStrong'),
      'tab.inactiveForeground': v('fgMuted'),
      'tab.inactiveBackground': v('bg'),
      'tab.activeBackground': v('bg'),
      'tab.hoverBackground': v('bgAlt'),
      'tab.unfocusedHoverBackground': v('bg'),
      'tab.border': v('borderMuted'),
      'tab.unfocusedActiveBorderTop': v('borderMuted'),
      'tab.activeBorder': v('borderMuted'),
      'tab.unfocusedActiveBorder': v('borderMuted'),
      'tab.activeBorderTop': v('fgStrong'),

      'breadcrumb.foreground': v('fgMuted'),
      'breadcrumb.focusForeground': v('fg'),
      'breadcrumb.background': v('bg'),
      'breadcrumb.activeSelectionForeground': v('fgStrong'),
      'breadcrumbPicker.background': v('bg'),

      'editor.foreground': v('fg'),
      'editor.background': v('bg'),
      'editorWidget.background': v('bg'),
      'editor.foldBackground': v('bgFold'),
      'editor.lineHighlightBackground': v('bgAlt'),
      'editorLineNumber.foreground': v('fgMuted'),
      'editorLineNumber.activeForeground': v('fgStrong'),
      'editorIndentGuide.background': v('divider'),
      'editorIndentGuide.activeBackground': v('fgMuted'),
      'editorWhitespace.foreground': v('fgDim'),
      'editorCursor.foreground': v('fg'),

      'editor.findMatchBackground': v('bgCurSearch'),
      'editor.findMatchHighlightBackground': v('bgIncurSearch'),
      'editor.inactiveSelectionBackground': v('bgSelection'),
      'editor.selectionBackground': v('bgSelection'),
      'editor.selectionHighlightBackground': v('bgSelection'),
      'editor.wordHighlightBackground': v('bgSelection'),
      'editor.wordHighlightStrongBackground': v('bgSelection'),
      'editorBracketMatch.background': v('bg'),

      'diffEditor.insertedTextBackground': v('gitAdd', '22'),
      'diffEditor.removedTextBackground': v('gitDelete', '22'),

      'scrollbar.shadow': v('shadow'),
      'scrollbarSlider.background': v('bgAlt'),
      'scrollbarSlider.hoverBackground': v('bgAlt'),
      'scrollbarSlider.activeBackground': v('bgAlt'),
      'editorOverviewRuler.border': v('borderMuted'),

      'panel.background': v('bg'),
      'panel.border': v('borderMuted'),
      'panelTitle.activeBorder': v('fgStrong'),
      'panelTitle.activeForeground': v('fgStrong'),
      'panelTitle.inactiveForeground': v('fgMuted'),
      'panelInput.border': v('borderMuted'),

      'terminal.foreground': v('fg'),
      'terminal.selectionBackground': v('bgSelection'),
      'terminal.ansiBrightBlack': v('bgAlt'),
      'terminal.ansiBrightBlue': colors.azure[0],
      'terminal.ansiBrightCyan': colors.cyan[0],
      'terminal.ansiBrightGreen': colors.emerald[0],
      'terminal.ansiBrightMagenta': colors.plum[0],
      'terminal.ansiBrightRed': colors.rose[0],
      'terminal.ansiBrightWhite': v('fgStrong'),
      'terminal.ansiBrightYellow': colors.amber[0],
      'terminal.ansiBlack': v('bg'),
      'terminal.ansiBlue': colors.azure[1],
      'terminal.ansiCyan': colors.cyan[1],
      'terminal.ansiGreen': colors.emerald[1],
      'terminal.ansiMagenta': colors.plum[1],
      'terminal.ansiRed': colors.rose[1],
      'terminal.ansiWhite': v('fgStrong'),
      'terminal.ansiYellow': colors.amber[1],

      'gitDecoration.addedResourceForeground': v('gitAdd'),
      'gitDecoration.modifiedResourceForeground': v('gitChange'),
      'gitDecoration.deletedResourceForeground': v('gitDelete'),
      'gitDecoration.untrackedResourceForeground': v('gitIgnore'),
      'gitDecoration.ignoredResourceForeground': v('gitIgnore'),
      'gitDecoration.conflictingResourceForeground': v('diagWarn'),
      'gitDecoration.submoduleResourceForeground': v('fg'),

      'editorGutter.modifiedBackground': v('gitChange'),
      'editorGutter.addedBackground': v('gitAdd'),
      'editorGutter.deletedBackground': v('gitDelete'),

      'editorBracketHighlight.foreground1': colors.rose[1],
      'editorBracketHighlight.foreground2': colors.coral[1],
      'editorBracketHighlight.foreground3': colors.amber[1],
      'editorBracketHighlight.foreground4': colors.moss[1],
      'editorBracketHighlight.foreground5': colors.cyan[1],
      'editorBracketHighlight.foreground6': colors.iris[1],
      'editorBracketHighlight.foreground7': colors.plum[1],

      'debugToolBar.background': v('bg'),
      'editor.stackFrameHighlightBackground': v('bg'),
      'editor.focusedStackFrameHighlightBackground': v('bg'),

      'peekViewEditor.matchHighlightBackground': v('bgCurSearch'),
      'peekViewResult.matchHighlightBackground': v('bgCurSearch'),
      'peekViewEditor.background': v('bg'),
      'peekViewResult.background': v('bg'),

      'settings.headerForeground': v('fg'),
      'settings.modifiedItemIndicator': v('accent1'),
      'welcomePage.buttonBackground': v('fgMuted'),
      'welcomePage.buttonHoverBackground': v('fg'),

      'problemsErrorIcon.foreground': v('diagError'),
      'problemsWarningIcon.foreground': v('diagWarn'),
      'problemsInfoIcon.foreground': v('diagInfo'),

      'editorError.foreground': v('diagError'),
      'editorWarning.foreground': v('diagWarn'),
      'editorInfo.foreground': v('diagInfo'),
      'editorHint.foreground': v('diagHint'),

      'editorGutter.commentRangeForeground': v('fgMuted'),
      'editorGutter.foldingControlForeground': v('fgMuted'),

      'editorInlayHint.foreground': v('fgMuted'),
      'editorInlayHint.background': v('bg'),

      'editorStickyScroll.background': v('bg'),
      'editorStickyScrollHover.background': v('bgAlt'),

      'menu.separatorBackground': v('divider'),
    },
    semanticHighlighting: true,
    semanticTokenColors: {
      component: v('define'),
      namespace: v('include'),
      class: v('type'),
      enum: v('type'),
      interface: v('type'),
      struct: v('type'),
      typeParameter: v('define'),
      type: v('type'),
      parameter: v('parameter'),
      variable: v('variable'),
      property: v('property'),
      enumMember: v('constant'),
      decorator: v('preProc'),
      event: v('func'),
      function: v('func'),
      method: v('method'),
      macro: v('macro'),
      label: v('label'),
      comment: v('comment'),
      string: v('string'),
      keyword: v('keyword'),
      number: v('number'),
      regexp: v('specialChar'),
      operator: v('operator'),
      declaration: v('define'),
      definition: v('define'),
      readonly: v('constant'),
      static: v('constant'),
      deprecated: v('comment'),
      abstract: v('type'),
      async: v('keyword'),
      modification: v('variable'),
      documentation: v('comment'),
      defaultLibrary: v('type'),
    },
    tokenColors: [
      {
        scope: [
          'comment',
          'punctuation.definition.comment',
          'string.comment',
        ],
        settings: {
          foreground: v('comment'),
        },
      },
      {
        scope: [
          'delimiter.bracket',
          'delimiter',
          'invalid.illegal.character-not-allowed-here.html',
          'keyword.operator.rest',
          'keyword.operator.spread',
          'keyword.operator.type.annotation',
          'keyword.operator.relational',
          'keyword.operator.assignment',
          'keyword.operator.type',
          'meta.brace',
          'meta.tag.block.any.html',
          'meta.tag.inline.any.html',
          'meta.tag.structure.input.void.html',
          'meta.type.annotation',
          'meta.embedded.block.github-actions-expression',
          'storage.type.function.arrow',
          'meta.objectliteral.ts',
          'punctuation',
          'punctuation.definition.string.begin.html.vue',
          'punctuation.definition.string.end.html.vue',
        ],
        settings: {
          foreground: v('delimiter'),
        },
      },
      {
        scope: [
          'constant',
          'entity.name.constant',
          'variable.language',
          'meta.definition.variable',
        ],
        settings: {
          foreground: v('constant'),
        },
      },
      {
        scope: ['entity', 'entity.name'],
        settings: {
          foreground: v('variable'),
        },
      },
      {
        scope: 'variable.parameter.function',
        settings: {
          foreground: v('func'),
        },
      },
      {
        scope: [
          'entity.name.tag',
          'tag.html',
        ],
        settings: {
          foreground: v('tag'),
        },
      },
      {
        scope: 'entity.name.function',
        settings: {
          foreground: v('func'),
        },
      },
      {
        scope: [
          'keyword',
          'storage.type.class.jsdoc',
          'punctuation.definition.template-expression',
        ],
        settings: {
          foreground: v('keyword'),
        },
      },
      {
        scope: [
          'storage',
          'storage.type',
          'support.type.builtin',
          'constant.language.undefined',
          'constant.language.null',
          'constant.language.import-export-all.ts',
        ],
        settings: {
          foreground: v('storageClass'),
        },
      },
      {
        scope: [
          'text.html.derivative',
          'storage.modifier.package',
          'storage.modifier.import',
          'storage.type.java',
        ],
        settings: {
          foreground: v('fg'),
        },
      },
      {
        scope: [
          'string',
          'string punctuation.section.embedded source',
          'attribute.value',
        ],
        settings: {
          foreground: v('string'),
        },
      },
      {
        scope: [
          'punctuation.definition.string',
        ],
        settings: {
          foreground: v('string'),
        },
      },
      {
        scope: [
          'punctuation.support.type.property-name',
        ],
        settings: {
          foreground: v('property'),
        },
      },
      {
        scope: 'support',
        settings: {
          foreground: v('property'),
        },
      },
      {
        scope: [
          'property',
          'meta.property-name',
          'meta.object-literal.key',
          'entity.name.tag.yaml',
          'attribute.name',
        ],
        settings: {
          foreground: v('property'),
        },
      },
      {
        scope: [
          'entity.other.attribute-name',
          'invalid.deprecated.entity.other.attribute-name.html',
        ],
        settings: {
          foreground: v('delimiter'),
        },
      },
      {
        scope: [
          'variable',
          'identifier',
        ],
        settings: {
          foreground: v('variable'),
        },
      },
      {
        scope: [
          'support.type.primitive',
          'entity.name.type',
        ],
        settings: {
          foreground: v('type'),
        },
      },
      {
        scope: 'namespace',
        settings: {
          foreground: v('include'),
        },
      },
      {
        scope: [
          'keyword.operator',
          'keyword.operator.assignment.compound',
          'meta.var.expr.ts',
        ],
        settings: {
          foreground: v('operator'),
        },
      },
      {
        scope: 'invalid.broken',
        settings: {
          fontStyle: 'italic',
          foreground: v('diagError'),
        },
      },
      {
        scope: 'invalid.deprecated',
        settings: {
          fontStyle: 'italic',
          foreground: v('diagError'),
        },
      },
      {
        scope: 'invalid.illegal',
        settings: {
          fontStyle: 'italic',
          foreground: v('diagError'),
        },
      },
      {
        scope: 'invalid.unimplemented',
        settings: {
          fontStyle: 'italic',
          foreground: v('diagError'),
        },
      },
      {
        scope: 'carriage-return',
        settings: {
          fontStyle: 'italic underline',
          background: v('diagError', '22'),
          foreground: v('fg'),
          content: '^M',
        },
      },
      {
        scope: 'message.error',
        settings: {
          foreground: v('msgFailure'),
        },
      },
      {
        scope: 'string variable',
        settings: {
          foreground: v('string'),
        },
      },
      {
        scope: [
          'source.regexp',
          'string.regexp',
        ],
        settings: {
          foreground: v('specialChar'),
        },
      },
      {
        scope: [
          'string.regexp.character-class',
          'string.regexp constant.character.escape',
          'string.regexp source.ruby.embedded',
          'string.regexp string.regexp.arbitrary-repitition',
        ],
        settings: {
          foreground: v('string'),
        },
      },
      {
        scope: 'string.regexp constant.character.escape',
        settings: {
          foreground: v('specialChar'),
        },
      },
      {
        scope: [
          'support.constant',
        ],
        settings: {
          foreground: v('constant'),
        },
      },
      {
        scope: [
          'keyword.operator.quantifier.regexp',
          'constant.numeric',
          'number',
        ],
        settings: {
          foreground: v('number'),
        },
      },
      {
        scope: [
          'keyword.other.unit',
        ],
        settings: {
          foreground: v('keyword'),
        },
      },
      {
        scope: [
          'constant.language.boolean',
          'constant.language',
        ],
        settings: {
          foreground: v('boolean'),
        },
      },
      {
        scope: 'meta.module-reference',
        settings: {
          foreground: v('type'),
        },
      },
      {
        scope: 'punctuation.definition.list.begin.markdown',
        settings: {
          foreground: v('delimiter'),
        },
      },
      {
        scope: ['markup.heading', 'markup.heading entity.name'],
        settings: {
          fontStyle: 'bold',
          foreground: v('fgStrong'),
        },
      },
      {
        scope: 'markup.quote',
        settings: {
          foreground: v('type'),
        },
      },
      {
        scope: 'markup.italic',
        settings: {
          fontStyle: 'italic',
          foreground: v('fg'),
        },
      },
      {
        scope: 'markup.bold',
        settings: {
          fontStyle: 'bold',
          foreground: v('fg'),
        },
      },
      {
        scope: 'markup.raw',
        settings: {
          foreground: v('string'),
        },
      },
      {
        scope: [
          'markup.deleted',
          'meta.diff.header.from-file',
          'punctuation.definition.deleted',
        ],
        settings: {
          background: v('gitDelete', '22'),
          foreground: v('gitDelete'),
        },
      },
      {
        scope: [
          'markup.inserted',
          'meta.diff.header.to-file',
          'punctuation.definition.inserted',
        ],
        settings: {
          background: v('gitAdd', '22'),
          foreground: v('gitAdd'),
        },
      },
      {
        scope: ['markup.changed', 'punctuation.definition.changed'],
        settings: {
          background: v('gitChange', '22'),
          foreground: v('gitChange'),
        },
      },
      {
        scope: ['markup.ignored', 'markup.untracked'],
        settings: {
          foreground: v('gitIgnore'),
          background: v('gitIgnore', '22'),
        },
      },
      {
        scope: 'meta.diff.range',
        settings: {
          foreground: v('gitChange'),
          fontStyle: 'bold',
        },
      },
      {
        scope: 'meta.diff.header',
        settings: {
          foreground: v('fgStrong'),
        },
      },
      {
        scope: 'meta.separator',
        settings: {
          fontStyle: 'bold',
          foreground: v('fgStrong'),
        },
      },
      {
        scope: 'meta.output',
        settings: {
          foreground: v('fgStrong'),
        },
      },
      {
        scope: [
          'brackethighlighter.tag',
          'brackethighlighter.curly',
          'brackethighlighter.round',
          'brackethighlighter.square',
          'brackethighlighter.angle',
          'brackethighlighter.quote',
        ],
        settings: {
          foreground: v('delimiter'),
        },
      },
      {
        scope: 'brackethighlighter.unmatched',
        settings: {
          foreground: v('diagError'),
        },
      },
      {
        scope: [
          'constant.other.reference.link',
          'string.other.link',
          'punctuation.definition.string.begin.markdown',
          'punctuation.definition.string.end.markdown',
        ],
        settings: {
          foreground: v('fg'),
        },
      },
      {
        scope: [
          'markup.underline.link.markdown',
          'markup.underline.link.image.markdown',
        ],
        settings: {
          foreground: v('fgMuted'),
          fontStyle: 'underline',
        },
      },
      {
        scope: [
          'type.identifier',
          'constant.other.character-class.regexp',
        ],
        settings: {
          foreground: v('specialChar'),
        },
      },
      {
        scope: [
          'entity.other.attribute-name.html.vue',
        ],
        settings: {
          foreground: v('func'),
        },
      },
      {
        scope: [
          'invalid.illegal.unrecognized-tag.html',
        ],
        settings: {
          fontStyle: 'normal',
        },
      },
    ],
    rules: [] as any[],
  }

  // monaco rules
  const rules: any[] = []

  theme.tokenColors.forEach(({ scope, settings }: any) => {
    for (const s of toArray(scope)) {
      rules.push({
        token: s,
        foreground: settings.foreground?.replace('#', ''),
      })
    }
  })

  theme.rules = rules

  return theme
}
