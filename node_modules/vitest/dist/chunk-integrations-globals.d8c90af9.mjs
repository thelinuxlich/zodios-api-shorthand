import { k as globalApis } from './chunk-constants.71e8a211.mjs';
import { i as index } from './chunk-runtime-hooks.e4219ed5.mjs';
import 'tty';
import 'url';
import 'path';
import './chunk-runtime-chain.0ab05798.mjs';
import 'util';
import './chunk-mock-date.2917be60.mjs';
import 'local-pkg';
import 'chai';
import './vendor-_commonjsHelpers.4da45ef5.mjs';
import './chunk-runtime-rpc.00a890d2.mjs';
import './chunk-utils-timers.b48455ed.mjs';
import 'fs';
import './chunk-utils-source-map.2be5aa48.mjs';
import './spy.mjs';
import 'tinyspy';

function registerApiGlobally() {
  globalApis.forEach((api) => {
    globalThis[api] = index[api];
  });
}

export { registerApiGlobally };
