import Temps from "../models/Temps.js";
import Permis from "../models/Permis.js";
import TipusPermis from "../models/TipusPermis.js";

export default class PermisManager {

    static getTipusPermisos() {
        if (typeof PermisManager.tipusPermisos === 'undefined' ) {
            PermisManager.tipusPermisos = [
                // Permisos per hores recuperables
                new TipusPermis('7041', 'Permís recuperable').perHores().recuperable(),
                new TipusPermis('7033', 'Acompanyament fills i/o familiars al metge').perHores().recuperable(),
                new TipusPermis('7037', 'Reunions tutoria fills/es').perHores().recuperable(),

                // TODO: Pendent de classificar
                new TipusPermis('7030', 'Candidatura campanya electoral del Règim Electoral General').perHores().noRecuperable(),
                new TipusPermis('7014', 'Concurs o examen oficial').perHores().noRecuperable(),
                new TipusPermis('7083', 'Curs Desenvolupament Professional 50%').perHores().noRecuperable(),
                new TipusPermis('7027', 'Exàmens prenatal i tècniques de preparació al part').perHores().noRecuperable(),
                new TipusPermis('7088', 'Hores extr. compens. autoritzades 2020 fins març 2021').perHores().noRecuperable(),
                new TipusPermis('7045', 'Indisposició parcial').perHores().noRecuperable(),
                new TipusPermis('7010', 'Naixement d\'un fill/a, adopció o acolliment permanent o preadoptiu d\'un o una menor').perHores().noRecuperable(),
                new TipusPermis('7039', 'Participació en concursos/oposicions convocades per la UPC').perHores().noRecuperable(),
                new TipusPermis('7036', 'Rehabilitació malaltia professional').perHores().noRecuperable(),
                new TipusPermis('7035', 'Revisió mèdica laboral').perHores().noRecuperable(),
                new TipusPermis('7032', 'Tasques article 83 LOU').perHores().noRecuperable(),
                new TipusPermis('7052', 'Tràmits administratius i/o idoneïtat adopció o acolliment permanent o preadoptiu').perHores().noRecuperable(),
                new TipusPermis('7004', 'Visita de treball').perHores().noRecuperable(),
                new TipusPermis('7016', 'Visita metge').perHores().noRecuperable()
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
            permis = new TipusPermis('undefined', nom).noRecuperable();
            this.addTipusPermisos(permis);
        }
        return permis;
    }

    static sumatoriPerTipus(tipus, permisos) {
        return permisos.reduce(function (acumulador, actual, index, valors) {
            if (tipus.findIndex(elem => elem.codi === actual.tipus.codi) !== -1) {
                return acumulador.suma(actual.temps);
            }
            else {
                return acumulador;
            }
        }, new Temps());
    }
}