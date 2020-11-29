export default class PermisNotFoundException extends Error {
    constructor(nom) {
        super();
        this.message = `No s\'ha trobat el permís "${nom}".`;
    }
}
