var theme = "ui-redmond";

$(document).ready(function () {

    Nesneler_Master();

});




function Nesneler_Master() {



    $("#adminMenu").jqxMenu({ width: '100%', height: '30px', theme: theme, showTopLevelArrows: true });
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

  

    var d = 300;
    $('#navigation a').each(function () {
        $(this).stop().animate({
            'marginTop': '-60px'
        }, d += 150);
    });

    $('#navigation > li').hover(
    function () {
        $('a', $(this)).stop().animate({
            'marginTop': '-22px'
        }, 500);
    },
    function () {
        $('a', $(this)).stop().animate({
            'marginTop': '-60px'
        }, 500);
    }

    
);
}