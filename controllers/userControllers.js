import { fs } from "../dependencies.js";
import { io } from '../index.js';

export const postUserData = (req, res) => {
  try {
    // read existing data from users.json file
    const UserData = fs.readFileSync('./localCollection/users.json');
    const InteractionsData = fs.readFileSync('./localCollection/interactions.json');

    const jsonUserData = JSON.parse(UserData);
    const jsonInteractionsData = JSON.parse(InteractionsData);

    // create new user object from request body
    const newUser = {
      id: jsonUserData.users.length + 1,   // generate new user ID
      name: req.body.name,
      email: req.body.email,
      dob:req.body.dob,
      phone:req.body.phone,
      OS: req.body.OS,
      privacyAgreement: req.body.privacyAgreement
    };

    const newInteraction = {
      id: jsonInteractionsData.interactions.length + 1,   // generate new user ID
      date: req.body.date,
      timeStamp: req.body.timeStamp,
      OS: req.body.OS
    };

    // add new user to existing data
    jsonUserData.users.push(newUser);
    jsonInteractionsData.interactions.push(newInteraction);

    // write updated data back to users.json file
    fs.writeFileSync('./localCollection/users.json', JSON.stringify(jsonUserData, null, 2));
    fs.writeFileSync('./localCollection/interactions.json', JSON.stringify(jsonInteractionsData, null, 2));

    io.emit('data-update', { state: true });

    // send response indicating successful creation of new user
    res.status(201).send({ msn: `User ${newUser.id} created` });
  } catch (error) {
    // handle any errors that occur
    console.error(error);
    res.status(500).send('Error adding user');
  }
}

export const getUsers = (req, res) => {
  res.send({ mns: 'Hell!' });
}