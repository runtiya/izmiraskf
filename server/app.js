const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

// Admin Routes
const adminNewsRoutes = require('./routes/admin/news');
const adminAboutIASKFRoutes = require('./routes/admin/aboutizmiraskf');
const adminStaffIASKFRoutes = require('./routes/admin/staffizmiraskf');
const adminAboutITFFRoutes = require('./routes/admin/aboutizmirtff');
const adminStaffITFFRoutes = require('./routes/admin/staffizmirtff');
const adminExternalLinkRoutes = require('./routes/admin/externallinks');
const adminDocumentsRoutes = require('./routes/admin/documents');
const adminTeamsRoutes = require('./routes/admin/teams');
const adminStadiumsRoutes = require('./routes/admin/stadiums');
const adminDisciplinaryBoardFiles = require('./routes/admin/disciplinaryboardfiles');
const adminDisciplinaryBoardDecisions = require('./routes/admin/disciplinaryboarddecisions');
const adminSeasonsRoutes = require('./routes/admin/seasons');
const adminLeaguesRoutes = require('./routes/admin/leagues');
const adminGroupsRoutes = require('./routes/admin/groupstages');
const adminTeamsInGroupsRoutes = require('./routes/admin/teamsingroupstages');
const adminFixturesRoutes = require('./routes/admin/fixtures');
const adminPointBoardRoutes = require('./routes/admin/pointboard');
const adminAuthenticationRoutes = require('./routes/admin/authentication');


// Application Routes
const applicationAboutIASKFRoutes = require('./routes/application/aboutizmiraskf');
const applicationStaffIASKFRoutes = require('./routes/application/staffizmiraskf');
const applicationAboutITFFRoutes = require('./routes/application/aboutizmirtff');
const applicationStaffITFFRoutes = require('./routes/application/staffizmirtff');

const applicationTeamsRoutes = require('./routes/application/teams');

const applicationNewsRoutes = require('./routes/application/news');
const applicationStadiumsRoutes = require('./routes/application/stadiums');

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'3000kb'}));

// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  next();
});


// Admin app-use
app.use('/admin/haberler', adminNewsRoutes);
app.use('/admin/izmiraskf/hakkimizda', adminAboutIASKFRoutes);
app.use('/admin/izmiraskf/yonetim-kurulu', adminStaffIASKFRoutes);
app.use('/admin/tffiltemsilciligi/hakkimizda', adminAboutITFFRoutes);
app.use('/admin/tffiltemsilciligi/yonetim-kurulu', adminStaffITFFRoutes);
app.use('/admin/disbaglantilar', adminExternalLinkRoutes);
app.use('/admin/documents', adminDocumentsRoutes);
app.use('/admin/takimlar', adminTeamsRoutes);
app.use('/admin/sahalar', adminStadiumsRoutes);
app.use('/admin/disiplin-kurulu-dosyalari', adminDisciplinaryBoardFiles);
app.use('/admin/disiplin-kurulu-kararlari', adminDisciplinaryBoardDecisions);
app.use('/admin/sezonlar', adminSeasonsRoutes);
app.use('/admin/ligler', adminLeaguesRoutes);
app.use('/admin/grup-takim-eslesmeleri', adminTeamsInGroupsRoutes);
app.use('/admin/gruplar', adminGroupsRoutes);
app.use('/admin/fikstur', adminFixturesRoutes);
app.use('/admin/puan-durumu', adminPointBoardRoutes);
app.use('/admin/kullanicilar', adminAuthenticationRoutes);


// Application app-use
app.use('/izmiraskf/hakkimizda', applicationAboutIASKFRoutes);
app.use('/izmiraskf/yonetim-kurulu', applicationStaffIASKFRoutes);
app.use('/tffiltemsilciligi/hakkimizda', applicationAboutITFFRoutes);
app.use('/tffiltemsilciligi/yonetim-kurulu', applicationStaffITFFRoutes);
app.use('/takimlar', applicationTeamsRoutes);
app.use('/haberler', applicationNewsRoutes);
app.use('/sahalar', applicationStadiumsRoutes);

module.exports = app;
