const express = require('express');
const route = express.Router();
const menuControle = require('../Controles/menuControler');

route.post('/add', menuControle.addmenu);
route.get('/getSingle/:id', menuControle.getSinglemenu);
route.put('/update/:id', menuControle.updateMenu);
route.get('/fillterbySellerId', menuControle.menuFindbySellerId);


module.exports = route;
