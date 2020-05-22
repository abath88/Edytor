import Block from './lib/block.js'
import Offset from './lib/node.js'
import Text from './lib/text.js'
import Editor from './component/edytor.js';

/*class Edytor {
    constructor(props){
        this.container = props.container
        
        this.editor = document.createElement('div')
        this.editor.setAttribute("class", "editor")
        this.editor.setAttribute("contenteditable", "true")

        this.toolbar = document.createElement('div')

        this.placeholder = document.createElement('span')
        this.placeholder.textContent = "Rozpocznij pisanie artykułu"

        this.cursor = null

        this.editor.appendChild(this.placeholder)

        for(let tag of ['p', 'h1', 'h2', 'h3', 'h4']){
            let button = document.createElement('div')
            button.textContent = tag

            button.addEventListener('mousedown', (e) => {
                e.preventDefault()
                let newElement = document.createElement(tag)
                let cursorOffset = this.cursor.startOffset

                if(this.cursor.startContainer.nodeName == '#text'){
                    newElement.innerHTML = this.cursor.startContainer.parentNode.innerHTML
                    this.editor.replaceChild(
                      newElement,
                      this.cursor.startContainer.parentNode
                    );
                } else {
                    newElement.innerHTML = this.cursor.startContainer.innerHTML
                    this.editor.replaceChild(
                        newElement,
                        this.cursor.startContainer
                    )
                }

                let range = new Range()
                newElement.childNodes.length > 0
                  ? range.setStart(newElement.childNodes[0], cursorOffset)
                  : range.setStart(newElement, 0);
                
                this.cursor = range
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(this.cursor)
            })

            this.toolbar.appendChild(button)
        }

        this.container.appendChild(this.toolbar)
        this.container.appendChild(this.editor)


        this.editor.addEventListener('focus', (e) => {
            if(this.editor.children.length > 0  && this.editor.children[0] == this.placeholder){
                e.preventDefault()
                this.editor.replaceChild(document.createElement("p"), this.placeholder)

                let range = new Range()
                range.setStart(this.editor.childNodes[0], 0)
                window.getSelection().removeAllRanges()
                window.getSelection().addRange(range)
            }
        })

        this.editor.addEventListener('keydown', (e) => {
            switch(e.key) {
                case 'Backspace':
                    if(this.editor.children.length == 1 && this.editor.children[0].textContent.length == 0){
                        e.preventDefault()
                    }

                
                default:
                    break;
            }
        })

        this.editor.addEventListener('keyup', (e) => {
            switch(e.key) {
                case 'Enter':
                    let newElement = document.createElement('p')
                    for(let node of this.editor.childNodes) {
                        if(node.nodeName == 'DIV'){
                            newElement.textContent = node.textContent
                            this.editor.replaceChild(newElement, node)
                        }
                    }
                default:
                    break;
            }
            this.cursor = window.getSelection().getRangeAt(0)
        })

        this.editor.addEventListener('mouseup', (e) => {
            this.cursor = window.getSelection().getRangeAt(0);
        })
    }
}

let editor = new Edytor(
    {
        container : document.getElementById("edytor")
    }
)*/


let editor = new Editor({
  container: document.getElementById('edytor'),
  blocks: [
    new Block({
      nodes: [new Text('aaa'), new Text('bbb'), new Text('ccc')],
    }),
    new Block({
      nodes: [new Text('aaa'), new Text('bbb'), new Text('ccc')],
    }),
    new Block({
      nodes: [new Text('aaa'), new Text('bbb'), new Text('ccc')],
    }),
    new Block({
      nodes: [new Text('aaa'), new Text('bbb'), new Text('ccc')],
    }),
  ],
});

editor.render()