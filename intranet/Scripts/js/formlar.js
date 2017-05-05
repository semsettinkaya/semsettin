/// <reference path="../../jQuery/scripts/heartcode-canvasloader-min-0.9.1.js" />
var theme = "ui-redmond";
var loader;
$(document).ready(function () {


    $.getScript('../../jQuery/scripts/heartcode-canvasloader-min-0.9.1.js', function () {
        // Loader
        loader = new CanvasLoader('canvasloader-container');
        loader.setColor('#f07416'); // default is '#000000'
        loader.setDiameter(52); // default is 40
        loader.setDensity(77); // default is 40
        loader.setRange(1); // default is 1.3
        loader.setSpeed(4); // default is 2
        loader.setFPS(19); // default is 24


        // This bit is only for positioning - not necessary
        var loaderObj = document.getElementById("canvasLoader");
        loaderObj.style.position = "absolute";
        loaderObj.style["top"] = loader.getDiameter() * -0.5 + "px";
        loaderObj.style["left"] = loader.getDiameter() * -0.5 + "px";
    });

    $("#register").jqxExpander({ toggleMode: 'none', width: '100%', showArrow: false, theme: theme });
    $('#btnKaydet').jqxButton({ width: 150, height: 50, theme: theme });
    $('#btnOtoGetir').jqxButton({ width: 200, height: 25, theme: theme });
    
    $('#btnOtoGetir').on('click', function () {
       
      
        loader.show();
        $("#dialog-message").hide();
        $('#txtAd').val("");
        $('#txtSoyad').val("");
        $('#txtBirim').val("");
        $('#txtEmail').val("");
        $('#txtTelefon').val("");
        $('#txtBaskanlikBolge').val("");
        OtomatikBilgiTamamlama($('#txtSicilNo').val());

    });

    $("#progressbar").progressbar({
        value: false
    });
    $("#dialog-message").hide();

    $("#KayitEdiliyor").dialog({
        modal: true,
        autoOpen: false,
        hide: {
            effect: "explode",
            duration: 500
        }
    });

   

    $("#panelKayitTamamlandi").hide();

    $("#formKisiBilgileri").jqxExpander({ width: '100%', theme: theme, expandAnimationDuration: 350, expanded: false, animationType: "slide" });
    $("#formIcerikBilgileri").jqxExpander({ width: '100%', theme: theme, expandAnimationDuration: 350, expanded: true, animationType: "slide" });

    $('#btnKaydet').on('click', function () {

       
       
       
        var IsValid = $('#formHaber').jqxValidator('validate');
        if (IsValid) {
            $("#KayitEdiliyor").dialog("open")
            FormKaydet();
        }
        else
            $('#formKisiBilgileri').jqxExpander('expand');

    });


    $("#btnHaberTurleri").jqxButtonGroup({ theme: theme, mode: 'radio' });
    $('#btnHaberTurleri').jqxButtonGroup('setSelection', 0);

    $("#btnHaberYeri").jqxButtonGroup({ theme: theme, mode: 'radio' });
    $('#btnHaberYeri').jqxButtonGroup('setSelection', 0);

    $("#btnEkDosyaDurumu").jqxSwitchButton({ thumbSize: '50%', theme: theme, width: '150', checked: false, onLabel: 'VAR', offLabel: 'YOK' });

    $("#btnEkDosyaDurumu").bind('change', function (event) {      

        uploader.SetVisible(event.args.check);
       
    });

    $('#txtYayinSuresi').jqxSlider({ min: 1, max: 30, ticksFrequency: 8, value: 3, step: 1, theme: theme, ticksPosition: 'top', mode: 'fixed' });
    $('#txtYayinSuresi').on('change', function (event) {      

        $('#lblYayinSuresi').text(parseInt( event.args.value) + " Gün.");
    });

    $("#txtTarih").jqxDateTimeInput({ formatString: 'dd MMMM yyyy, dddd', culture: 'tr-TR', height: 25, width: 300 });

    // $("#txtTelefon").jqxMaskedInput({ mask: '(###)###-####', width: 200, height: 22, theme: theme });
   
    $('.text-input').jqxInput({ theme: theme });
   

    // initialize validator.
    $('#formHaber').jqxValidator({
        hintType: 'label',
        animationDuration: 0,
        rules: [
               { input: '#txtSicilNo', message: 'Sicil numarasını giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtAd', message: 'Adınızı giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtSoyad', message: 'Soyadınızı giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtBirim', message: 'Biriminizi giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtBaskanlikBolge', message: 'Başkanlık/Bölge giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtEmail', message: 'E-posta adresini giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtEmail', message: 'Geçersiz e-posta adresi!', action: 'keyup', rule: 'email' },              
               { input: '#txtTelefon', message: 'Geçersiz telefon numarası!', action: 'valuechanged, blur', rule: 'required' },
               { input: '#txtBaslik', message: 'Haber başlığını giriniz!', action: 'keyup, blur', rule: 'required' },
               { input: '#txtIcerik', message: 'Haber içeriğini giriniz!', action: 'keyup, blur', rule: 'required' }


        ], theme: theme
    });


    
   
});



/* 1. İşlem Forma ait nitelik bilgileri DB ye kayıt edilir.
   2. İşlem sonunda Kayıta ait Haber No döner
   3. HaberNo callback aracılığı ile code behind tarafında Sessione yazılır
   4. cp callback nesnesinin Callback completed olayında ise ek dosya var ise uploder nesneni upload işlemini başlatır.
   5. Code behind tarafında upload işlemleeri yapılır
   6. Uploader nesnesi tüm dosyları sunucuya aldıktan sonra fliesComleted olayı gerçekleşir.
   7. Bu olayda işlemler birmiş demektir.
   8. Açık olan tüm dialog ve indetermite nesneleri tekrar kapatılır
   */


// işlem 1
function FormKaydet() {

   
    var govde = new Object();

    govde.GonderenSicil = $('#txtSicilNo').val();
    govde.GonderenAdi = $('#txtAd').val();
    govde.GonderenSoyadi = $('#txtSoyad').val();
    govde.GonderenBirim = $('#txtBirim').val();
    govde.GonderenBaskanlik = $('#txtBaskanlikBolge').val();
    govde.GonderenEposta = $('#txtEmail').val();
    govde.GonderenTelefon = $('#txtTelefon').val(); 


    govde.Tur = $('#btnHaberTurleri').jqxButtonGroup('getSelection');
    govde.Baslik = $('#txtBaslik').val();
    govde.Icerik = $('#txtIcerik').val();

    govde.KayitTarihi = new Date();
    govde.BaslangicTarihi = $('#txtTarih').jqxDateTimeInput('getDate');
    govde.YayinSuresi = parseInt($('#txtYayinSuresi').jqxSlider('getValue'));
    govde.BitisTarihi = null;

    govde.EkDosyaVarMi = $("#btnEkDosyaDurumu").val();
    govde.FotoGaleriMi = null;
   
    govde.OnemDerecesi = null;
    govde.Onaylayan = null;
    govde.OnayTarihi = null;
    govde.OnayDurumu = false;
    govde.OnayGerekcesi = null;
    govde.YayınYeri = $('#btnHaberYeri').jqxButtonGroup('getSelection');





    $.ajax({
        type: "POST",
        url: "intranet_webservice.asmx/Form_Kayit",
        data: JSON.stringify({ govde: govde }),
        contentType: "application/json; charset=utf-8",
        dataType: "json",
        success: handleHtml,
        error: ajaxFailed
    });

    function ajaxFailed(xmlRequest) {
      
        alert(xmlRequest);
    }

    function handleHtml(data, status) {     
       
        if (data.d != null) {
          // işlem 2
            cp.PerformCallback(data.d.toString());
           
        }
    }



}


function cp_CallBack_Completed(e) {

    if (e.result == "1") {
        uploader.Upload();
    }
    else if (e.result == "2") {
        $("#KayitEdiliyor").dialog("close");
    }
    

}

function  uploader_Files_Completed()
{
    $("#formHaber").hide();
    $("#panelKayitTamamlandi").show();
    cp.PerformCallback("mail");
}



function OtomatikBilgiTamamlama(sicil) {

    $.ajax({
        type: "POST",
        url: "../intranet_webservice.asmx/PersonelGetir",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: '{"sicilNo":"'+sicil+'"}',
        success: handleHtml,
        error: ajaxFailed
    });

    function ajaxFailed(xmlRequest) {
        loader.hide();
        alert(xmlRequest.status + ' \n\r ' +
        xmlRequest.statusText + '\n\r' +
        xmlRequest.responseText);

        

        $("#dialog-message").show();
        $("#dialog-message").dialog({
            modal: true,
            autoOpen: false,

            hide: {
                effect: "explode",
                duration: 500
            },
            buttons: {
                Ok: function () {
                    $(this).dialog("close");
                }
            }
        });

        $('#formKisiBilgileri').jqxExpander('expand');
        
    }

    function handleHtml(data, status) {
        loader.hide();
    
        if (data.d != null) {

            var personel = data.d;
           
            $('#txtAd').val(personel.Adi);
            $('#txtSoyad').val(personel.Soyadi);
            $('#txtBirim').val(personel.Birimi);
            $('#txtEmail').val(personel.Mail);
            $('#txtTelefon').val(personel.Telefon);
            $('#txtBaskanlikBolge').val(personel.BaskanlikBolge);

            var msj = "Gönderici Bilgileri | Sn." + personel.Adi + " " + personel.Soyadi + " bilgilerinizi görmek için tıklayınız";
            $('#formKisiBilgileri').jqxExpander('setHeaderContent', msj);

        }
        else {

            var msj = "Gönderici Bilgileri | Personel bilgilerine erişilemiyor";
            $('#formKisiBilgileri').jqxExpander('setHeaderContent', msj);

            $("#dialog-message").show();
            $("#dialog-message").dialog({
                modal: true,
                autoOpen: true,

                hide: {
                    effect: "explode",
                    duration: 500
                },
                buttons: {
                    Ok: function () {                     
                        $(this).dialog("close");
                     
                    }
                }
            });
            $('#txtSicilYok').text($('#txtSicilNo').val());
            $('#formKisiBilgileri').jqxExpander('expand');
            $('#txtSicilNo').val("");
        }

        data = null;

    }

}



