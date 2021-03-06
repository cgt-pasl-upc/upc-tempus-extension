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

    static getSaldo(any) {
        var callback = function(responseText) {
            return {
                "H. teo.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(2)"),
                "H. treb.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(3)"),
                "H.p.n.r.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(4)"),
                "H.p.r.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(5)"),
                "S.m.": Scrapper.getTempsFromLocator("#tableList tr:last td:nth-child(6)")
            };
        };
        return Scrapper.post("https://tempus.upc.edu/RLG/saldoMensual/list", { "any": any }, callback);
    }

    static getTempsFromLocator(selector) {
        var value = $(selector).text();
        if (!value) {
            throw new ScrapperException(`Hores en posició "${selector}" no trobades.`);
        }
        return new Temps(parseInt(value.split(':')[0]), parseInt(value.split(':')[1]));
    }
   
    static getPermisosPerDies(inici,final) {
        var callback = function(responseText) {
            var permisos = Array();
            $(responseText).find("#tableList > tbody > tr:not(.comentari)").each(function(index) {
                var data1 = $(this).find("td:nth-child(1)").text().trim(/[\s,]+/);
                var data2 = $(this).find("td:nth-child(2)").text().trim(/[\s,]+/);
                var tipus = $(this).find("td:nth-child(4)").text().trim(/[\s,]+/);
                if (data1 || data2 || tipus) {
                    if (!data1)
                        throw new ScrapperException("Data del permís per dies no trobada.");
                    if (!data2)
                        throw new ScrapperException("Data del permís per dies no trobada.");
                    if (data1 != data2)
                        throw new ScrapperException(`Dates de permís diferents (${data1}<>${data2}).`);
                    if (!tipus)
                        throw new ScrapperException("Tipus del permís per dies no trobat.");
    
                    var permis = PermisManager.createPermisDiesPerNom(data1, tipus);
                    permisos.push(permis);
                }
            });
            return permisos;
        };
        return Scrapper.getPaginacio(`https://tempus.upc.edu/RLG/permisDies/list?filtreAnyGaudiment=Tots&dataInici=${inici}&dataFi=${final}`, callback);
    }
    
    static getPermisosPerHores(inici, final) {
        var callback = function(responseText) {
            var permisos = Array();
            $(responseText).find("#tableList > tbody > tr:not(.comentari)").each(function(index) {
                var data = $(this).find("td:nth-child(1)").text().split(/[\t\n]+/)[1]; // TODO: Hauria de ser 0
                var temps = $(this).find("td:nth-child(1)").text().split(/[\t\n]+/)[2]; // TODO: Hauria de ser 1
                var tipus = $(this).find("td:nth-child(3)").text().trim();
                if (data || temps || tipus) {
                    if (!data)
                        throw new ScrapperException("Data del permís per hores no trobada.");
                    if (!temps)
                        throw new ScrapperException("Durada del permís per hores no trobada.");
                    if (!tipus) {
                        throw new ScrapperException("Tipus del permís per hores no trobat.");
                    }

                    var permis = PermisManager.createPermisHoresPerNom(data, new Temps(temps.split(':')[0], temps.split(':')[1]), tipus);
                    permisos.push(permis);
                }
            });
            return permisos;
        };
        return Scrapper.getPaginacio(`https://tempus.upc.edu/RLG/permisHores/list?dataInici=${inici}&dataFi=${final}&_action_list=Cerca`, callback);
    }
    
    static getPaginacio(url, callback, offset = 0, max = PAGINACIO_MAX) {
        var deferred = $.Deferred();
        var req = new XMLHttpRequest();
        req.open('GET', url + `&max=${max}&offset=${offset}`, true);
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    var elems = callback(req.responseText);
                    if (elems.length > 0) {
                        $.when(Scrapper.getPaginacio(url, callback, offset + max)).done(function (moreElems) {
                            deferred.resolve(elems.concat(moreElems));
                        });
                    }
                    else {
                        deferred.resolve(elems);
                    }
                }
                else {
                    throw new HttpRequestException(req);
                }
            }
        };
        req.send(null);
        return deferred;
    }

    static get(url, callback) {
        var deferred = $.Deferred();
        var req = new XMLHttpRequest();
        req.open('GET', url, true);
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    deferred.resolve(callback(req.responseText));
                }
                else {
                    throw new HttpRequestException(req);
                }
            }
        };
        req.send(null);    
        return deferred;
    }

    static post(url, parameters, callback) {
        var deferred = $.Deferred();
        var req = new XMLHttpRequest();
        var data = new FormData();
        Object.keys(parameters).forEach(function(key) {
            data.append(key, parameters[key]);
        });

        req.open('POST', url, true);
        req.onreadystatechange = function (ev) {
            if (req.readyState == 4) {
                if(req.status == 200) {
                    deferred.resolve(callback(req.responseText));
                }
                else {
                    throw new HttpRequestException(req);
                }
            }
        };
        req.send(data);
        return deferred;
    }
}