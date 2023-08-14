$(() => {
  const navigation = [
    { id: 1, text: 'Products', icon: 'product', url: 'view.tablas.html' },
    { id: 2, text: 'Sales', icon: 'money', url: 'view.graficas.html' },
    { id: 3, text: 'Customers', icon: 'group', url: 'https://www.mercadolibre.com.mx/'},
    { id: 4, text: 'Employees', icon: 'card' },
    { id: 5, text: 'Reports', icon: 'chart' },
  ];

  $('#responsive-box').dxResponsiveBox({
    rows: [
      { ratio: 1 },
      { ratio: 8,  shrink: 20 },
    //  { ratio: 10, screen: 'sm' }
      // { ratio: 16, screen: 'sm' }
    ],
    cols: [
      { ratio: 1 },
      { ratio: 4, screen: 'lg' },
    ],
    singleColumnScreen: 'sm',
    screenByWidth(width) {
      return (width < 700) ? 'sm' : 'lg';
    },
  });

  $('#list').dxList({
    dataSource: navigation,
    hoverStateEnabled: true,
    focusStateEnabled: true,
    activeStateEnabled: true,
    onItemClick(e) {

      console.log(e)
      $('#mi-iframe').attr('src', e.itemData.url);
    }


  });






});
