class View {
    static barItem = document.querySelector('#myBarChart'); // static hace que esta variable sera la misma para todos los hijos que creemos para esta clase, si se cambia. cambiará en todos los objetos 
    static doughnutItem = document.querySelector('#myDoughnutChart');
    static lineItem = document.querySelector('#myLineChart');
    static leads = document.getElementById('leads-table');

    constructor() {
        this.doughnutChart;
        this.BarChart;
        this.LineChart
    }

    getBarChart() {
        const config = { //configuracion de la tabla 
            type: 'bar',
            data: {
                labels: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
                datasets: [{
                    label: 'Interactions by day',
                    data: [0, 1, 2, 3, 4, 5, 6],
                    backgroundColor: ['rgb(210, 83, 235, 0.5)'],
                    borderColor: ['rgb(210, 83, 235)'],
                    hoverOffset: 4,
                    borderWidth: 2
                }]
            },
            options: { //Opciones de estilo
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        }
        this.BarChart = new Chart(View.barItem, config);// Para que la funcion sepa donde va a pintar la gráfica
    }

    getmyDoughnutChart() {
        const data = {
            labels: [
                'IOS',
                'ANDROID',
                'OTHER'
            ],
            datasets: [{
                label: ' Quantity',
                data: [10, 10, 10],
                backgroundColor: [
                    'rgb(240, 188, 53)',
                    'rgb(210, 83, 235)',
                    'rgb(43, 237, 174)'
                ],
                hoverOffset: 4
            }]
        };
        const config = {
            type: 'doughnut',
            data: data,
        };
        this.doughnutChart = new Chart(View.doughnutItem, config);
    }

    getLineChart() {
        const labels = ['00','', '02', '', '04', '', '06', '', '08', '', '10', '', '12', '', '14', '', '16', '', '18', '', '20', '', '22', ''];
        const data = {
            labels: labels,
            datasets: [{
                label: 'Hourly traffic (24h format)',
                data: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23],
                fill: false,
                borderColor: 'rgb(43, 237, 174)',
                tension: 0.1
            }]
        };
        const config = {
            type: 'line',
            data: data,
        };
        this.LineChart = new Chart(View.lineItem, config);
    }

    updateTable(newLeads){
        console.log(View.leads);
        console.table(newLeads);

        newLeads.reverse().forEach((element, index) => {
            let row = document.createElement('tr');
            row.innerHTML = `
                <td>${newLeads[index].name}</td>
                <td>${newLeads[index].email}</td>
                <td>${newLeads[index].dob}</td>
            `;
    
            View.leads.appendChild(row);
        });
    }

    updateDoughnut(osPopularity){
        console.log(this.doughnutChart.data.datasets[0].data);
        console.table(osPopularity);
        this.doughnutChart.data.datasets[0].data[0] = osPopularity.IOS_count;
        this.doughnutChart.data.datasets[0].data[1] = osPopularity.Android_count;
        this.doughnutChart.data.datasets[0].data[2] = osPopularity.Other_count;
        
        this.doughnutChart.data.labels = ['IOS', 'Android', 'Other'];

        console.log(this.doughnutChart.data.datasets[0].data);

        this.doughnutChart.update();
    };

    updateBarChart( dayCounts){
        this.BarChart;

        this.BarChart.data.datasets[0].data =  dayCounts;

        this.BarChart.update();
    }

    updateLineChart(hourTraffic){
        this.LineChart;

        this.LineChart.data.datasets[0].data =  hourTraffic;

        this.LineChart.update();
    };

    render() {
        this.getBarChart();
        this.getmyDoughnutChart();
        this.getLineChart();
    }
}