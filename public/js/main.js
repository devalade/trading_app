import { container } from './components/chart/Chart.js';

// GRAB HTML ELEMENT
const sellButton = document.querySelector('#sell');
const buyButton = document.querySelector('#buy');


const socket = io.connect();
// écoute du socket news
socket.on('news', function(msg){
    console.log(msg)
});

const sellAction = () => {
    console.log("Insertion du bid price dans la base de donnees");
    const datas = {
        assetId: '1',
        investement_amount: '200',
        trade_type: 1
    }
    socket.emit('sellAction', {datas})

}

sellButton.addEventListener('click', sellAction);


document.querySelector('#tv-chart').appendChild(container);