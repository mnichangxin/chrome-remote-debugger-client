# Chrome Remote Debugger Client

The Chrome Remote Debugger client for Page.

## Install

`ESM` and `CJS` need install:

```sh
yarn add chrome-remote-debugger-client -S
# OR
npm install chrome-remote-debugger-client --save
```

## Usage

Support three import mode:

* **ESM**:

```js
import CRD from 'chrome-remote-debugger-client'
```

* **CJS**

```js
const CRD = require('chrome-remote-debugger-client')
```

* **UMD**

```html
<script type="text/javascript" src="crd.umd.min.js"></script>
```

Creating a class instance and init:

```js
new CRD([options]).init()
```

## Options

* **pid**: Page unique identification, generate autoing when no setting

* **wsOrigin**: Be registered server address, include `host` and `port`. Generate by local host when no setting. Also, using a query param `wsOrigin` cover this setting. For example: `http://10.253.32.115:9222/test/demo.html?wsOrigin=10.253.32.115:9222`

## About Server

The supporting services in another warehouse is [Chrome Remote Debugger](https://github.com/mnichangxin/chrome-remote-debugger)
