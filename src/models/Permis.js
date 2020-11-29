export default class Permis {
    constructor(data, temps, tipus) {
        this.data = data;
        this.temps = temps;
        this.tipus = tipus;
    }

    toString() {
        return `[data=${this.data},temps=${String(this.temps)},tipus=${String(this.tipus)}]`;
    }
}
