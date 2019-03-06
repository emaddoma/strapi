'use strict';

// Dependencies.
const path = require('path');
const glob = require('glob');
const utils = require('../utils');

module.exports = function() {
  return Promise.all([
    new Promise((resolve, reject) => {
      // Load configurations.
      glob('./api/*/!(config)/*.*(js|json)', {
        cwd: this.config.appPath
      }, (err, files) => {
        if (err) {
          return reject(err);
        }

        files.map(p => utils.setConfig(this, p, 'aggregate', this.loadFile));

        files.forEach(f => {
          console.log(f, require(path.resolve(this.config.appPath, f)));
        });

        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      // Load configurations.
      glob('./admin/!(config|node_modules|scripts)/*.*(js|json)', {
        cwd: this.config.appPath
      }, (err, files) => {
        if (err) {
          return reject(err);
        }

        files.map(p => utils.setConfig(this, p, 'aggregate', this.loadFile));

        resolve();
      });
    }),
    new Promise((resolve, reject) => {
      // Load configurations.
      glob('{./plugins/*/!(config|node_modules|test)/*.*(js|json),./plugins/*/package.json}', {
        cwd: this.config.appPath
      }, (err, files) => {
        if (err) {
          return reject(err);
        }

        files.map(p => utils.setConfig(this, p, 'aggregate', this.loadFile));

        resolve();
      });
    })
  ]);
};
