export const useCommitSettingsStore = defineStore('commitSettings', {
    state: () => ({
        monacoSettings: {
            fontSize: 0,
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
        updateHeight(size: number) {
            this.layoutSettings.height = size
        }
    },
    persist: true
})