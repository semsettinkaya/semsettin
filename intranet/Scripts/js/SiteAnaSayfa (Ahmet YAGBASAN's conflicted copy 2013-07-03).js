var theme = "ui-redmond";
var Sehir = null;
var SolMenu = [];
$(document).ready(function () {
    //getLocation();

    Nesneler();
    SolMenuOlustur();
    UyariDegerlendirmeOku();
});




function Nesneler() {

    $("#txtRehberGoogle").jqxInput({ placeHolder: "Rehber/Google ARA...", height: 20, width: 170, theme: theme });
    $("#btnRehberGoogleAra").jqxButtonGroup({ theme: theme, mode: 'radio' });








    $("#GoogleARA").on('click', function () {
        var anahtar = $("#txtRehberGoogle").val();
        if (anahtar.toString().length > 0 && anahtar.toString() != "Rehber/Google ARA...")
            window.open('http://www.google.com/search?q=' + anahtar, '_blank')
    });


    $("#RehberARA").on('click', function () {

        var anahtar = $("#txtRehberGoogle").val();
        if (anahtar.toString().length > 0 && anahtar.toString() != "Rehber/Google ARA...")
            window.open('http://rehber.mgm.gov.tr?anahtar=' + anahtar, '_blank')

    });







}








// CLIENT air ŞEHRIN HAVA DURUMU

function getLocation() {

    $.get('http://jsonip.com', function (res) {



        try {
            var ip = res.ip;

            $.jqIpLocation({
                ip: ip,
                locationType: 'city',
                success: function (location) {

                    Sehir = location.cityName;
                    $('#MerkezAdi').text(location.cityName + '-' + ip);

                    HavaDurumunuGetir();
                }
            });
        }
        catch (ex) {

        }
    });
}

function HavaDurumunuGetir() {


    $.ajax({
        type: "GET",
        url: "http://172.30.0.29/meteoroloji.asmx",
        cache: false,
        contentType: "application/json; charset=utf-8",
        data: '{"TahminiIstenenMerkez":"ANKARA"}',
        success: handleHtml,
        error: ajaxFailed
    });

    function ajaxFailed(xmlRequest) {
        alert(xmlRequest.status + ' \n\r ' +
        xmlRequest.statusText + '\n\r' +
        xmlRequest.responseText);
    }

    function handleHtml(data, status) {

        alert(data);

    }
}

// CLIENT air ŞEHRIN HAVA DURUMU BITTI


// SOL MENU
function SolMenuOlustur() {

    SolMenu = [];

    

    $.ajax({
        type: "GET",
        url: "App_Themes/xml/SolAnaMenu.xml",
        dataType: "xml",
        success: function (xml) {
            $(xml).find('Grup').each(function () {
                var Linkler = [];

                var No, Adi, SiraNo, Icon;

                var No = $(this).find('No').text();
                var Adi = $(this).find('Adi').text();
                var SiraNo = $(this).find('SiraNo').text();
                var Icon = $(this).find('Icon').text();


                $($(this).find('Linkler')).find('Link').each(function () {



                    var Link = $(this).text();
                    var Ad = $(this).attr('Ad');

                    var tmpLink = new menuLink(Ad, Link);
                    Linkler.push(tmpLink);

                });





                var tmpGrup = new menuGrup(No, Adi, SiraNo, Icon, Linkler);

                SolMenu.push(tmpGrup);
            });




            var SolMenuIcerik = "", t = "", t1 ="", t2 = "", t3 = "";

            for (var i = 0; i < SolMenu.length; i++) {


                t1 =
                    '<h3>' + SolMenu[i].Adi + '</h3>' +
                    '<div id="SolMenuLink">' +
                    '<ul >';
                t2 = "";
                for (var j = 0; j < SolMenu[i].Linkler.length; j++) {
                    var tmp = "<li><a href='" + SolMenu[i].Linkler[j].Link + "'> " + SolMenu[i].Linkler[j].Ad + "</a></li>";
                    t2 += tmp;
                }

                t3 = '</ul>' +
                   '</div>' ;

                t = t1 + t2 + t3;

                SolMenuIcerik += (t);
            }

            SolMenuIcerik = '<div class="accordion">' + SolMenuIcerik + ' </div><script> $(".accordion").accordion({ heightStyle: "content"}); </script> ';
            $("#solmenu").append(SolMenuIcerik);




        }
    });
}
function menuGrup(No, Adi, SiraNo, Icon, Linkler) {

    this.No = No;
    this.Adi = Adi;
    this.SiraNo = SiraNo;
    this.Icon = Icon;
    this.Linkler = Linkler;
    return this;
}

function menuLink(Ad, Link) {


    this.Ad = Ad;
    this.Link = Link;

    return this;
}

// SOL MENU BITTI



// UYARI DEGERLENDIRME
function UyariDegerlendirmeOku() {

    $.ajax({
        type: "GET",
        url: "Data/UyariDegerlendirme/yihbarindex.xml",
        dataType: "xml",
        success: function (xml) {
            var adet = 0;
            var t="<ul class='marque_liste'>"
            $(xml).find('index').each(function () {
              

            

                var GenelBaslik = $(this).find('GenelBaslik').text();
                var ihbarTipi = $(this).find('ihbarTipi').text();
                var eskiyeni = $(this).find('eskiyeni').text();
               
                if (eskiyeni == 'y') {
                    if (ihbarTipi == 1 || ihbarTipi == 3 || ihbarTipi == 4 || ihbarTipi == 6) {
                        t += "<li class='uyari'>" + GenelBaslik + "</li>";
                    }
                    else {
                        t += "<li class='degerlendirme'>" + GenelBaslik + "</li>";
                    }
                    adet++;
                }

             
            });

            
            t += "</ul>";

            $("#marquee").append(t);

            if (adet == 0) 
                $("#uyari").css("visibility", "hidden");
            else 
                $("#uyari").css("visibility", "visible");
            

        }
    });

}