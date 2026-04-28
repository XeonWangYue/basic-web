export const useCommitSettingsStore = defineStore('commitSettings', {
    state: () => ({
        monacoSettings: {
            fontSize: 16,
            language: 'python',
            theme: 'vs-dark',
            tabSize: 4,
            wordWrap: 'off' as 'off' | 'on' | 'wordWrapColumn' | 'bounded',
            minimap: false,
            lineNumbers: 'on' as 'on' | 'off' | 'relative' | 'interval',
            scrollBeyondLastLine: true,
            renderWhitespace: 'none' as 'none' | 'boundary' | 'selection' | 'trailing' | 'all',
            cursorBlinking: 'blink' as 'blink' | 'smooth' | 'phase' | 'expand' | 'solid',
            cursorStyle: 'line' as 'line' | 'block' | 'underline' | 'line-thin' | 'block-outline' | 'underline-thin',
            autoClosingBrackets: 'languageDefined' as 'always' | 'languageDefined' | 'beforeWhitespace' | 'never',
            formatOnPaste: false,
            formatOnType: false,
            bracketPairColorization: true,
            smoothScrolling: false,
            mouseWheelZoom: false,
            folding: true,
            links: true,
            colorDecorators: true,
            contextmenu: true,
            quickSuggestions: true,
            acceptSuggestionOnCommitCharacter: true,
            suggestOnTriggerCharacters: true,
            parameterHints: true,
            renderLineHighlight: 'line' as 'none' | 'gutter' | 'line' | 'all',
            hideCursorInOverviewRuler: false,
            overviewRulerBorder: true,
            scrollbar: {
                verticalScrollbarSize: 14,
                horizontalScrollbarSize: 12,
            },
        },
        layoutSettings: {
            height: 500
        }
    }),
    getters: {

    },
    actions: {
        updateFontSize(fontSize: number) {
            this.monacoSettings.fontSize = fontSize
        },
        updateLanguage(language: string) {
            this.monacoSettings.language = language
        },
        updateHeight(size: number) {
            this.layoutSettings.height = size
        },
        updateSettings(partial: Partial<typeof this.monacoSettings>) {
            Object.assign(this.monacoSettings, partial)
        }
    },
    persist: true
})