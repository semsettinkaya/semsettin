var theme = "ui-redmond";
var theme_sunny = "ui-sunny";

$(document).ready(function () {

    Nesneler_Admin_Default();

});




function Nesneler_Admin_Default() {

    $('#list').jqxListMenu({ theme: theme, autoSeparators: true, enableScrolling: false, showHeader: true, showFilter: true, width: '100%', placeHolder: 'Find contact...' });

    $("#jqx-listmenu-item-0").text("hme");

    $(".haber-item-onay").jqxButton({ theme: theme, width: 125 });
    $("#btnOnayVer").jqxButton({ theme: theme, width: 125 });
    $("#btnOnayIptal").jqxButton({ theme: theme, width: 125 });
    $("#btnYayindanKaldir").jqxButton({ theme: theme, width: 125 });

    var source = [
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../App_Themes/img/haberfoto/ecmwf_20x20.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxNumberInput</span></div>", title: 'jqxNumberInput' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/progressbar.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxProgressBar</span></div>", title: 'jqxProgressBar' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/calendar.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxCalendar</span></div>", title: 'jqxCalendar' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/button.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxButton</span></div>", title: 'jqxButton' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/dropdownlist.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxDropDownList</span></div>", title: 'jqxDropDownList' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/listbox.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxListBox</span></div>", title: 'jqxListBox' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/tooltip.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxTooltip</span></div>", title: 'jqxTooltip' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/scrollbar.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxScrollBar</span></div>", title: 'jqxScrollBar' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/datetimeinput.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxDateTimeInput</span></div>", title: 'jqxDateTimeInput' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/expander.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxExpander</span></div>", title: 'jqxExpander' },
                   { html: "<div style='height: 20px; float: left;'><img style='float: left; margin-top: 2px; margin-right: 5px;' src='../../images/menu.png'/><span style='float: left; font-size: 13px; font-family: Verdana Arial;'>jqxMenu</span></div>", title: 'jqxMenu' },
    ];
    // Create a jqxDropDownList
    $("#haber-detay-tur").jqxDropDownList({ source: source, selectedIndex: 0, width: '200', height: '25px', theme: theme });


}