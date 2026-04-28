// Editor settings interface
export interface EditorSettings {
    fontSize: number
    tabSize: number
    theme: string
    wordWrap: string
    minimap: boolean
    fontFamily: string
    lineHeight: number
    bracketMatching: boolean
    lineNumbers: string
}

// Default code templates per language
export const defaultTemplates: Record<string, string> = {
    python: '# 在此编写你的代码\n\ndef main():\n    pass\n\nif __name__ == "__main__":\n    main()\n',
    javascript: '// 在此编写你的代码\n\nfunction main() {\n    \n}\n\nmain();\n',
    typescript: '// 在此编写你的代码\n\nfunction main(): void {\n    \n}\n\nmain();\n',
    c: '#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n',
    cpp: '#include <iostream>\nusing namespace std;\n\nint main() {\n    \n    return 0;\n}\n',
    java: 'import java.util.*;\nimport java.io.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        \n    }\n}\n',
    go: 'package main\n\nimport "fmt"\n\nfunc main() {\n    \n}\n',
    rust: 'fn main() {\n    \n}\n',
}

// Language options for code editor
export const languageOptions = [
    { label: 'Python', value: 'python' },
    { label: 'JavaScript', value: 'javascript' },
    { label: 'TypeScript', value: 'typescript' },
    { label: 'C', value: 'c' },
    { label: 'C++', value: 'cpp' },
    { label: 'Java', value: 'java' },
    { label: 'Go', value: 'go' },
    { label: 'Rust', value: 'rust' },
    { label: 'HTML', value: 'html' },
    { label: 'CSS', value: 'css' },
    { label: 'JSON', value: 'json' },
    { label: 'XML', value: 'xml' },
    { label: 'SQL', value: 'sql' },
    { label: 'Shell', value: 'shell' },
    { label: 'Markdown', value: 'markdown' },
    { label: 'YAML', value: 'yaml' },
    { label: 'Kotlin', value: 'kotlin' },
    { label: 'Swift', value: 'swift' },
    { label: 'PHP', value: 'php' },
    { label: 'Ruby', value: 'ruby' },
]

// Font size options
export const fontSizeOptions = [10, 12, 13, 14, 15, 16, 18, 20, 22, 24, 26, 28, 30, 32, 36, 40, 48]

// Theme options
export const themeOptions = [
    { label: '深色 (Dark)', value: 'vs-dark' },
    { label: '浅色 (Light)', value: 'vs' },
    { label: '高对比 (High Contrast)', value: 'hc-black' },
    { label: '高对比浅色', value: 'hc-light' },
]

// Verdict info for submission results
import {
    CircleCheck, CircleClose, Warning
} from '@element-plus/icons-vue'

export const verdictInfo = {
    AC: { label: '通过', color: '#67c23a', icon: CircleCheck },
    WA: { label: '答案错误', color: '#f56c6c', icon: CircleClose },
    TLE: { label: '时间超限', color: '#e6a23c', icon: Warning },
    MLE: { label: '内存超限', color: '#e6a23c', icon: Warning },
    RE: { label: '运行错误', color: '#f56c6c', icon: CircleClose },
    CE: { label: '编译错误', color: '#f56c6c', icon: CircleClose },
    OLE: { label: '输出超限', color: '#e6a23c', icon: Warning },
    PE: { label: '格式错误', color: '#e6a23c', icon: Warning },
    SE: { label: '系统错误', color: '#909399', icon: Warning },
}

// Cursor blinking options
export const cursorBlinkingOptions = [
    { label: '闪烁', value: 'blink' },
    { label: '平滑', value: 'smooth' },
    { label: '相位', value: 'phase' },
    { label: '展开', value: 'expand' },
    { label: '实心', value: 'solid' },
]

// Cursor style options
export const cursorStyleOptions = [
    { label: '竖线', value: 'line' },
    { label: '方块', value: 'block' },
    { label: '下划线', value: 'underline' },
    { label: '细竖线', value: 'line-thin' },
    { label: '空心方块', value: 'block-outline' },
    { label: '细下划线', value: 'underline-thin' },
]

// Render line highlight options
export const renderLineHighlightOptions = [
    { label: '无', value: 'none' },
    { label: '行号槽', value: 'gutter' },
    { label: '当前行', value: 'line' },
    { label: '全部', value: 'all' },
]

// Auto closing brackets options
export const autoClosingOptions = [
    { label: '由语言定义', value: 'languageDefined' },
    { label: '总是', value: 'always' },
    { label: '空格前', value: 'beforeWhitespace' },
    { label: '从不', value: 'never' },
]

// Render whitespace options
export const renderWhitespaceOptions = [
    { label: '无', value: 'none' },
    { label: '边界', value: 'boundary' },
    { label: '选区', value: 'selection' },
    { label: '尾部', value: 'trailing' },
    { label: '全部', value: 'all' },
]

// Word wrap options
export const wordWrapOptions = [
    { label: '关闭', value: 'off' },
    { label: '开启', value: 'on' },
    { label: '按列换行', value: 'wordWrapColumn' },
    { label: '有界换行', value: 'bounded' },
]

// Line numbers options
export const lineNumbersOptions = [
    { label: '开启', value: 'on' },
    { label: '关闭', value: 'off' },
    { label: '相对', value: 'relative' },
    { label: '间隔', value: 'interval' },
]

// Default editor settings for reset
export const DEFAULT_EDITOR_SETTINGS = {
    theme: 'vs-dark',
    tabSize: 4,
    wordWrap: 'off',
    minimap: false,
    lineNumbers: 'on',
    scrollBeyondLastLine: true,
    renderWhitespace: 'none',
    cursorBlinking: 'blink',
    cursorStyle: 'line',
    autoClosingBrackets: 'languageDefined',
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
    renderLineHighlight: 'line',
    hideCursorInOverviewRuler: false,
    overviewRulerBorder: true,
}