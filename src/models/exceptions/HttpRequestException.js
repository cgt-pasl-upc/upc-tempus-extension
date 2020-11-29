export default class HttpRequestException extends Error {
    constructor(request) {
        super();
        this.message = `La resposta HTTP és "${request.statusText}".`;
    }
}