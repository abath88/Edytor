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
        console.log(this.selection)
        console.log(this.selection.getSelection())
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
        })
        
        this.container.innerHTML = test
    }
}

export default Editor