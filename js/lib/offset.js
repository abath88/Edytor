import Text from './text.js'

class Offset {
    constructor(params = {}){
        params.hasOwnProperty('text') 
            ? this.text = params.text
            : this.text = new Text()

        params.hasOwnProperty('offset')
            ? this.offset = params.offset
            : this.offset = 0   
            
        params.hasOwnProperty('next')
            ? this.next = params.next
            : this.next = null //Offset
    } 
}

export default Offset