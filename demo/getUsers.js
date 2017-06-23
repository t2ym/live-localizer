'use strict';
var admin = require('firebase-admin');
var JSONstringify = require('json-stringify-safe');

// firebase URL
var database_url = process.argv[2] || 'https://live-localizer-demo.firebaseio.com';
// path to firebase service account JSON
var service_account_json = process.argv[3] || '../../live-localizer-demo-service-account.json'; // must be out of the web root

var serviceAccount = require(service_account_json);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: database_url,
  databaseAuthVariableOverride: {
    uid: 'xliff-watcher'
  }
});
var db = admin.database();
var ref = db.ref('/users');
ref.once('value').then(function(snapshot) {
  var value = snapshot.exportVal();
  process.stdout.write(JSONstringify(value, null, 0), 'utf-8', function () {
    db.goOffline();
    process.exit();
  });
});
