if('serviceWorker' in navigator){
    navigator.serviceWorker.register('/sw.js')
        .then(() => {
            console.log("SW Registerd")
        })
}

var navOpen = () => {
    var nav = document.getElementsByClassName('nav')[0]
    nav.style.left = '25%';

    var layer = document.querySelector('.layer')
    layer.style.display = 'block';
    layer.style.opacity = '40%';
    //console.log(layer)
}

var navClose = () => {
    var nav = document.getElementsByClassName('nav')[0]
    nav.style.left = '100%';

    var layer = document.querySelector('.layer')
    layer.style.display = 'none';
    layer.style.opacity = '0%';
    //console.log(nav)
}


(()=>{var ctx = document.getElementById('myChart').getContext('2d');
const a='dk';
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['Calories', 'Fat', 'Sodium', 'Iron'],
        datasets: [{
            label: 'Nutrients',
            data: [12, 19, 3, 10, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(255, 159, 64, 0.2)'
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)'
            ],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            yAxes: [{
                ticks: {
                    beginAtZero: true
                }
            }]
        }
    }
})})();