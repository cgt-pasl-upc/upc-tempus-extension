export default class TempsInvalidFormatException extends Error {
    constructor(s) {
        super();
        this.message = `El format del temps és incorrecte "${s}".`;
    }
}
