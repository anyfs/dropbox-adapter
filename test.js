'use strict';

var AnyFS = require('anyfs');
var test = require('anyfs').test;
var Adapter = require('./');

var secret = require('./.secret.json');
var adapter = new Adapter({
    key: secret.key,
    secret: secret.secret,
    token: secret.token,
});

var fs = new AnyFS(adapter);

AnyFS.test(fs);