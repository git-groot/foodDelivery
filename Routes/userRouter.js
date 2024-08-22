const express = require('express');
const route = express.Router();
const userControl = require('../Controles/userControler');

route.post('/add', userControl.addUser);
route.post('/logi', userControl.login);
route.get('/getall', userControl.getall);
route.get('/getSingle/:id',userControl.getSingle);
route.delete('/delete/:id',userControl.delete);
route.put('/update/:id',userControl.update);
route.get('/filterUser',userControl.userFilter);


module.exports = route;