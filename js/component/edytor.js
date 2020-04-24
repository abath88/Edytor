class Editor {
    constructor(params = {}) {
        params.hasOwnProperty('container')
            ? this.container = params.container
            : this.container = null

        params.hasOwnProperty('blocks')
            ? this.blocks = params.blocks
            : this.blocks = []
        
        params.hasOwnProperty('placeholder')
            ? this.placeholder = params.placeholder
            : this.placeholder = "Wprowadź tekst"
    }

    hasContainer() {
        return this.container ? true : false
    }

    render() {
        let test = this.blocks.map(block => {
            let off = block.offsets
            let str = `<${block.type}>`
            str += `<span data-offset=${off.offset}>${off.text.content}</span>`;
            for(let i = 1; i < block.length; i++) {
                if(off.next){
                    off = off.next; 
                    str += `<span data-offset=${off.offset}>${off.text.content}</span>`;
                } 
            }

            str += `</${block.type}>`;

            return str
        })

        this.container.innerHTML = test
    }
}

export default Editor