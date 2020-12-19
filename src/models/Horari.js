export default class Horari {
    constructor(dedicacioSetmanal, dedicacioNominal, inici, final) {
        this.dedicacioSetmanal = dedicacioSetmanal;
        this.dedicacioNominal = dedicacioNominal;
        this.inici = inici;
        this.final = final;
        return this;
    }

    getPercetatgeDedicacio() {
        return 100 * this.dedicacioSetmanal.minuts / this.dedicacioNominal.minuts;
    }

    toString() {
        return `[inici=${this.inici},final=${this.final},dedicacioSetmanal=${this.dedicacioSetmanal},dedicacioNominal=${this.dedicacioNominal}]`;
    }
}
