var theme = "ui-redmond";
var Sehir = null;
var SolMenu = [];
$(document).ready(function () {
    //getLocation();

    Nesneler();
    UyariDegerlendirmeOku();
    Haber_Basliklari();

});




function Nesneler() {


    var year = new Date().getFullYear();
    var month = new Date().getMonth() + 1;
    $('#suankiYil').html(year);
    $('#btnYil').jqxSlider({ min: 2006, max: year, ticksFrequency: 1, value: year, step: 1, theme: theme, width: '180' });
    $('#btnAy').jqxSlider({ min: 1, max: 12, ticksFrequency: 1, value: month, step: 1, theme: theme, width: '180' });



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


    $("#footer-box").jqxExpander({ toggleMode: 'none', width: '100%', showArrow: false, theme: theme });


    var d = 300;
    $('#navigation a').each(function () {
        $(this).stop().animate({
            'marginTop': '-80px'
        }, d += 150);
    });

    $('#navigation > li').hover(
    function () {
        $('a', $(this)).stop().animate({
            'marginTop': '-2px'
        }, 500);
    },
    function () {
        $('a', $(this)).stop().animate({
            'marginTop': '-80px'
        }, 500);
    }


);



}




function Haber_Basliklari() {

    var source = [{
        label: "Peppermint Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "Salted Caramel Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "White Hot Chocolate",
        value: "Chocolate Beverage",
        group: "Hot Chocolate"
    }, {
        label: "Caffe Americano",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caffe Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caffe Mocha",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Cappuccino",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caramel Brulee Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caramel Macchiato",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Peppermint Hot Chocolate",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Cinnamon Dolce Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Eggnog Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Espresso",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Espresso Con Panna",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Espresso Macchiato",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Flavored Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Gingerbread Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "White Chocolate Mocha",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Skinny Peppermint Mocha",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Skinny Flavored Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Pumpkin Spice Latte",
        value: "Espresso Beverage",
        group: "Espresso"
    }, {
        label: "Caffe Vanilla Frappuccino",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Caffe Vanilla Frappuccino Light",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Caramel Brulee Frappuccino",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Caramel Brulee Frappuccino Light",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Eggnog Frappuccino",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Mocha Frappuccino",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }, {
        label: "Tazo Green Tea Creme Frappuccino",
        value: "Frappuccino Blended Beverage",
        group: "Frappuccino"
    }]



    // Create a jqxListBox
    $("#listeHaberBaslik").jqxListBox(
        {
            source: source, width: '98%', height: 700, theme: theme,
            renderer: function (index, label, value) {
                var datarecord = source[index];
                var span = "<span style='font-size:10px'>" + label + "</span>";
                return span;
            }


        });

    // update events.
    $("#listeHaberBaslik").on('select', function (event) {
        if (event.args) {
            var item = event.args.item;
            if (item) {
                //var valueelement = $("<div></div>");
                //valueelement.text("Value: " + item.value);               
            }
        }
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


// UYARI DEGERLENDIRME
function UyariDegerlendirmeOku() {

    $.ajax({
        type: "GET",
        url: "Data/UyariDegerlendirme/yihbarindex.xml",
        dataType: "xml",
        success: function (xml) {
            var adet = 0;
            var t = "<ul class='marque_liste'>"
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
                $("#uyari").css("visibility", "collapse");
            else
                $("#uyari").css("visibility", "visible");


        }
    });

}