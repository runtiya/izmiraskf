const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');
const tzoffset = (new Date()).getTimezoneOffset() * 60000;
const RequestLogs = require('./models/request-logs');
const environment = require('./environments/development');
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const app = express();

app.use(cors());

// Limiter
const limiter = rateLimit({
  windowMs: 5 * 60 * 1000, // 5 mins
  max: 1000, // Limit each IP to 1000 requests per `window`
  standardHeaders: true,
  legacyHeaders: true,
  keyGenerator: (req) => {
    return req.ip; // IP-based, means for each ID
  },
  message: {
    error: true,
    message: "server.error.toomanyrequest"
  }
});

// Use Limiter
app.use(limiter);

// Connect Mongo DB
mongoose.connect(`mongodb+srv://${environment.MongoAtlasUserName}:${environment.MongoAtlasPassword}@izmiraskf.riyzadp.mongodb.net/?retryWrites=true&w=majority`)
  .then(() => {
    console.log('Mongo Atlas connected successfully!');
  })
  .catch(() => {
    console.log('Mongo Atlas connection failed!');
  });


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


// Images and Files path definitions

app.use("/images/teams", express.static(path.join(__dirname, "images/teams")));
app.use("/images/stadiums", express.static(path.join(__dirname, "images/stadiums")));
app.use("/images/news", express.static(path.join(__dirname, "images/news")));
app.use("/images/staff", express.static(path.join(__dirname, "images/staff")));
app.use("/images/users", express.static(path.join(__dirname, "images/users")));
app.use("/images/icons", express.static(path.join(__dirname, "images/icons")));
app.use("/images/statics", express.static(path.join(__dirname, "images/statics")));
app.use("/images/", express.static(path.join(__dirname, "images")));


app.use("/files/documents", express.static(path.join(__dirname, "files/documents")));
app.use("/files/instructions", express.static(path.join(__dirname, "files/instructions")));
app.use("/files/license-forms", express.static(path.join(__dirname, "files/license-forms")));
app.use("/files/statuses", express.static(path.join(__dirname, "files/statuses")));
app.use("/files/template-files", express.static(path.join(__dirname, "files/template-files")));
app.use("/files/", express.static(path.join(__dirname, "files")));


// CORS - Cross-Origin Resource Sharing
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  //res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization, Cache-Control');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PATCH, PUT, DELETE, OPTIONS');
  res.setHeader('Cache-Control', 'public, max-age=10'); // As seconds

  if (!(["OPTIONS"].includes(req.method))) {
    // Request logging to MongoDB
    const requestLog = new RequestLogs({
      timestamp: new Date(Date.now() - tzoffset).toISOString(),
      method: req.method,
      url: req.originalUrl,
      headers: JSON.stringify(req.headers),
      body: JSON.stringify(req.body)
    });

    requestLog.save();
  }

  next();
});


// Admin app-use
app.use('/admin/news', adminNewsRoutes);
app.use('/admin/izmiraskf/about-us', adminAboutIASKFRoutes);
app.use('/admin/izmiraskf/staff', adminStaffIASKFRoutes);
app.use('/admin/tffiltemsilciligi/about-us', adminAboutITFFRoutes);
app.use('/admin/tffiltemsilciligi/staff', adminStaffITFFRoutes);
app.use('/admin/external-links', adminExternalLinkRoutes);
app.use('/admin/documents', adminDocumentsRoutes);
app.use('/admin/teams', adminTeamsRoutes);
app.use('/admin/stadiums', adminStadiumsRoutes);
app.use('/admin/disciplinary-board-files', adminDisciplinaryBoardFiles);
app.use('/admin/disciplinary-board-decisions', adminDisciplinaryBoardDecisions);
app.use('/admin/seasons', adminSeasonsRoutes);
app.use('/admin/leagues', adminLeaguesRoutes);
app.use('/admin/groupstages', adminGroupsRoutes);
app.use('/admin/teams-in-groupstages', adminTeamsInGroupsRoutes);
app.use('/admin/fixture', adminFixturesRoutes);
app.use('/admin/point-board', adminPointBoardRoutes);
app.use('/admin/weekly-match-program', adminWeeklyMatchProgramRoutes);
app.use('/admin/weekly-match-list', adminWeeklyMatchListRoutes);
app.use('/admin/users', adminAuthenticationRoutes);


// Application app-use
app.use('/news', applicationNewsRoutes);
app.use('/izmiraskf/about-us', applicationAboutIASKFRoutes);
app.use('/izmiraskf/staff', applicationStaffIASKFRoutes);
app.use('/tffiltemsilciligi/about-us', applicationAboutITFFRoutes);
app.use('/tffiltemsilciligi/staff', applicationStaffITFFRoutes);
app.use('/external-links', applicationExternalLinkRoutes);
app.use('/documents', applicationDocumentsRoutes);
app.use('/stadiums', applicationStadiumsRoutes);
app.use('/teams', applicationTeamsRoutes);
app.use('/disciplinary-board-files', applicationDisciplinaryBoardFiles);
app.use('/disciplinary-board-decisions', applicationDisciplinaryBoardDecisions);
app.use('/seasons', applicationSeasonsRoutes);
app.use('/leagues', applicationLeaguesRoutes);
app.use('/groupstages', applicationGroupsRoutes);
app.use('/teams-in-groupstages', applicationTeamsInGroupsRoutes);
app.use('/fixture', applicationFixturesRoutes);
app.use('/point-board', applicationPointBoardRoutes);
app.use('/weekly-match-program', applicationWeeklyMatchProgramRoutes);
app.use('/weekly-match-list', applicationWeeklyMatchListRoutes);
app.use('/statistics', applicationStatisticsRoutes);

app.use('*', (req, res, next) => {res.status(404).json({error: true, message: '404 Not Found!'})});


module.exports = app;
