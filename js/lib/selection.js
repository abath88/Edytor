class Selection {
    constructor(params) {
        this.editor = params.editor
    }

    getSelection = () => {
        let browserSelection = this.editor.container.ownerDocument.getSelection();
        let range = browserSelection.getRangeAt(0)

        let startNode = range.startContainer.parentElement
        let endNode = range.startContainer.parentElement

        return {
            startBlock : startNode.parentElement.dataset.key,
            endBlock : startNode.parentElement.dataset.key,
            startNode : startNode.dataset.offset,
            endNode : endNode.dataset.offset,
            startOffset : range.startOffset,
            endOffset : range.endOffset,
            isCollapsed: browserSelection.isCollapsed
        }
    }

    setSelection(selection) {
        let doc = this.editor.ownerDocument

        let startBlock = doc.querySelection(`[data-key="${selection.startBlock}"]`)
        let startNode = startBlock.querySelection(`[data-offset="${selection.startNode}"]`)
        let endBlock = doc.querySelection(`[data-key="${selection.endBlock}"]`).childNodes[0]
        let endNode = endBlock.querySelection(`[data-offset="${selection.endNode}"]`).childNodes[0]
        
        let newRange = doc.createRange()
        newRange.setStart(startNode, selection.startOffset)
        newRange.setEnd(endNode, selection.endOffset)

        let browserSelection = doc.getSelection()
        browserSelection.removeAllRanges()
        browserSelection.addRange(newRange)
    }
}

export default Selection

