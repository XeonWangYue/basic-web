// Panel state and resizable panel logic for commit page

export const useCommitPanel = () => {
    const leftPanelTab = ref('detail')
    const leftPanelCollapsed = ref(false)

    const expandPanel = (tab: string) => {
        leftPanelCollapsed.value = false
        leftPanelTab.value = tab
    }

    // Horizontal: left panel vs editor area
    const editorWidth = ref(62)
    const isDraggingH = ref(false)

    const startHorizontalDrag = (e: MouseEvent) => {
        isDraggingH.value = true
        const startX = e.clientX
        const startWidth = editorWidth.value
        const container = document.querySelector('.main-workspace')
        const containerWidth = (container as HTMLElement)?.offsetWidth || window.innerWidth

        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingH.value) return
            const delta = startX - e.clientX
            const deltaPercent = (delta / containerWidth) * 100
            const newWidth = Math.min(80, Math.max(35, startWidth + deltaPercent))
            editorWidth.value = newWidth
        }

        const onMouseUp = () => {
            isDraggingH.value = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    // Vertical: editor vs sample panel
    const editorVerticalPercent = ref(65)
    const isDraggingV = ref(false)

    const startVerticalDrag = (e: MouseEvent) => {
        isDraggingV.value = true
        const startY = e.clientY
        const startPercent = editorVerticalPercent.value
        const container = document.querySelector('.editor-sample-container')
        const containerHeight = (container as HTMLElement)?.offsetHeight || window.innerHeight

        const onMouseMove = (e: MouseEvent) => {
            if (!isDraggingV.value) return
            const delta = e.clientY - startY
            const deltaPercent = (delta / containerHeight) * 100
            const newPercent = Math.min(85, Math.max(25, startPercent + deltaPercent))
            editorVerticalPercent.value = newPercent
        }

        const onMouseUp = () => {
            isDraggingV.value = false
            document.removeEventListener('mousemove', onMouseMove)
            document.removeEventListener('mouseup', onMouseUp)
        }

        document.addEventListener('mousemove', onMouseMove)
        document.addEventListener('mouseup', onMouseUp)
    }

    return {
        leftPanelTab,
        leftPanelCollapsed,
        expandPanel,
        editorWidth,
        isDraggingH,
        startHorizontalDrag,
        editorVerticalPercent,
        isDraggingV,
        startVerticalDrag,
    }
}