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
const adminStadiumsRoutes = require('./routes/admin/stadiums');
const adminTeamsRoutes = require('./routes/admin/teams');
const adminDisciplinaryBoardFiles = require('./routes/admin/disciplinaryboardfiles');
const adminDisciplinaryBoardDecisions = require('./routes/admin/disciplinaryboarddecisions');
const adminSeasonsRoutes = require('./routes/admin/seasons');
const adminLeaguesRoutes = require('./routes/admin/leagues');
const adminGroupsRoutes = require('./routes/admin/groupstages');
const adminTeamsInGroupsRoutes = require('./routes/admin/teamsingroupstages');
const adminFixturesRoutes = require('./routes/admin/fixtures');
const adminPointBoardRoutes = require('./routes/admin/pointboard');
const adminWeeklyMatchProgramRoutes = require('./routes/admin/weeklymatchprogram');
const adminWeeklyMatchListRoutes = require('./routes/admin/weeklymatchlist');
const adminAuthenticationRoutes = require('./routes/admin/authentication');

// Application Routes
const applicationNewsRoutes = require('./routes/application/news');
const applicationAboutIASKFRoutes = require('./routes/application/aboutizmiraskf');
const applicationStaffIASKFRoutes = require('./routes/application/staffizmiraskf');
const applicationAboutITFFRoutes = require('./routes/application/aboutizmirtff');
const applicationStaffITFFRoutes = require('./routes/application/staffizmirtff');
const applicationExternalLinkRoutes = require('./routes/application/externallinks');
const applicationDocumentsRoutes = require('./routes/application/documents');
const applicationStadiumsRoutes = require('./routes/application/stadiums');
const applicationTeamsRoutes = require('./routes/application/teams');
const applicationDisciplinaryBoardFiles = require('./routes/application/disciplinaryboardfiles');
const applicationDisciplinaryBoardDecisions = require('./routes/application/disciplinaryboarddecisions');
const applicationSeasonsRoutes = require('./routes/application/seasons');
const applicationLeaguesRoutes = require('./routes/application/leagues');
const applicationGroupsRoutes = require('./routes/application/groupstages');
const applicationTeamsInGroupsRoutes = require('./routes/application/teamsingroupstages');
const applicationFixturesRoutes = require('./routes/application/fixtures');
const applicationPointBoardRoutes = require('./routes/application/pointboard');
const applicationWeeklyMatchProgramRoutes = require('./routes/application/weeklymatchprogram');
const applicationWeeklyMatchListRoutes = require('./routes/application/weeklymatchlist');
const applicationStatisticsRoutes = require('./routes/application/statistics');

const { url } = require('inspector');


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json({limit:'8392kb'}));

app.use("/images/", express.static(path.join("server/images")));
app.use("/images/teams", express.static(path.join("server/images/teams")));
app.use("/images/stadiums", express.static(path.join("server/images/stadiums")));
app.use("/images/news", express.static(path.join("server/images/news")));
app.use("/images/staff", express.static(path.join("server/images/staff")));
app.use("/images/users", express.static(path.join("server/images/users")));
app.use("/images/icons", express.static(path.join("server/images/icons")));
app.use("/images/statics", express.static(path.join("server/images/statics")));


app.use("/files/", express.static(path.join("server/files")));
app.use("/files/documents", express.static(path.join("server/files/documents")));
app.use("/files/instructions", express.static(path.join("server/files/instructions")));
app.use("/files/license-forms", express.static(path.join("server/files/license-forms")));
app.use("/files/statuses", express.static(path.join("server/files/statuses")));
app.use("/files/template-files", express.static(path.join("server/files/template-files")));



// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  //res.setHeader('Cache-Control', 'public, max-age=30'); // As seconds

  next();
});


// Admin app-use
app.use('/admin/haberler', adminNewsRoutes);
app.use('/admin/izmiraskf/hakkimizda', adminAboutIASKFRoutes);
app.use('/admin/izmiraskf/yonetim-kurulu', adminStaffIASKFRoutes);
app.use('/admin/tffiltemsilciligi/hakkimizda', adminAboutITFFRoutes);
app.use('/admin/tffiltemsilciligi/tffiltemsilciligi', adminStaffITFFRoutes);
app.use('/admin/disbaglantilar', adminExternalLinkRoutes);
app.use('/admin/dokumanlar', adminDocumentsRoutes);
app.use('/admin/takimlar', adminTeamsRoutes);
app.use('/admin/sahalar', adminStadiumsRoutes);
app.use('/admin/disiplin-kurulu-dosyalari', adminDisciplinaryBoardFiles);
app.use('/admin/disiplin-kurulu-kararlari', adminDisciplinaryBoardDecisions);
app.use('/admin/sezonlar', adminSeasonsRoutes);
app.use('/admin/ligler', adminLeaguesRoutes);
app.use('/admin/grup-takim-eslesmeleri', adminTeamsInGroupsRoutes);
app.use('/admin/gruplar', adminGroupsRoutes);
app.use('/admin/fikstur', adminFixturesRoutes);
app.use('/admin/puan-tablosu', adminPointBoardRoutes);
app.use('/admin/weekly-match-program', adminWeeklyMatchProgramRoutes);
app.use('/admin/weekly-match-list', adminWeeklyMatchListRoutes);
app.use('/admin/kullanicilar', adminAuthenticationRoutes);


// Application app-use
app.use('/statistics', applicationStatisticsRoutes);
app.use('/haberler', applicationNewsRoutes);
app.use('/izmiraskf/hakkimizda', applicationAboutIASKFRoutes);
app.use('/izmiraskf/yonetim-kurulu', applicationStaffIASKFRoutes);
app.use('/tffiltemsilciligi/hakkimizda', applicationAboutITFFRoutes);
app.use('/tffiltemsilciligi/tffiltemsilciligi', applicationStaffITFFRoutes);
app.use('/disbaglantilar', applicationExternalLinkRoutes);
app.use('/dokumanlar', applicationDocumentsRoutes);
app.use('/sahalar', applicationStadiumsRoutes);
app.use('/takimlar', applicationTeamsRoutes);
app.use('/disiplin-kurulu-dosyalari', applicationDisciplinaryBoardFiles);
app.use('/disiplin-kurulu-kararlari', applicationDisciplinaryBoardDecisions);
app.use('/sezonlar', applicationSeasonsRoutes);
app.use('/ligler', applicationLeaguesRoutes);
app.use('/grup-takim-eslesmeleri', applicationTeamsInGroupsRoutes);
app.use('/gruplar', applicationGroupsRoutes);
app.use('/fikstur', applicationFixturesRoutes);
app.use('/puan-tablosu', applicationPointBoardRoutes);
app.use('/weekly-match-program', applicationWeeklyMatchProgramRoutes);
app.use('/weekly-match-list', applicationWeeklyMatchListRoutes);
app.use('/statistics', applicationStatisticsRoutes);

app.use('*', (req, res, next) => {res.status(404).json({message: '404 Not Found!'})});


module.exports = app;
