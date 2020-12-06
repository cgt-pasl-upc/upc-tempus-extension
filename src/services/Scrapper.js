import Temps from "../models/Temps.js";
import PermisManager from "./PermisManager.js";
import ScrapperException from "../models/exceptions/ScrapperException.js";
import HttpRequestException from "../models/exceptions/HttpRequestException.js";

const PAGINACIO_MAX = 30;

export default class Scrapper {

    static getPermisos(inici, final) {
        var deferred = $.Deferred();
        $.when(this.getPermisosPerDies(inici, final), this.getPermisosPerHores(inici, final)).done(function (v1, v2) {
            deferred.resolve(v1.concat(v2));
        });
        return deferred;
    }

    static getSaldo() {
        return {
            "H. teo.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(2)"),
            "H. treb.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(3)"),
            "H.p.n.r.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(4)"),
            "H.p.r.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(5)"),
            "S.m.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(6)")
        };
    }
   
    static getPermisosPerDies(inici,final) {
        var callback = function(responseText) {
            var permisos = [];
            $(responseText).find("#tableList > tbody > tr:not(.comentari)").each(function(index) {
                var data = Scrapper.getTrimValue($(this).find("td:nth-child(1)").text());
                var tipus = Scrapper.getTrimValue($(this).find("td:nth-child(4)").text());
                var estat = Scrapper.getTrimValue($(this).find("td:nth-child(5)").text());
                if (data || tipus || estat) {
                    if (!data)
                        throw new ScrapperException("Data del permís per dies no trobada.");
                    if (!tipus)
                        throw new ScrapperException("Tipus del permís per dies no trobat.");
                    if (!estat)
                        throw new ScrapperException("Estat del permís per hores no trobat.");

                    if (estat == "Acceptat") {
                        var permis = PermisManager.createPermisDiesPerNom(data, tipus);
                        permisos.push(permis);
                    }                            
                }
            });
            return permisos;
        };
        return Scrapper.getPaginacio(`https://tempus.upc.edu/RLG/permisDies/list?filtreAnyGaudiment=Tots&dataInici=${inici}&dataFi=${final}`, callback);
    }
    
    static getPermisosPerHores(inici, final) {
        var callback = function(responseText) {
            var permisos = [];

            $(responseText).find("#tableList > tbody > tr:not(.comentari,.denegacio)").each(function(index) {
                var data = Scrapper.getTrimSplitValue($(this).find("td:nth-child(1)").text(), 0);
                var temps = Scrapper.getTrimSplitValue($(this).find("td:nth-child(1)").text(), 1);
                var tipus = Scrapper.getTrimValue($(this).find("td:nth-child(3)").text());
                var estat = Scrapper.getTrimValue($(this).find("td:nth-child(4)").text());
                if (data || temps || tipus) {
                    if (!data)
                        throw new ScrapperException("Data del permís per hores no trobada.");
                    if (!temps)
                        throw new ScrapperException("Durada del permís per hores no trobada.");
                    if (!tipus)
                        throw new ScrapperException("Tipus del permís per hores no trobat.");
                    if (!estat)
                        throw new ScrapperException("Estat del permís per hores no trobat.");

                    if (estat == "Acceptat") {
                        var permis = PermisManager.createPermisHoresPerNom(data, Temps.fromString(temps), tipus);
                        permisos.push(permis);
                    }
                }
            });
            return permisos;
        };
        return Scrapper.getPaginacio(`https://tempus.upc.edu/RLG/permisHores/list?dataInici=${inici}&dataFi=${final}&_action_list=Cerca`, callback);
    }
    
    static getTrimSplitValue(data, index) {
        var value = Scrapper.getTrimValue(data).split(/[\s]+/)[index];
        if (value) {
            value = Scrapper.getTrimValue(value);
        }
        return value;
    }

    static getTempsFromLocator(selector) {
        var value = Scrapper.getTrimValue($(selector).text());
        if (!value) {
            throw new ScrapperException(`Hores en posició "${selector}" no trobades.`);
        }
        return Temps.fromString(value);
    }

    static getTrimValue(value) {
        return value.trim(/[\s\t\r\n]+/);
    }

    static getPaginacio(url, callback, offset = 0, max = PAGINACIO_MAX) {
        var deferred = $.Deferred();
        $.get(url + `&max=${max}&offset=${offset}`).done(function(data) {
            var elems = callback(data);
            if (elems.length > 0) {
                Scrapper.getPaginacio(url, callback, offset + max).done(function (moreElems) {
                    deferred.resolve(elems.concat(moreElems));
                });
            }
            else {
                deferred.resolve(elems);
            }
        }).fail(function() {
            throw new HttpRequestException(this);
        });
        return deferred;
    }

    static get(url, callback) {
        var deferred = $.Deferred();
        $.get(url).done(function(data) {
            deferred.resolve(callback(data));
        }).fail(function() {
            throw new HttpRequestException(this);
        });
        return deferred;
    }
}