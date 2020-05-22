class Text {
    constructor(content = '') {
        this._content = content;
        this.length = this.content.length;
    }

    set content(value) {
        this._content = value;
        this.length = value.length;
    }

    get content() {
        return this._content;
    }
}

export default Text