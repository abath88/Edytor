import Selection from '../lib/selection.js'

class Editor {
    constructor(params = {}) {
        params.hasOwnProperty('container')
            ? this.container = params.container
            : this.container = null

        this.container && 
            this.container.setAttribute('contenteditable', true)

        params.hasOwnProperty('blocks')
            ? this.blocks = params.blocks
            : this.blocks = []
        
        params.hasOwnProperty('placeholder')
            ? this.placeholder = params.placeholder
            : this.placeholder = "Wprowadź tekst"

        this.selection = new Selection({editor: this})
        

        this._handleKeyDown = this._handleKeyDown.bind(this);
        this.container.addEventListener('keydown', this._handleKeyDown)
    }

    _handleKeyDown(e){
        /*{
            startBlock 
            endBlock 
            startNode 
            endNode 
            startOffset
            endOffset 
            isCollapsed
        } */
        let selection = this.selection.getSelection();

        if(selection.isCollapsed) {
            let block = this.blocks.find( el => {
                return el.key === selection.startBlock
            })

            let node = block.nodes;

            while(node.offset != selection.startNode) {
                node = node.next
            }
            
            let before = node.text.content.slice(0, selection.startOffset)
            let keyDown = e.key
            let after = node.text.content.slice(selection.startOffset);

            node.text.content = `${before}${keyDown}${after}`
        } else {
            this.deleteBlocks(selection)
            let lastNode = this.getBlockByKey(selection.startBlock).nodes
            
            while(true) 
                if (lastNode.next) lastNode = lastNode.next;
                else break;

            this.getBlockByKey(selection.startBlock).deleteNodes(
                selection.startNode,
                lastNode.offset
            )
            
            let nodeToClear = this.getBlockByKey(
              selection.startBlock
            ).nodes.getNodeByKey(selection.startNode);

                console.log(selection.startOffset, nodeToClear.text.length);

            nodeToClear.deleteSelectedText(
              0,
              selection.startOffset
            );

            console.log(this.getBlockByKey(selection.startBlock));
        }
    }

    deleteBlocks(selection) {
        let toDelete = [];
        let del = false;

        for (let i = 0; i < this.blocks.length; i++) {
            this.blocks[i].key === selection.endBlock &&
            (del = false)
            
            del && toDelete.push(i)

            this.blocks[i].key === selection.startBlock &&
            this.blocks[i].key != selection.endBlock &&
            (del = true)
        }

        toDelete && this.blocks.splice(toDelete[0], toDelete.length)
    }

    

    getBlockByKey(key) {
        return this.blocks.find((block) => block.key == key);
    }

    hasContainer() {
        return this.container ? true : false
    }

    render() {
        let test = this.blocks.map(block => {
            let off = block.nodes
            let str = `<${block.type} data-key=${block.key}>`
            str += `<span data-offset=${off.offset}>${off.text.content}</span>`;

            for(let i = 1; i < block.length; i++) {
                if(off.next){
                    off = off.next; 
                    str += `<span data-offset=${off.offset}>${off.text.content}</span>`;
                } 
            }

            str += `</${block.type}>`;

            return str
        }).join('')
        
        this.container.innerHTML = test
    }
}

export default Editor