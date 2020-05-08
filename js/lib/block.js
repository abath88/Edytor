import Node from './node.js'

class BlockText {
    constructor(params = {}) {
        params.hasOwnProperty('key')
            ? this.key = params.key
            : this.key = 'key' + ( 1 + Math.floor(Math.random() * 49) )

        params.hasOwnProperty('type') 
            ? this.type = prarams.type
            : this.type = 'p'
        
        if(params.hasOwnProperty('nodes')){
            this.createBlock(params.nodes)
            this.length = params.nodes.length
        } else {
            this.nodes = new Node()
            this.length = 1
        }
    }

    //[ {text: 'ddd'} , { text: 'bbb'}, {text: 'ccc'}, {text: 'aaa'} ]

    createBlock(texts = []) { 
        let offset = 0
        let prevNode = null
        for(let i=0;i<texts.length;i++){
            
            if(i==0) {
                this.nodes = new Node({
                       text: texts[i],
                       offset: offset,
                })
                prevNode = this.nodes;
            } else {
                offset += prevNode.text.length
                prevNode.next = new Node({
                  text: texts[i],
                  offset: offset,
                })
                prevNode = prevNode.next;
            }
        }
    }
}

export default BlockText