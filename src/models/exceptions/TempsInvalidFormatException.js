export default class TempsInvalidFormatException extends Error {
    constructor(data) {
        super("El format del temps és incorrecte");
        this.data = data;
    }
}
