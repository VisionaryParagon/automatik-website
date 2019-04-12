// dependencies
import 'zone.js/dist/zone-node';
import 'reflect-metadata';
import { enableProdMode } from '@angular/core';
// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import * as http from 'http';
import * as bodyParser from 'body-parser';
import * as expressSession from 'express-session';
import * as mongoose from 'mongoose';

// get env vars
const dotenv = require('dotenv');
dotenv.config();

const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

// models
const admin = require('./server/models/admin');

// routes
const adminRoute = require('./server/routes/admin');
const careersRoute = require('./server/routes/careers');
const contactRoute = require('./server/routes/contact');
const imageRoute = require('./server/routes/images');
const projectRoute = require('./server/routes/projects');
const subscriberRoute = require('./server/routes/subscriber');
const teamRoute = require('./server/routes/team');

// connect to db
/*
mongoose.connect('mongodb://' + process.env.DBUSR + ':' + process.env.DBPWD + '@ds237379.mlab.com:37379/automatik-apps', {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
})
  .then(dbRes => console.log('Connected to DB:', dbRes.connections[0].name))
  .catch(dbErr => console.log('Error connecting to DB:', dbErr));
*/

mongoose.connect('mongodb://' + process.env.DBUSR + ':' + encodeURIComponent(process.env.DBPWDPROD) + '@ds219175-a0.mlab.com:19175,ds219175-a1.mlab.com:19175/automatik-apps?replicaSet=rs-ds219175', {
  reconnectTries: Number.MAX_VALUE,
  reconnectInterval: 1000
})
  .then(dbRes => console.log('Connected to DB:', dbRes.connections[0].name))
  .catch(dbErr => console.log('Error connecting to DB:', dbErr));

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

// Express server
const app = express();

const port = process.env.PORT || '80';
const DIST_FOLDER = join(process.cwd(), 'dist');

const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./dist/server/main');

// Universal express-engine
app.engine('html', (_, options, callback) => {
  const engine = ngExpressEngine({
    bootstrap: AppServerModuleNgFactory,
    providers: [
      provideModuleMap(LAZY_MODULE_MAP),
      {
        provide: 'REQUEST', useValue: (options.req)
      },
      {
        provide: 'RESPONSE', useValue: (options.res)
      }
    ]
  });

  engine(_, options, callback);
});

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

// middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(expressSession({
  secret: process.env.AUTOMATIK_KEY,
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());

// configure passport
passport.use(new localStrategy(admin.authenticate()));
passport.serializeUser(admin.serializeUser());
passport.deserializeUser(admin.deserializeUser());

// https redirect
app.all('*', (req, res, next) => {
  if (req.headers['x-forwarded-proto'] === 'https' || (req.headers.host !== 'automatik.com' && req.headers.host !== 'www.automatik.com' && req.headers.host !== 'beta.automatik.com')) {
  // if (req.headers['x-forwarded-proto'] === 'https' || (req.headers.host !== 'beta.automatik.com' && req.headers.host !== 'beta.automatik9dots.com')) {
    next();
  } else {
    if (req.headers.host.indexOf('www.') === 0) {
      return res.redirect(301, 'https://' + req.headers.host.slice(4) + req.url);
    } else {
      return res.redirect(301, 'https://' + req.headers.host + req.url);
    }
  }
});

// API endpoints
app.use('/admn', adminRoute);
app.use('/careers', careersRoute);
app.use('/cntct', contactRoute);
app.use('/img', imageRoute);
app.use('/prj', projectRoute);
app.use('/sub', subscriberRoute);
app.use('/tm', teamRoute);

// Serve static files from /browser
app.all('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// Render index.html on all other routes
app.all('*', (req, res) => {
  res.render(join(DIST_FOLDER, 'browser', 'index.html'), { req });
});

// Get port from environment and store in Express
app.set('port', port);

// Create HTTP server
const server = http.createServer(app);

// Listen on provided port, on all network interfaces
server.listen(port, () => console.log(`API running on localhost:${port}`));
