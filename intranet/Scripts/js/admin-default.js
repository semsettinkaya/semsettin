var theme = "ui-redmond";
var theme_sunny = "ui-sunny";
var HABER = [];
var HABER_LIST = [];



$(document).ready(function () {

    Nesneler_Admin_Default();
    Haberleri_Oku();
});

function Nesneler_Admin_Default() {

    $('#list').jqxListMenu({ theme: theme, autoSeparators: true, enableScrolling: false, showHeader: true, showFilter: true, width: '100%', placeHolder: 'Find contact...' });

    $("#haberListe").jqxExpander({ toggleMode: 'none', width: '230px', showArrow: false, theme: theme });
    $("#haberDetaylari").jqxExpander({ toggleMode: 'none', width: '755px', showArrow: false, theme: theme });



    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    $('#suankiYil').html(year);
    $('#btnYil').jqxSlider({ min: 2006, max: year, ticksFrequency: 1, value: year, step: 1, theme: theme, width: '190px',mode:"fixed" });
    $('#btnAy').jqxSlider({ min: 1, max: 12, ticksFrequency: 1, value: month, step: 1, theme: theme, width: '190px', mode: "fixed" });

    $('#hd_OnemDerecesi').jqxSlider({ min: 1, max: 20, ticksFrequency: 1, value: 10, step: 1, width: '500', theme: theme, mode: "fixed" });

    var source = [
        { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/haberfoto/bullet_blue.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>ECMWF</span></div>", title: 'ECMWF', value: '0' },
        { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/haberfoto/bullet_green.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Sağlık</span></div>", title: 'Sağlık', value: '1' },
        { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/haberfoto/bullet_black.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Kan Aranıyor</span></div>", title: 'Kan Aranıyor', value: '2' },
        { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/haberfoto/bullet_red.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Vefat</span></div>", title: 'Vefat', value: '3' },

    ];
    // Create a jqxDropDownList
    $("#hd_HaberTuru").jqxDropDownList({ source: source, selectedIndex: 0, width: '200', height: '36px', theme: theme });

    var source = [
                 { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/timeline.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Onay Bekliyor</span></div>", title: 'Onay Bekliyor', value: '0' },
                 { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/accept.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>ONAY</span></div>", title: 'ONAY', value: '1' },
                 { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/delete.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>RED</span></div>", title: 'RED', value: '2' },
                 { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/world_delete.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Yayından Kaldır</span></div>", title: 'Yayından Kaldır', value: '3' },
                 { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/world_delete.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>Yayından Kaldır</span></div>", title: 'Yeniden Yayınla', value: '4' }
    ];
    // Create a jqxDropDownList
    $("#hd_Islemler").jqxDropDownList({ source: source, selectedIndex: 0, width: '200', height: '36px', theme: theme });


    $("#hd_baslangic").jqxDateTimeInput({ formatString: 'dd MMMM yyyy, dddd', culture: 'tr-TR', height: 25, width: 200, theme: theme });
    $("#hd_bitis").jqxDateTimeInput({ formatString: 'dd MMMM yyyy, dddd', culture: 'tr-TR', height: 25, width: 200, theme: theme });

    $("#hd_yayinSuresi").jqxMaskedInput({ width: 150, height: 25, mask: '### Gün', theme: theme });

    var source = [
               { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/network-share.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>INTRANET</span></div>", title: 'INTRANET', value: '0' },
               { html: "<div style='height: 36px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/www_page.png'/><span style='float: left; font-size: 15px;line-height:36px;vertical-align:middle'>www.mgm.gov.tr</span></div>", title: 'www.mgm.gov.tr', value: '1' }
    ];
    // Create a jqxDropDownList
    $("#hd_yayinyeri").jqxDropDownList({ source: source, selectedIndex: 0, width: '200', height: '36px', theme: theme });


    $("#btnKaydet").jqxButton({ theme: theme_sunny });

    $("#btnKaydet").on('click', function () {
        Haberi_Guncelle();
    });



}



function Tum_Haberler_Alindi(data) {
    

    var source_listbox = [];
    for (index in data.d) {

        var dateString = data.d[index].Icerik.KayitTarihi;


        var date = new Date(parseInt(dateString.replace(/\/Date\((\d+)\)\//, '$1')));
        var k = date.toLocaleDateString();

        source_listbox.push({
            group: date.toLocaleDateString(),
            label: data.d[index].Icerik.Baslik,
            value: data.d[index].Icerik.No
        });

    }

    $("#listeHaberBaslik").jqxListBox({ source: source_listbox, width: 190, height: 562, theme: theme });

    
    // update events.
    $("#listeHaberBaslik").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                HaberSecildi(item.value);             
            }
        }
    });
}

function HaberSecildi(haberNo) {

    // var whereExample1 = JSLINQ(myList).Where(function (item) { return item.FirstName == "Chris"; });
    var secilenHaber = JSLINQ(HABER).Where(function (item) { return item.Icerik.No == haberNo }).items[0];
    alert("ssdf");
   
    $("#hd_Islemler").jqxDropDownList('selectIndex', secilenHaber.Icerik.OnayDurumu);

    $("#hd_yayinyeri").jqxDropDownList('selectIndex', secilenHaber.Icerik.YayinYeri);
    
    $('#hd_gerekce').val(secilenHaber.Icerik.OnayGerekcesi);
    $("#hd_HaberTuru").jqxDropDownList('selectIndex', secilenHaber.Icerik.Tur);
    $('#hd_baslik').val(secilenHaber.Icerik.Baslik);
    $('#hd_icerik').val(secilenHaber.Icerik.Icerik);
  
    
  
    $('#haber-ekdosya-yok').css("display", "none");
    $('#haber-detay-ekler').css("display", "none");
    var source_ekdosya = [];
    if (secilenHaber.Icerik.EkDosyaVarMi) {
        for (ek in secilenHaber.Ekler)
            source_ekdosya.push("<a href='../Data/EkDosyalar/" + secilenHaber.Ekler[ek].Adres + "' target='_blank'>" + secilenHaber.Ekler[ek].Ad + " ( " + (parseFloat(secilenHaber.Ekler[ek].Boyut) / 1024 / 1024).toFixed(2) + " MB.) </a>");
    }

    if (source_ekdosya.length > 0) {
        $("#haber-detay-ekler").jqxListBox({ width: "595", source: source_ekdosya, checkboxes: true, height: 80, theme: theme });
        $('#haber-detay-ekler').css("display", "inherit");
    }
    else {
        $('#haber-ekdosya-yok').css("display", "inherit");
    }   
    
    $('#hd_sicil').val(secilenHaber.Icerik.GonderenSicil);
    $('#hd_ad').val(secilenHaber.Icerik.GonderenAdi);
    $('#hd_soyad').val(secilenHaber.Icerik.GonderenSoyadi);
    $('#hd_eposta').val(secilenHaber.Icerik.GonderenEposta);
    $('#hd_birim').val(secilenHaber.Icerik.GonderenBirim);
    $('#hd_bolge').val(secilenHaber.Icerik.GonderenBaskanlik);
    $('#hd_tel').val(secilenHaber.Icerik.GonderenTelefon);


    var tmpDate = new Date(parseInt(secilenHaber.Icerik.BaslangicTarihi.replace(/\/Date\((\d+)\)\//, '$1')));
    $('#hd_baslangic ').jqxDateTimeInput('setDate', tmpDate);

    $('#hd_yayinSuresi').val(secilenHaber.Icerik.YayinSuresi);

    tmpDate = new Date(parseInt(secilenHaber.Icerik.BitisTarihi.replace(/\/Date\((\d+)\)\//, '$1')));
    $('#hd_bitis').jqxDateTimeInput('setDate', tmpDate);

}

function Haberleri_Oku() {
    $.ajax({
        type: "POST",
        url: "../intranet_webservice.asmx/Tum_Haberler",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: '',
        success: handleHtml,
        error: ajaxFailed
    });

    function ajaxFailed(xmlRequest) {
        alert(xmlRequest.status + ' \n\r ' +
        xmlRequest.statusText + '\n\r' +
        xmlRequest.responseText);
    }

    function handleHtml(data, status) {
        HABER = data.d;
        Tum_Haberler_Alindi(data);
    }
}




function HaberiOnayla() {

    var haber = {};
    haber.GonderenSicil=$('#hd_sicil').val();
    haber.GonderenAdi=$('#hd_ad').val();
    haber.GonderenSoyadi=$("#hd_soyad").val();
    haber.GonderenBirim=$("#hd_eposta").val();
    haber.GonderenBaskanlik=$("#hd_birim").val();
    haber.GonderenEposta=$("#hd_bolge").val();
    haber.GonderenTelefon=$("#hd_tel").val();

    var item = $("#hd_HaberTuru").jqxDropDownList('getSelectedItem'); 
    haber.Tur=item.value;
    haber.Baslik=$("#hd_baslik").val();
    haber.Icerik=$("#hd_icerik").val();

    haber.KayitTarihi = new Date();
    haber.BaslangicTarihi=$("#hd_baslangic").val();
    haber.YayinSuresi=$("#hd_yayinSuresi").val();
    haber.BitisTarihi=$("#hd_bitis").val();

    haber.EkDosyaVarMi = true;
    haber.FotoGaleriMi = true;



    haber.OnemDerecesi = $("#hd_OnemDerecesi").val();
    haber.Onaylayan=""
    haber.OnayTarihi = new Date();

    var item = $("#hd_Islemler").jqxDropDownList('getSelectedItem');
    haber.OnayDurumu = item.value;
   

    haber.OnayGerekcesi = $("#hd_gerekce").val();

    var item = $("#hd_yayinyeri").jqxDropDownList('getSelectedItem'); 
    haber.YayınYeri = item.value;

   

    return haber;

}

function Haberi_Guncelle() {

    var data = HaberiOnayla();
    var DTO = { 'Govde': data };
    $.ajax({
        type: "POST",
        url: "../intranet_webservice.asmx/Form_Kayit",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: JSON.stringify(DTO),
        success: handleHtml,
        error: ajaxFailed
    });

    function ajaxFailed(xmlRequest) {
        alert(xmlRequest.status + ' \n\r ' +
        xmlRequest.statusText + '\n\r' +
        xmlRequest.responseText);
    }

    function handleHtml(data, status) {
        var t = data.d;
    }
}