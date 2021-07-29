# Chrome Remote Debugger Client

The Chrome Remote Debugger client for Page.

## Install

`ESM` and `CJS` need install:

```sh
    yarn add chrome-remote-debugger-client
```

1. ESM:

```js
    import CRD from 'chrome-remote-debugger-client'
```

2. CJS

```js
    const CRD = require('chrome-remote-debugger-client')
```

3. UMD

```html
    <script type="text/javascript" src="crd.umd.min.js"></script>
```

## Usage

Creating a class instance and init:

```js
    new CRD([options]).init()
```

## SDK Options

* `pid`: Page unique identification, generate autoing when no setting

* `wsHost`: Be registered server address, include `host` and `port`. Generate by local host when no setting. Also, using a query param `remoteServer` cover this setting. For example: `http://10.253.32.115:9222/test/demo.html?remoteServer=10.253.32.115:9222`
