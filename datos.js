Promise.all([fetch('db/clientes.json'), fetch('db/ventas.json'), fetch('db/productos.json'), fetch('db/pagos.json'),])
    .then(respuestas => Promise.all(respuestas.map(res => res.json())))
    .then(datos => {
        let clientes = datos[0];
        let ventas = datos[1];
        const productos = datos[2];
        const pagos = datos[3];

        ventas = ventas.map(venta => {
            let producto = productos.find(prod => prod.ID == venta.producto)
            venta.producto = producto.producto
            return {
                ...venta,
                precio: producto.precio,
                total: producto.precio * venta.cantidad
            }
        })

        clientes.forEach((cliente, index) => {

            let comprasFiltradas = ventas.filter(
                venta => venta.cliente == cliente.ID
            )
            let numeroCompras = comprasFiltradas.length
            let precioTotal = comprasFiltradas.reduce((acumulador, compra) => {
                return acumulador + compra.total
            }, 0)
            let pagosCliente = pagos.filter(p => p.cliente == cliente.ID)
            let pagosTotal = pagosCliente.reduce((acumulador, v) => acumulador + v.cantidad, 0)

            let total = precioTotal - pagosTotal

            clientes[index] = { ...cliente, numeroCompras, precioTotal, pagosTotal, total }
        });

        $(() => {

            crearDataGrid('#gridContainer',
                {
                dataSource: clientes,
                keyExpr: 'ID',
                columns: [
                    {
                        dataField: 'FirstName',
                        caption: 'Nombre',
                        alignment: 'center',
                    },
                    {
                        dataField: 'LastName',
                        caption: 'Apellido',
                        alignment: 'center',
                    },
                    {
                        dataField: 'numeroCompras',
                        caption: 'Cantidad de compras',
                        alignment: 'center',
                    },
                   
                     {
                        dataField: 'precioTotal',
                        alignment: 'center',
                        caption: 'Ventas',
                        cellTemplate: function (container, options) {
                            var url = `ventasCliente.html?id=${options.data.ID}`
                            formatoLink(container, options, url, true);
                        },
                    },
                    {
                        dataField: 'pagosTotal',
                        alignment: 'center',
                        caption: 'Pagos',
                        cellTemplate: function (container, options) {
                            var url = `pagosCliente.html?id=${options.data.ID}&precioTotal=${options.data.precioTotal}&pagosTotal=${options.data.pagosTotal} `
                            formatoLink(container, options, url, true);
                        },
                    },
                    {
                        dataField: 'total',
                        alignment: 'center',
                        format: 'currency',
                    },
                ],
            });
            


                });
    })
    .catch(error => console.error(error))


