export default class ScrapperException extends Error {
    constructor(node, selector = null) {
        super("No es pot tractar la informació de la pàgina");
        this.data = (selector ? `[selector=${selector}]` : "") + node.html();
    }
}
