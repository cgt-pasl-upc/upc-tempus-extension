import Temps from "../models/Temps.js";
import Permis from "../models/Permis.js";
import TipusPermis from "../models/TipusPermis.js";

export default class PermisManager {

    static getTipusPermisos() {
        if (typeof PermisManager.tipusPermisos === 'undefined' ) {
            PermisManager.tipusPermisos = [
                // Permisos per hores recuperables
                new TipusPermis('Permís recuperable').perHores().recuperable(),
                new TipusPermis('Acompanyament fills i/o familiars al metge').perHores().recuperable(),
                new TipusPermis('Reunions tutoria fills/es').perHores().recuperable(),

                // TODO: Pendent de classificar
                new TipusPermis('Candidatura campanya electoral del Règim Electoral General').perHores().noRecuperable(),
                new TipusPermis('Concurs o examen oficial').perHores().noRecuperable(),
                new TipusPermis('Curs Desenvolupament Professional 50%').perHores().noRecuperable(),
                new TipusPermis('Exàmens prenatal i tècniques de preparació al part').perHores().noRecuperable(),
                new TipusPermis('Hores extr. compens. autoritzades 2020 fins març 2021').perHores().noRecuperable(),
                new TipusPermis('Indisposició parcial').perHores().noRecuperable(),
                new TipusPermis('Naixement d\'un fill/a, adopció o acolliment permanent o preadoptiu d\'un o una menor').perHores().noRecuperable(),
                new TipusPermis('Participació en concursos/oposicions convocades per la UPC').perHores().noRecuperable(),
                new TipusPermis('Rehabilitació malaltia professional').perHores().noRecuperable(),
                new TipusPermis('Revisió mèdica laboral').perHores().noRecuperable(),
                new TipusPermis('Tasques article 83 LOU').perHores().noRecuperable(),
                new TipusPermis('Tràmits administratius i/o idoneïtat adopció o acolliment permanent o preadoptiu').perHores().noRecuperable(),
                new TipusPermis('Visita de treball').perHores().noRecuperable(),
                new TipusPermis('Visita metge').perHores().noRecuperable()
            ];
        }
        return PermisManager.tipusPermisos;
    }

    static addTipusPermisos(permis) {
        PermisManager.tipusPermisos.push(permis);
    }

    static getTipusPermisNoRecuperables() {
        return this.getTipusPermisos().filter(tipus => tipus.esNoRecuperable());
    }

    static getPermisosRecuperables() {
        return this.getTipusPermisos().filter(tipus => tipus.esRecuperable());
    }

    static createPermisDiesPerNom(data, nom) {
        var tipus = this.getTipusPermisPerNom(nom).perDies();
        // TODO: Afegir tests (també depèn de l'any)
        if (['06','07','08','09'].includes(data.substr(3,2)))
            return new Permis(data, new Temps(7), tipus);
        else
            return new Permis(data, new Temps(7,30), tipus);
    }

    static createPermisHoresPerNom(data, temps, nom) {
        var tipus = this.getTipusPermisPerNom(nom).perHores();
        return new Permis(data, temps, tipus);
    }

    static getTipusPermisPerNom(nom) {
        var permis = this.getTipusPermisos().find(function(elem) {
            return (elem.nom == nom);
        });
        if (permis == undefined) {
            permis = new TipusPermis(nom).noRecuperable();
            this.addTipusPermisos(permis);
        }
        return permis;
    }

    static sumatoriPerTipus(tipus, permisos) {
        return permisos.reduce(function (acumulador, actual, index, valors) {
            if (tipus.findIndex(elem => elem.nom === actual.tipus.nom) !== -1) {
                return acumulador.suma(actual.temps);
            }
            else {
                return acumulador;
            }
        }, new Temps());
    }
}