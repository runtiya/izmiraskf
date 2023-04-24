const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();


const adminNewsRoutes = require('./routes/admin/news');
const adminAboutIASKFRoutes = require('./routes/admin/aboutiaskf');
const adminStaffIASKFRoutes = require('./routes/admin/staffiaskf');
const adminAboutITFFRoutes = require('./routes/admin/aboutitff');
const adminStaffITFFRoutes = require('./routes/admin/staffitff');
const adminExternalLinkRoutes = require('./routes/admin/externallinks');
const adminDocumentsRoutes = require('./routes/admin/documents');
const adminStadiumsRoutes = require('./routes/admin/stadiums');
const adminTeamsRoutes = require('./routes/admin/teams');
const adminSeasonsRoutes = require('./routes/admin/seasons');
const adminLeaguesRoutes = require('./routes/admin/leagues');
const adminGroupsRoutes = require('./routes/admin/groupstages');
const adminTeamsInGroupsRoutes = require('./routes/admin/teamsingroupstages');
const adminFixtures = require('./routes/admin/fixtures');
const adminDisciplinaryBoardFiles = require('./routes/admin/disciplinaryboardfiles');
const adminDisciplinaryBoardDecisions = require('./routes/admin/disciplinaryboarddecisions');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'3000kb'}));


// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});



app.use('/admin/haberler', adminNewsRoutes);
app.use('/admin/izmiraskf', adminAboutIASKFRoutes);
app.use('/admin/izmiraskf-personel', adminStaffIASKFRoutes);
app.use('/admin/izmirtffiltemsilciligi', adminAboutITFFRoutes);
app.use('/admin/izmirtffiltemsilciligi-personel', adminStaffITFFRoutes);
app.use('/admin/disbaglantilar', adminExternalLinkRoutes);
app.use('/admin/documents', adminDocumentsRoutes);
app.use('/admin/sahalar', adminStadiumsRoutes);
app.use('/admin/takimlar', adminTeamsRoutes);
app.use('/admin/sezonlar', adminSeasonsRoutes);
app.use('/admin/ligler', adminLeaguesRoutes);
app.use('/admin/grup-takim-eslesmeleri', adminTeamsInGroupsRoutes);
app.use('/admin/gruplar', adminGroupsRoutes);
app.use('/admin/fikstur', adminFixtures);
app.use('/admin/disiplin-kurulu-dosyalari', adminDisciplinaryBoardFiles);
app.use('/admin/disiplin-kurulu-kararlari', adminDisciplinaryBoardDecisions);


module.exports = app;
