export { E as EnhancedSpy, r as Mock, u as MockContext, q as MockInstance, v as Mocked, w as MockedClass, o as MockedFunction, p as MockedObject, S as SpyInstance, j as afterAll, l as afterEach, h as beforeAll, k as beforeEach, n as createExpect, e as describe, m as expect, i as it, d as suite, t as test } from './index-6e18a03a.js';
import { R as ResolvedConfig } from './global-e98f203b.js';
export { L as AfterSuiteRunMeta, A as ApiConfig, Y as ArgumentsType, X as Arrayable, P as Awaitable, ae as BaseCoverageOptions, ak as BenchFunction, ai as Benchmark, al as BenchmarkAPI, aj as BenchmarkResult, ah as BenchmarkUserOptions, B as BuiltinEnvironment, C as CSSModuleScopeStrategy, a0 as Constructable, ag as CoverageC8Options, af as CoverageIstanbulOptions, ac as CoverageOptions, a9 as CoverageProvider, aa as CoverageProviderModule, ab as CoverageReporter, _ as DeepMerge, D as DoneCallback, a3 as Environment, E as EnvironmentOptions, a2 as EnvironmentReturn, a7 as ErrorWithDiff, a as File, n as HookCleanupCallback, H as HookListener, I as InlineConfig, J as JSDOMOptions, Z as MergeInsertions, a1 as ModuleCache, M as ModuleGraphData, $ as MutableArray, Q as Nullable, a8 as OnServerRestartHandler, a6 as ParsedStack, a5 as Position, b as Reporter, K as ResolveIdFunction, R as ResolvedConfig, ad as ResolvedCoverageOptions, d as RunMode, r as RuntimeContext, u as SnapshotData, x as SnapshotMatchOptions, y as SnapshotResult, w as SnapshotStateOptions, G as SnapshotSummary, v as SnapshotUpdateState, S as Suite, m as SuiteAPI, p as SuiteCollector, q as SuiteFactory, o as SuiteHooks, i as Task, f as TaskBase, g as TaskResult, T as TaskResultPack, e as TaskState, h as Test, l as TestAPI, s as TestContext, j as TestFunction, k as TestOptions, z as UncheckedSnapshot, U as UserConfig, a4 as UserConsoleLog, t as Vitest, V as VitestEnvironment, c as VitestRunMode, W as WorkerContext, O as WorkerGlobalState, N as WorkerRPC } from './global-e98f203b.js';
import * as chai from 'chai';
export { chai };
export { assert, should } from 'chai';
export { Bench as BenchFactory, Options as BenchOptions, Task as BenchTask, TaskResult as BenchTaskResult } from 'tinybench';
import 'tinyspy';
import 'vite';
import 'fs';
import 'worker_threads';

declare function startTests(paths: string[], config: ResolvedConfig): Promise<void>;

declare function setupGlobalEnv(config: ResolvedConfig): Promise<void>;

export { setupGlobalEnv, startTests };
