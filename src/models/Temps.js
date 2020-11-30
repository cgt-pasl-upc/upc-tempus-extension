export default class Temps {
    constructor(hores = 0, minuts = 0) {
        this.minuts = parseInt(hores) * 60 + parseInt(minuts);
        return this;
    }

    clone() {
        return new Temps(0, this.minuts);
    }

    abs() {
        this.minuts = Math.abs(this.minuts);
        return this;
    }

    esNegatiu() {
        return this.minuts < 0;
    }

    esPositiu() {
        return this.minuts >= 0;
    }

    suma(temps) {
        this.minuts = this.minuts + temps.minuts;
        return this;
    }

    resta(temps) {
        this.minuts = this.minuts - temps.minuts;
        return this;
    }

    format() {
        var hores = 0;
        var minuts = 0;
        var signe = this.minuts < 0 ? "-" : "";

        hores = Math.floor(Math.abs(this.minuts) / 60);
        minuts = Math.abs(this.minuts) % 60;

        var nomHores = (hores == 1 ? 'hora' : 'hores');
        var nomMinuts = (minuts == 1 ? 'minut' : 'minuts');

        if (hores == 0) {
            return `${signe}${String(minuts)} ${nomMinuts}`;
        }

        if (minuts == 0) {
            return `${signe}${new Intl.NumberFormat('ca-ES').format(hores)} ${nomHores}`;
        }

        return `${signe}${new Intl.NumberFormat('ca-ES').format(hores)} ${nomHores} i ${String(minuts)} ${nomMinuts}`;        
    }

    toString() {
        return `[minuts=${this.minuts}]`;
    }
}
