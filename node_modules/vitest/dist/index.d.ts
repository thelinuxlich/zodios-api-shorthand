import { s as spyOn, f as fn, M as MaybeMockedDeep, a as MaybeMocked, b as MaybePartiallyMocked, c as MaybePartiallyMockedDeep, E as EnhancedSpy } from './index-6e18a03a.js';
export { E as EnhancedSpy, r as Mock, u as MockContext, q as MockInstance, v as Mocked, w as MockedClass, o as MockedFunction, p as MockedObject, S as SpyInstance, j as afterAll, l as afterEach, h as beforeAll, k as beforeEach, g as bench, n as createExpect, e as describe, m as expect, i as it, d as suite, t as test } from './index-6e18a03a.js';
import { D as DoneCallback, F as FakeTimerInstallOpts, a as File, T as TaskResultPack, R as ResolvedConfig, M as ModuleGraphData, b as Reporter } from './global-e98f203b.js';
export { L as AfterSuiteRunMeta, A as ApiConfig, Y as ArgumentsType, X as Arrayable, P as Awaitable, ae as BaseCoverageOptions, ak as BenchFunction, ai as Benchmark, al as BenchmarkAPI, aj as BenchmarkResult, ah as BenchmarkUserOptions, B as BuiltinEnvironment, C as CSSModuleScopeStrategy, a0 as Constructable, ag as CoverageC8Options, af as CoverageIstanbulOptions, ac as CoverageOptions, a9 as CoverageProvider, aa as CoverageProviderModule, ab as CoverageReporter, _ as DeepMerge, D as DoneCallback, a3 as Environment, E as EnvironmentOptions, a2 as EnvironmentReturn, a7 as ErrorWithDiff, a as File, n as HookCleanupCallback, H as HookListener, I as InlineConfig, J as JSDOMOptions, Z as MergeInsertions, a1 as ModuleCache, M as ModuleGraphData, $ as MutableArray, Q as Nullable, a8 as OnServerRestartHandler, a6 as ParsedStack, a5 as Position, b as Reporter, K as ResolveIdFunction, R as ResolvedConfig, ad as ResolvedCoverageOptions, d as RunMode, r as RuntimeContext, u as SnapshotData, x as SnapshotMatchOptions, y as SnapshotResult, w as SnapshotStateOptions, G as SnapshotSummary, v as SnapshotUpdateState, S as Suite, m as SuiteAPI, p as SuiteCollector, q as SuiteFactory, o as SuiteHooks, i as Task, f as TaskBase, g as TaskResult, T as TaskResultPack, e as TaskState, h as Test, l as TestAPI, s as TestContext, j as TestFunction, k as TestOptions, z as UncheckedSnapshot, U as UserConfig, a4 as UserConsoleLog, t as Vitest, V as VitestEnvironment, c as VitestRunMode, W as WorkerContext, O as WorkerGlobalState, N as WorkerRPC } from './global-e98f203b.js';
import { TransformResult } from 'vite';
import * as chai from 'chai';
export { chai };
export { assert, should } from 'chai';
export { Bench as BenchFactory, Options as BenchOptions, Task as BenchTask, TaskResult as BenchTaskResult } from 'tinybench';
import 'tinyspy';
import 'fs';
import 'worker_threads';

/**
 * A simple wrapper for converting callback style to promise
 */
declare function withCallback(fn: (done: DoneCallback) => void): Promise<void>;

/**
 * This utils allows computational intensive tasks to only be ran once
 * across test reruns to improve the watch mode performance.
 *
 * Currently only works with `isolate: false`
 *
 * @experimental
 */
declare function runOnce<T>(fn: (() => T), key?: string): T;
/**
 * Get a boolean indicates whether the task is running in the first time.
 * Could only be `false` in watch mode.
 *
 * Currently only works with `isolate: false`
 *
 * @experimental
 */
declare function isFirstRun(): boolean;

declare class VitestUtils {
    private _timers;
    private _mockedDate;
    private _mocker;
    constructor();
    useFakeTimers(config?: FakeTimerInstallOpts): this;
    useRealTimers(): this;
    runOnlyPendingTimers(): this;
    runAllTimers(): this;
    runAllTicks(): this;
    advanceTimersByTime(ms: number): this;
    advanceTimersToNextTimer(): this;
    getTimerCount(): number;
    setSystemTime(time: number | string | Date): this;
    getMockedSystemTime(): string | number | Date | null;
    getRealSystemTime(): number;
    clearAllTimers(): this;
    spyOn: typeof spyOn;
    fn: typeof fn;
    private getImporter;
    /**
     * Makes all `imports` to passed module to be mocked.
     * - If there is a factory, will return it's result. The call to `vi.mock` is hoisted to the top of the file,
     * so you don't have access to variables declared in the global file scope, if you didn't put them before imports!
     * - If `__mocks__` folder with file of the same name exist, all imports will
     * return it.
     * - If there is no `__mocks__` folder or a file with the same name inside, will call original
     * module and mock it.
     * @param path Path to the module. Can be aliased, if your config supports it
     * @param factory Factory for the mocked module. Has the highest priority.
     */
    mock(path: string, factory?: () => any): void;
    /**
     * Removes module from mocked registry. All subsequent calls to import will
     * return original module even if it was mocked.
     * @param path Path to the module. Can be aliased, if your config supports it
     */
    unmock(path: string): void;
    doMock(path: string, factory?: () => any): void;
    doUnmock(path: string): void;
    /**
     * Imports module, bypassing all checks if it should be mocked.
     * Can be useful if you want to mock module partially.
     * @example
     * vi.mock('./example', async () => {
     *  const axios = await vi.importActual('./example')
     *
     *  return { ...axios, get: vi.fn() }
     * })
     * @param path Path to the module. Can be aliased, if your config supports it
     * @returns Actual module without spies
     */
    importActual<T>(path: string): Promise<T>;
    /**
     * Imports a module with all of its properties and nested properties mocked.
     * For the rules applied, see docs.
     * @param path Path to the module. Can be aliased, if your config supports it
     * @returns Fully mocked module
     */
    importMock<T>(path: string): Promise<MaybeMockedDeep<T>>;
    /**
     * Type helpers for TypeScript. In reality just returns the object that was passed.
     *
     * When `partial` is `true` it will expect a `Partial<T>` as a return value.
     * @example
     * import example from './example'
     * vi.mock('./example')
     *
     * test('1+1 equals 2' async () => {
     *  vi.mocked(example.calc).mockRestore()
     *
     *  const res = example.calc(1, '+', 1)
     *
     *  expect(res).toBe(2)
     * })
     * @param item Anything that can be mocked
     * @param deep If the object is deeply mocked
     * @param options If the object is partially or deeply mocked
     */
    mocked<T>(item: T, deep?: false): MaybeMocked<T>;
    mocked<T>(item: T, deep: true): MaybeMockedDeep<T>;
    mocked<T>(item: T, options: {
        partial?: false;
        deep?: false;
    }): MaybeMocked<T>;
    mocked<T>(item: T, options: {
        partial?: false;
        deep: true;
    }): MaybeMockedDeep<T>;
    mocked<T>(item: T, options: {
        partial: true;
        deep?: false;
    }): MaybePartiallyMocked<T>;
    mocked<T>(item: T, options: {
        partial: true;
        deep: true;
    }): MaybePartiallyMockedDeep<T>;
    isMockFunction(fn: any): fn is EnhancedSpy;
    clearAllMocks(): this;
    resetAllMocks(): this;
    restoreAllMocks(): this;
    /**
     * Will put a value on global scope. Useful, if you are
     * using jsdom/happy-dom and want to mock global variables, like
     * `IntersectionObserver`.
     */
    stubGlobal(name: string | symbol | number, value: any): this;
    resetModules(): this;
    /**
     * Wait for all imports to load.
     * Useful, if you have a synchronous call that starts
     * importing a module, that you cannot wait otherwise.
     */
    dynamicImportSettled(): Promise<void>;
}
declare const vitest: VitestUtils;
declare const vi: VitestUtils;

declare function getRunningMode(): "run" | "watch";
declare function isWatchMode(): boolean;

interface TransformResultWithSource extends TransformResult {
    source?: string;
}
interface WebSocketHandlers {
    onWatcherStart: () => Promise<void>;
    onFinished(files?: File[]): Promise<void>;
    onCollected(files?: File[]): Promise<void>;
    onTaskUpdate(packs: TaskResultPack[]): void;
    getFiles(): File[];
    getPaths(): Promise<string[]>;
    getConfig(): ResolvedConfig;
    getModuleGraph(id: string): Promise<ModuleGraphData>;
    getTransformResult(id: string): Promise<TransformResultWithSource | undefined>;
    readFile(id: string): Promise<string>;
    writeFile(id: string, content: string): Promise<void>;
    rerun(files: string[]): Promise<void>;
    updateSnapshot(file?: File): Promise<void>;
}
interface WebSocketEvents extends Pick<Reporter, 'onCollected' | 'onFinished' | 'onTaskUpdate' | 'onUserConsoleLog' | 'onPathsCollected'> {
}

export { TransformResultWithSource, WebSocketEvents, WebSocketHandlers, getRunningMode, isFirstRun, isWatchMode, runOnce, vi, vitest, withCallback };
