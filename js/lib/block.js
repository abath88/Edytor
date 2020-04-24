import Offset from './offset.js'

class BlockText {
    constructor(params = {}) {
        this.type = 'p'
        if(params.hasOwnProperty('offsets')){
            this.createBlock(params.offsets)
            this.length = params.offsets.length
        } else {
            this.offsets = new Offset()
            this.length = 1
        }
    }

    createBlock(texts = []) {
        
        let offset = 0
        let prevOffset = null
        for(let i=0;i<texts.length;i++){
            
            if(i==0) {
                this.offsets = new Offset({
                       text: texts[i],
                       offset: offset,
                })
                prevOffset = this.offsets;
            } else {
                offset += prevOffset.text.length
                prevOffset.next = new Offset({
                  text: texts[i],
                  offset: offset,
                })
                prevOffset = prevOffset.next;
            }
        }
    }
}

export default BlockText