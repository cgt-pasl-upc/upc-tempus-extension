import Temps from "../models/Temps.js";
import Permis from "../models/Permis.js";
import TipusPermis from "../models/TipusPermis.js";
import PermisNotFoundException from "../models/exceptions/PermisNotFoundException.js";

export default class PermisManager {
    static getTipusPermisos() {
        if (typeof PermisManager.tipusPermisos === 'undefined' ) {
            PermisManager.tipusPermisos = [
                // Permisos per dies no recuperables
                new TipusPermis('7042', 'A compte festa local Barcelona 2016').perDies().noRecuperable(),
                new TipusPermis('7060', 'Adhesió a la vaga').perDies().noRecuperable(),
                new TipusPermis('7071', 'Adhesió a la vaga 08.03.2019').perDies().noRecuperable(),
                new TipusPermis('7072', 'Adhesió a la vaga 18.10.2019').perDies().noRecuperable(),
                new TipusPermis('7070', 'Adhesió a la vaga 21.02.2019').perDies().noRecuperable(),
                new TipusPermis('7054', 'Assumptes particulars per antiguitat 2018').perDies().noRecuperable(),
                new TipusPermis('7063', 'Assumptes particulars per antiguitat 2019').perDies().noRecuperable(),
                new TipusPermis('7074', 'Assumptes particulars per antiguitat 2020').perDies().noRecuperable(),
                new TipusPermis('7002', 'Assumptes propis 2013').perDies().noRecuperable(),
                new TipusPermis('7026', 'Assumptes propis 2014').perDies().noRecuperable(),
                new TipusPermis('7035', 'Assumptes propis 2015').perDies().noRecuperable(),
                new TipusPermis('7041', 'Assumptes propis 2016').perDies().noRecuperable(),
                new TipusPermis('7048', 'Assumptes propis 2017').perDies().noRecuperable(),
                new TipusPermis('7056', 'Assumptes propis 2018').perDies().noRecuperable(),
                new TipusPermis('7062', 'Assumptes propis 2019').perDies().noRecuperable(),
                new TipusPermis('7073', 'Assumptes propis 2020').perDies().noRecuperable(),
                new TipusPermis('7030', 'Borsa d\'hores de conciliació').perDies().noRecuperable(),
                new TipusPermis('7012', 'Defunció parent fins 2n grau').perDies().noRecuperable(),
                new TipusPermis('7045', 'Dies addicionals vacances per antiguitat - 2016').perDies().noRecuperable(),
                new TipusPermis('7055', 'Dies addicionals vacances per antiguitat - 2018').perDies().noRecuperable(),
                new TipusPermis('7065', 'Dies addicionals vacances per antiguitat - 2019').perDies().noRecuperable(),
                new TipusPermis('7075', 'Dies addicionals vacances per antiguitat - 2020').perDies().noRecuperable(),
                new TipusPermis('7032', 'Hospitalització (amb o sense intervenció quirúrgica) d\'un familiar de 1r. grau').perDies().noRecuperable(),
                new TipusPermis('7033', 'Hospitalització (amb o sense intervenció quirúrgica) d\'un familiar de 2n. grau').perDies().noRecuperable(),
                new TipusPermis('7001', 'Indisposició').perDies().noRecuperable(),
                new TipusPermis('7067', 'Indisposició 2019').perDies().noRecuperable(),
                new TipusPermis('7076', 'Indisposició 2020').perDies().noRecuperable(),
                new TipusPermis('7029', 'Intervenció quirúrgica sense hospitalització o cirurgia ambulatòria d\'un familiar fins el 2on. grau').perDies().noRecuperable(),
                new TipusPermis('7020', 'Malaltia greu o accident amb hospitalització d\'un familiar de 1r. grau').perDies().noRecuperable(),
                new TipusPermis('7021', 'Malaltia greu o accident amb hospitalització d\'un familiar de 2n. grau').perDies().noRecuperable(),
                new TipusPermis('7009', 'Matrimoni o inici de convivència').perDies().noRecuperable(),
                new TipusPermis('7057', 'Membre mesa electoral o interventor/a').perDies().noRecuperable(),
                new TipusPermis('7010', 'Naixement d\'un fill/a, adopció o acolliment permanent o preadoptiu d\'un o una menor').perDies().noRecuperable(),
                new TipusPermis('7031', 'Permís a compte del calendari 2014').perDies().noRecuperable(),
                new TipusPermis('7006', 'Vacances').perDies().noRecuperable(),
                // Permisos per dies recuperables (no n'hi ha)

                // Permisos per hores no recuperables
                new TipusPermis('7008', 'Alliberament sindical').perHores().noRecuperable(),
                new TipusPermis('7046', 'Assistència a assemblea').perHores().noRecuperable(),
                new TipusPermis('7071', 'Assistència a assemblees/reunions UPC').perHores().noRecuperable(),
                new TipusPermis('7040', 'Altres permisos').perHores().noRecuperable(),
                new TipusPermis('7005', 'Curs de formació de treball').perHores().noRecuperable(),
                new TipusPermis('7069', 'Curs Desenvolupament Professional 100%').perHores().noRecuperable(),
                new TipusPermis('7023', 'Dedicació institucional').perHores().noRecuperable(),
                new TipusPermis('7015', 'Deures d\'inexcusable compliment').perHores().noRecuperable(),
                new TipusPermis('7086', 'Hores extraordinàries compensables autoritzades 2020').perHores().noRecuperable(),
                new TipusPermis('XXXX', 'Hores extraordinàries compensables autoritzades 2019').perHores().noRecuperable(),
                new TipusPermis('7034', 'Hores treballades fora d\'horari').perHores().noRecuperable(),
                new TipusPermis('XXXX', 'Descompte de saldo per hores extraordinàries autoritzades dins d\'horari').perHores().noRecuperable(),
                new TipusPermis('7085', 'Permís gaudiment hores de desenvolupament professional 2020').perHores().noRecuperable(),
                new TipusPermis('XXXX', 'Permís gaudiment hores de desenvolupament professional 2019').perHores().noRecuperable(),
                new TipusPermis('7084', 'Permís gaudiment hores de promoció salut 2020').perHores().noRecuperable(),
                new TipusPermis('XXXX', 'Permís gaudiment hores de promoció salut 2019').perHores().noRecuperable(),

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

    static getTipusPermisNoRecuperables() {
        return this.getTipusPermisos().filter(tipus => tipus.esNoRecuperable());
    }

    static getPermisosRecuperables() {
        return this.getTipusPermisos().filter(tipus => tipus.esRecuperable());
    }

    static createPermisDiesPerNom(data, nom) {
        var tipus = this.getTipusPermisPerNom(nom);
        // TODO: Afegir tests
        if (['06','07','08','09'].includes(data.substr(3,2)))
            return new Permis(data, new Temps(7), tipus);
        else
            return new Permis(data, new Temps(7,30), tipus);
    }

    static createPermisHoresPerNom(data, temps, nom) {
        var tipus = this.getTipusPermisPerNom(nom);
        return new Permis(data, temps, tipus);
    }

    static getTipusPermisPerNom(nom) {
        var permis = this.getTipusPermisos().find(function(elem) {
            return (elem.nom == nom);
        });
        if (permis == undefined) {
            throw new PermisNotFoundException(nom);
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