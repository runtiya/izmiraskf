const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


const adminNewsRoutes = require('./routes/admin/news');
const adminAboutIASKFRoutes = require('./routes/admin/aboutiaskf');
const adminAboutITFFRoutes = require('./routes/admin/aboutitff');
const adminExternalLinkRoutes = require('./routes/admin/externallinks');
const adminDocumentsRoutes = require('./routes/admin/documents');
const adminStadiumsRoutes = require('./routes/admin/stadiums');
const adminTeamsRoutes = require('./routes/admin/teams');
const adminSeasonsRoutes = require('./routes/admin/seasons');


/*
connection.connect();

connection.query(
  'insert into test(isactive) values (true)',
  (error, result, fields) => {
    if (error) {
      console.log(error);
    }
    else console.log(result.insertId) // return last id
  }
);

connection.end();
*/


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});



app.use('/admin/haberler', adminNewsRoutes);
app.use('/admin/izmiraskf', adminAboutIASKFRoutes);
app.use('/admin/izmirtffiltemsilciligi', adminAboutITFFRoutes);
app.use('/admin/disbaglantilar', adminExternalLinkRoutes);
app.use('/admin/documents', adminDocumentsRoutes);
app.use('/admin/sahalar', adminStadiumsRoutes);
app.use('/admin/takimlar', adminTeamsRoutes);
app.use('/admin/sezonlar', adminSeasonsRoutes);


module.exports = app;
