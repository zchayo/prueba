function formatoLink(container, options, url, esMoneda) {

    var span = document.getElementsByClassName("closeModal")[0];
    var modal = document.getElementById("myModal");
    var iframe = document.getElementById("modalIframe");
    span.onclick = function () {
        modal.style.display = "none";
    }

    var linkClicked = false;
    var valor = options.value;
    if (esMoneda) {
        valor = options.value.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
    }
    $("<a />")
        .text(valor)
        .css("color", "blue")
        .css("text-decoration", "none")
        .on("mouseenter", function () {
            $(this).css("cursor", "pointer");
            $(this).css("color", "purple");
        })
        .on("mouseleave", function () {
            if (!linkClicked) {
                $(this).css("color", "blue");
            }
        })
        .on("click", function () {
            linkClicked = true;
            $(this).css("color", "purple");
            iframe.src = url;
            modal.style.display = "block";

        })
        // .attr("href", url)
        // .attr("target", "_blank")
        .appendTo(container);
}

var opcionesGenerales = {
    filterRow: {
        visible: true,
        applyFilter: 'auto',
    },
    searchPanel: {
        visible: true,
        width: 240,
        placeholder: 'Search...',
    },
    headerFilter: {
        visible: true,
    },
    allowColumnReordering: true,
    groupPanel: {
        visible: true,
    },
    columnAutoWidth: true,
    allowColumnResizing: true,
    showBorders: true,
    paging: {
        pageSize: 5,
    },
    pager: {
        visible: true,
        allowedPageSizes: [5, 10, 'all'],
        showPageSizeSelector: true,
        showInfo: true,
        showNavigationButtons: true,
    },
};

function crearDataGrid (gridConteiner, opcionesEspecificas) {
    var opcionesFinales = $.extend({}, opcionesGenerales, opcionesEspecificas);
    $(gridConteiner).dxDataGrid(opcionesFinales);
}

