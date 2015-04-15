# anyfs-dropbox-adapter

[![npm](https://img.shields.io/npm/v/anyfs-dropbox-adapter.svg?style=flat-square)](https://www.npmjs.com/package/anyfs-dropbox-adapter)
[![npm](https://img.shields.io/npm/dm/anyfs-dropbox-adapter.svg?style=flat-square)](https://www.npmjs.com/package/anyfs-dropbox-adapter)
![npm](https://img.shields.io/npm/l/anyfs-dropbox-adapter.svg?style=flat-square)

Dropbox adapter for AnyFS

## Usage

```js
var AnyFS = require('anyfs');
var Adapter = require('anyfs-dropbox-adapter');
var adapter = new Adapter({
    key: "appkey",
    secret: "secret",
    token: "token"
});

var fs = new AnyFS(adapter);

fs.list('/dir', function(err, list) {
    console.log(list);
});
```

