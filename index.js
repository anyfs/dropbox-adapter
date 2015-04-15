'use strict';

var path = require('path');
var util = require('util');
var dropbox = require('dropbox');

module.exports = Adapter;

function Adapter(options) {
    this.options = options;
    this.dropbox = new dropbox.Client(this.options);
}

Adapter.prototype.features = {};

function parseEntry(entry) {
    var metadata = {
        name: entry.name,
        is_dir: entry.isFolder,
        time: entry.modifiedAt,
    }

    if (!metadata.is_dir) {
        metadata.size = entry.size;
    }
    return metadata;
}

function parseError(err) {
    if (!err) {
        return null;
    }

    if (err.status == 404) {
        return error('ENOENT', err.Message);
    }
    return err;
}

function error(code, message) {
    var err = new Error(message);
    err.code = code;

    return err;
}

Adapter.prototype.metadata = function(p, cb) {
    var dropboxOptions = {
    };
    this.dropbox.metadata(p, dropboxOptions, function(err, stat, children) {
        if (err) {
            return cb(parseError(err));
        }

        if (stat.isRemoved) {
            return cb(error('ENOENT'));
        }

        var metadata = parseEntry(stat);
        cb(null, metadata);
    });
};

Adapter.prototype.list = function(p, cb) {
    var dropboxOptions = {
        readDir: true
    };

    this.dropbox.metadata(p, dropboxOptions, function(err, stat, children) {
        if (err) {
            return cb(parseError(err));
        }

        if (stat.isRemoved) {
            return cb(error('ENOENT'));
        }

        cb(null, children.map(parseEntry));
    });
};

Adapter.prototype.mkdir = function(p, cb) {
    this.dropbox.mkdir(p, function(err, stat) {
        cb(parseError(err));
    });
};

Adapter.prototype.features.DELETE_RECURSIVE = true;
Adapter.prototype.delete = function(p, cb) {
    this.dropbox.delete(p, function(err) {
        cb(parseError(err));
    });
};

Adapter.prototype.move = function(a, b, cb) {
    self.dropbox.move(a, b, function(err) {
        cb(parseError(err));
    });
};

Adapter.prototype.readFile = function(p, cb) {
    var dropboxOptions = {
        buffer: true
    };
    this.dropbox.readFile(p, dropboxOptions, function(err, content, stat, range) {
        if (err) {
            return cb(parseError(err));
        }

        cb(null, content);
    });
};

Adapter.prototype.writeFile = function(p, content, cb) {
    this.dropbox.writeFile(p, content, {}, function(err) {
        cb(parseError(err));
    });
};