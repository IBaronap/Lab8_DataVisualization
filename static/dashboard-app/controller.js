const URL = `${window.location.hostname}:${window.location.port}`;
const socket = io(URL, { path: '/real-time' });
let leads = document.getElementById('leads-table');

function controller(view) {

    let dashboardLocalData;

   ( async function detDashboard () {
        const request = await fetch ('http://localhost:5050/dashboard');
        const data = await request.json();
        dashboardLocalData = data;

        const {lastFiveLeads, osPopularity, dayCounts, hourTraffic} = dashboardLocalData;

        view.updateTable(lastFiveLeads);
        view.updateDoughnut(osPopularity);
        view.updateBarChart(dayCounts);
        view.updateLineChart(hourTraffic);

    }) (); // funcion autodeclarada , es más segura, a penas se termina de escribir se autodeclara

    socket.on('data-update', (data) => {
        console.log(data);
        updateRealTime();
    });

    const updateRealTime = async () => {
        const request = await fetch ('http://localhost:5050/dashboard');
        const data = await request.json();
        dashboardLocalData = data;

        const {lastFiveLeads, osPopularity, dayCounts, hourTraffic} = dashboardLocalData;

        leads.innerHTML = ` `;
        view.updateTable(lastFiveLeads);
        view.updateDoughnut(osPopularity);
        view.updateBarChart(dayCounts);
        view.updateLineChart(hourTraffic);

        console.log('Data updated');
    }

    view.render();
}

let view = new View();
controller(view, socket);

