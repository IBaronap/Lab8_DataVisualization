import { fs } from "../dependencies.js";
import * as KPI from "./kpicalculations.js";

export const getData = (req, res) => {
    try {
        //Jsons
        const usersJSONData = fs.readFileSync ('./localCollection/users.json')
        const interactionsJSONData = fs.readFileSync ('./localCollection/interactions.json')

        const {users} =JSON.parse(usersJSONData);
        const {interactions} =JSON.parse(interactionsJSONData)

        //Send data
        const lastFiveLeads = KPI.getLastFiveLeads(users);
        const osPopularity = KPI.getDevicePopularity(interactions);
        const dayCounts = KPI.getInteractionsByDay(interactions);
        const hourTraffic = KPI.getHourTraffic(interactions);

        let dashboarddata = {users, interactions, lastFiveLeads, osPopularity, dayCounts, hourTraffic};

        res.status(201).send(dashboarddata);
    }  catch (error) {
        console.error(error);
        res.status(500).send('Error adding user');
    }
}