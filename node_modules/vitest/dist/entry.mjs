import { promises } from 'fs';
import { g as getWorkerState, a as resetModules } from './chunk-mock-date.2917be60.mjs';
import { a as envs } from './chunk-env-node.ceb43f1c.mjs';
import { a as setupGlobalEnv, s as startTests, w as withEnv } from './chunk-runtime-error.f5506f40.mjs';
import 'path';
import './chunk-constants.71e8a211.mjs';
import 'tty';
import 'url';
import 'local-pkg';
import 'console';
import 'perf_hooks';
import './chunk-integrations-coverage.99c020eb.mjs';
import './chunk-runtime-hooks.e4219ed5.mjs';
import './chunk-runtime-chain.0ab05798.mjs';
import 'util';
import 'chai';
import './vendor-_commonjsHelpers.4da45ef5.mjs';
import './chunk-runtime-rpc.00a890d2.mjs';
import './chunk-utils-timers.b48455ed.mjs';
import './chunk-utils-source-map.2be5aa48.mjs';
import './spy.mjs';
import 'tinyspy';

async function run(files, config) {
  await setupGlobalEnv(config);
  const workerState = getWorkerState();
  if (config.browser) {
    workerState.mockMap.clear();
    await startTests(files, config);
    return;
  }
  const filesWithEnv = await Promise.all(files.map(async (file) => {
    var _a;
    const code = await promises.readFile(file, "utf-8");
    const env = ((_a = code.match(/@(?:vitest|jest)-environment\s+?([\w-]+)\b/)) == null ? void 0 : _a[1]) || config.environment || "node";
    return {
      file,
      env
    };
  }));
  const filesByEnv = filesWithEnv.reduce((acc, { file, env }) => {
    acc[env] || (acc[env] = []);
    acc[env].push(file);
    return acc;
  }, {});
  const orderedEnvs = envs.concat(
    Object.keys(filesByEnv).filter((env) => !envs.includes(env))
  );
  for (const env of orderedEnvs) {
    const environment = env;
    const files2 = filesByEnv[environment];
    if (!files2 || !files2.length)
      continue;
    await withEnv(environment, config.environmentOptions || {}, async () => {
      for (const file of files2) {
        if (config.isolate) {
          workerState.mockMap.clear();
          resetModules(workerState.moduleCache, true);
        }
        workerState.filepath = file;
        await startTests([file], config);
        workerState.filepath = void 0;
      }
    });
  }
}

export { run };
