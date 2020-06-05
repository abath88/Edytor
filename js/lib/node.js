import Text from './text.js'

class Node {
    constructor(params = {}){
        params.hasOwnProperty('text') 
            ? this.text = params.text
            : this.text = new Text()

        params.hasOwnProperty('offset')
            ? this.offset = params.offset
            : this.offset = 0   
            
        params.hasOwnProperty('next')
            ? this.next = params.next
            : this.next = null //Node
    }

    getNodeByKey(key) {
        let node = this

        while(node.offset != key) { 
            node = node.next
            if (!node) return null; 
        }

        return node
    }


    deleteSelectedText(startOffset, endOffset) {

        this.text.content = this.text.content.substring(startOffset, endOffset);
    }
}

export default Node