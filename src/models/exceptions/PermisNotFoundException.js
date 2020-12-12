export default class PermisNotFoundException extends Error {
    constructor(nom) {
        super("No s\'ha trobat el permís");
        this.data = nom;
    }
}
