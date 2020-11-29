import Temps from "./models/Temps.js";
import Scrapper from "./services/Scrapper.js";
import PermisManager from "./services/PermisManager.js";
import HttpRequestException from "./models/exceptions/HttpRequestException.js";

console.log("CGT-Tempus loaded.");

document.addEventListener('cgt-loader-event', function (e)
{
    console.log("CGT-Tempus loader event received");
    main(e.detail);
});

function loadStatusDialog(loader, values = {}) 
{
  $.get(loader.getURL('html/info.html')).done(function(data) {
    var $data = $(Mustache.render(data, values));
    $data.find("[data-toggle='tooltip']").tooltip();
    $("body").prepend($data);
  }).fail(function(jqXHR) {
    throw new HttpRequestException(jqXHR);
  });
}

function main(loader) {
  var any = $("form select option[selected=\"selected\"").val();
  var avui = new Date();
  if (any != avui.getFullYear()) {
    return;
  }
  var dia = String(avui.getDate()).padStart(2, '0');
  var mes = String(avui.getMonth() + 1).padStart(2, '0');
  var inici = `01/01/${any}`;
  var final = `${dia}/${mes}/${any}`;

  $.when(Scrapper.getSaldo(any), Scrapper.getPermisos(inici,final)).done(function(saldo, permisos) {
    var horesConveni = new Temps(1462); // TODO: percentageJornada <> 100% !!!!!!!!!!!!

    var horesTreballades = saldo["H. treb."];
    var horesVacances = PermisManager.sumatoriPerTipus([PermisManager.getTipusPermisPerNom('Vacances')], permisos);
    var horesAp = PermisManager.sumatoriPerTipus([PermisManager.getTipusPermisPerNom('Assumptes propis ' + any)], permisos);
    var horesNoRecuperables = PermisManager.sumatoriPerTipus(PermisManager.getTipusPermisNoRecuperables(), permisos);

    var horesRealitzades = horesTreballades.clone().suma(horesNoRecuperables).resta(horesVacances).resta(horesAp);
    var horesDiferencia = horesRealitzades.clone().resta(horesConveni);
    
    var saldoPositiu = horesDiferencia.esPositiu();
    horesDiferencia = horesDiferencia.abs();
    
    var values = {
      "HoresRealitzades": horesRealitzades.format(),
      "HoresTreballades": horesTreballades.format(),
      "HoresNoRecuperables": horesNoRecuperables.format(),
      "HoresVacances": horesVacances.format(),
      "HoresAp": horesAp.format(),
      "HoresConveni": horesConveni.format(),
      "HoresDiferencia": horesDiferencia.format(),
      "SaldoPossitiu": saldoPositiu
    };
    loadStatusDialog(loader, values);
  });
}