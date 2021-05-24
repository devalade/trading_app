
// Select DOM elemt
let domSellOrder = document.getElementById('sellOrder');
let domBuyOrder = document.getElementById('buyOrder');


//Variables


// function

function order(chart, priceOrder, ) {
    const PriceLine =  {
        price: 42267.71,
        color: '#be1238',
        lineWidth: 1,
        lineStyle: LightweightCharts.LineStyle.Dotted,
        axisLabelVisible: true,
        title: 'minimum price',
    };
}
domSellOrder.addEventListener('click', () => {
    console.log('Sell Order')
});

domBuyOrder.addEventListener('click', () => {
    console.log('Buy Order')
});
