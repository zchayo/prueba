$(() => {

    const cajaPequeña = document.querySelector(".caja-1");
    const cajaGrande = document.querySelector(".caja-2");
    const boton = document.querySelector(".boton")
    let esPantallaChica = false

    if (window.innerWidth <= 768) {

        esPantallaChica = true;
        // Código para dispositivos móviles
        cajaPequeña.style.display = "none";
        cajaGrande.style.flexGrow = "2";
        boton.style.display = 'block';

        $('#boton').dxButton({
            stylingMode: 'outlined',
            text: 'Menu',
            type: 'normal',
            icon: 'menu',
            onClick() {
                cajaGrande.style.display = "none";
                cajaPequeña.style.display = "block";
                cajaPequeña.style.flexGrow = "2";
            },
        });
    };





    const navigation = [
        { id: 1, text: 'Products', icon: 'product', url: 'view.tablas.html' },
        { id: 2, text: 'Sales', icon: 'money', url: 'view.graficas.html' },
        { id: 3, text: 'Customers', icon: 'group' },
        { id: 4, text: 'Employees', icon: 'card' },
        { id: 5, text: 'Reports', icon: 'chart' },
    ];

    $('#list').dxList({
        dataSource: navigation,
        hoverStateEnabled: true,
        focusStateEnabled: true,
        activeStateEnabled: true,
        searchEnabled: true,
        searchExpr: 'text',
        onItemClick(e) {
            console.log(e)
            if (esPantallaChica){
                cajaPequeña.style.display = "none";
                cajaGrande.style.display = "flex";
                cajaGrande.style.flexGrow = "2";
            }

            $('#mi-iframe').attr('src', e.itemData.url);

        }
    });






});
