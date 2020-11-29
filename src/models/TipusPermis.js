export default class TipusPermis {
    constructor(codi, nom) {
        this.codi = codi;
        this.nom = nom;
        this.recuperar = false;
        this.dies = false;
    }

    recuperable() {
        this.recuperar = true;
        return this;
    }

    noRecuperable() {
        this.recuperar= false;
        return this;
    }

    esRecuperable() {
        return this.recuperar;
    }

    esNoRecuperable() {
        return !this.recuperar;
    }
    
    perDies() {
        this.dies = true;
        return this;
    }

    perHores() {
        this.dies = false;
        return this;
    }
    
    esPerHores() {
        return !this.dies;
    }

    esPerDies() {
        return this.dies;
    }

    toString() {
        return `[codi=${this.codi},nom=${this.nom},recuperable=${this.recuperar},dies=${this.dies}]`;
    }
}
