export default class HttpRequestException extends Error {
    constructor(request) {
        super("La resposta HTTP és incorrecta");
        this.data = request.statusText;
    }
}