"use strict";
var b = Object.defineProperty;
var j = Object.getOwnPropertyDescriptor;
var q = Object.getOwnPropertyNames;
var z = Object.prototype.hasOwnProperty;
var V = (s, n, t) => n in s ? b(s, n, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[n] = t;
var N = (s, n) => {
  for (var t in n)
    b(s, t, { get: n[t], enumerable: !0 });
}, _ = (s, n, t, r) => {
  if (n && typeof n == "object" || typeof n == "function")
    for (let e of q(n))
      !z.call(s, e) && e !== t && b(s, e, { get: () => n[e], enumerable: !(r = j(n, e)) || r.enumerable });
  return s;
};
var C = (s) => _(b({}, "__esModule", { value: !0 }), s);
var a = (s, n, t) => (V(s, typeof n != "symbol" ? n + "" : n, t), t), D = (s, n, t) => {
  if (!n.has(s))
    throw TypeError("Cannot " + t);
};
var c = (s, n, t) => (D(s, n, "read from private field"), t ? t.call(s) : n.get(s)), K = (s, n, t) => {
  if (n.has(s))
    throw TypeError("Cannot add the same private member more than once");
  n instanceof WeakSet ? n.add(s) : n.set(s, t);
};

// src/index.ts
var U = {};
N(U, {
  Bench: () => d,
  Task: () => m,
  default: () => Q,
  now: () => f
});
module.exports = C(U);

// src/event.ts
function i(s, n = null) {
  let t = new Event(s);
  return Object.defineProperty(t, "task", {
    value: n,
    enumerable: !0,
    writable: !1,
    configurable: !1
  }), t;
}

// src/constants.ts
var G = {
  1: 12.71,
  2: 4.303,
  3: 3.182,
  4: 2.776,
  5: 2.571,
  6: 2.447,
  7: 2.365,
  8: 2.306,
  9: 2.262,
  10: 2.228,
  11: 2.201,
  12: 2.179,
  13: 2.16,
  14: 2.145,
  15: 2.131,
  16: 2.12,
  17: 2.11,
  18: 2.101,
  19: 2.093,
  20: 2.086,
  21: 2.08,
  22: 2.074,
  23: 2.069,
  24: 2.064,
  25: 2.06,
  26: 2.056,
  27: 2.052,
  28: 2.048,
  29: 2.045,
  30: 2.042,
  31: 2.0399,
  32: 2.0378,
  33: 2.0357,
  34: 2.0336,
  35: 2.0315,
  36: 2.0294,
  37: 2.0273,
  38: 2.0252,
  39: 2.0231,
  40: 2.021,
  41: 2.0198,
  42: 2.0186,
  43: 2.0174,
  44: 2.0162,
  45: 2.015,
  46: 2.0138,
  47: 2.0126,
  48: 2.0114,
  49: 2.0102,
  50: 2.009,
  51: 2.0081,
  52: 2.0072,
  53: 2.0063,
  54: 2.0054,
  55: 2.0045,
  56: 2.0036,
  57: 2.0027,
  58: 2.0018,
  59: 2.0009,
  60: 2,
  61: 1.9995,
  62: 1.999,
  63: 1.9985,
  64: 1.998,
  65: 1.9975,
  66: 1.997,
  67: 1.9965,
  68: 1.996,
  69: 1.9955,
  70: 1.995,
  71: 1.9945,
  72: 1.994,
  73: 1.9935,
  74: 1.993,
  75: 1.9925,
  76: 1.992,
  77: 1.9915,
  78: 1.991,
  79: 1.9905,
  80: 1.99,
  81: 1.9897,
  82: 1.9894,
  83: 1.9891,
  84: 1.9888,
  85: 1.9885,
  86: 1.9882,
  87: 1.9879,
  88: 1.9876,
  89: 1.9873,
  90: 1.987,
  91: 1.9867,
  92: 1.9864,
  93: 1.9861,
  94: 1.9858,
  95: 1.9855,
  96: 1.9852,
  97: 1.9849,
  98: 1.9846,
  99: 1.9843,
  100: 1.984,
  101: 1.9838,
  102: 1.9836,
  103: 1.9834,
  104: 1.9832,
  105: 1.983,
  106: 1.9828,
  107: 1.9826,
  108: 1.9824,
  109: 1.9822,
  110: 1.982,
  111: 1.9818,
  112: 1.9816,
  113: 1.9814,
  114: 1.9812,
  115: 1.9819,
  116: 1.9808,
  117: 1.9806,
  118: 1.9804,
  119: 1.9802,
  120: 1.98,
  infinity: 1.96
}, g = G;

// src/utils.ts
var J = (s) => s / 1e6, f = () => {
  var s;
  return typeof ((s = globalThis.process) == null ? void 0 : s.hrtime) == "function" ? J(Number(process.hrtime.bigint())) : performance.now();
}, R = (s) => s.reduce((n, t) => n + t, 0) / s.length || 0, O = (s, n) => s.reduce((r, e) => r + (e - n) ** 2) / (s.length - 1) || 0;

// src/task.ts
var m = class extends EventTarget {
  constructor(t, r, e) {
    super();
    a(this, "bench");
    a(this, "name");
    a(this, "fn");
    a(this, "runs", 0);
    a(this, "result");
    this.bench = t, this.name = r, this.fn = e;
  }
  async run() {
    var o, u, v;
    this.dispatchEvent(i("start", this));
    let t = this.bench.now(), r = 0, e = [];
    for (await this.bench.setup(this, "run"); (r < this.bench.time || this.runs < this.bench.iterations) && !((o = this.bench.signal) != null && o.aborted); ) {
      let p = 0;
      try {
        await Promise.resolve().then(() => (p = this.bench.now(), this.fn()));
      } catch (w) {
        this.setResult({ error: w });
      }
      let l = this.bench.now() - p;
      this.runs += 1, e.push(l), r = this.bench.now() - t;
    }
    await this.bench.teardown(this, "run"), e.sort();
    {
      let p = e[0], l = e[e.length - 1], w = r / this.runs, F = 1 / w, T = R(e), k = O(e, T), y = Math.sqrt(k), x = y / Math.sqrt(e.length), M = e.length - 1, B = g[String(Math.round(M) || 1)] || g.infinity, L = x * B, P = L / T * 100 || 0, I = e[Math.ceil(e.length * (75 / 100)) - 1], H = e[Math.ceil(e.length * (99 / 100)) - 1], A = e[Math.ceil(e.length * (99.5 / 100)) - 1], S = e[Math.ceil(e.length * (99.9 / 100)) - 1];
      if ((u = this.bench.signal) != null && u.aborted)
        return this;
      this.setResult({
        totalTime: r,
        min: p,
        max: l,
        hz: F,
        period: w,
        samples: e,
        mean: T,
        variance: k,
        sd: y,
        sem: x,
        df: M,
        critical: B,
        moe: L,
        rme: P,
        p75: I,
        p99: H,
        p995: A,
        p999: S
      });
    }
    return (v = this.result) != null && v.error && (this.dispatchEvent(i("error", this)), this.bench.dispatchEvent(i("error", this))), this.dispatchEvent(i("cycle", this)), this.bench.dispatchEvent(i("cycle", this)), this.dispatchEvent(i("complete", this)), this;
  }
  async warmup() {
    var e;
    this.dispatchEvent(i("warmup", this));
    let t = this.bench.now(), r = 0;
    for (this.bench.setup(this, "warmup"); (r < this.bench.warmupTime || this.runs < this.bench.warmupIterations) && !((e = this.bench.signal) != null && e.aborted); ) {
      try {
        await Promise.resolve().then(this.fn);
      } catch (o) {
      }
      this.runs += 1, r = this.bench.now() - t;
    }
    this.bench.teardown(this, "warmup"), this.runs = 0;
  }
  addEventListener(t, r, e) {
    super.addEventListener(t, r, e);
  }
  removeEventListener(t, r, e) {
    super.removeEventListener(t, r, e);
  }
  setResult(t) {
    this.result = { ...this.result, ...t }, Object.freeze(this.reset);
  }
  reset() {
    this.dispatchEvent(i("reset", this)), this.runs = 0, this.result = void 0;
  }
};

// src/bench.ts
var h, d = class extends EventTarget {
  constructor(t = {}) {
    var r, e, o, u, v, p, l;
    super();
    K(this, h, /* @__PURE__ */ new Map());
    a(this, "signal");
    a(this, "warmupTime", 100);
    a(this, "warmupIterations", 5);
    a(this, "time", 500);
    a(this, "iterations", 10);
    a(this, "now", f);
    a(this, "setup");
    a(this, "teardown");
    this.now = (r = t.now) != null ? r : this.now, this.warmupTime = (e = t.warmupTime) != null ? e : this.warmupTime, this.warmupIterations = (o = t.warmupIterations) != null ? o : this.warmupIterations, this.time = (u = t.time) != null ? u : this.time, this.iterations = (v = t.iterations) != null ? v : this.iterations, this.signal = t.signal, this.setup = (p = t.setup) != null ? p : () => {
    }, this.teardown = (l = t.teardown) != null ? l : () => {
    }, this.signal && this.signal.addEventListener("abort", () => {
      this.dispatchEvent(i("abort"));
    }, { once: !0 });
  }
  async run() {
    this.dispatchEvent(i("start"));
    let t = await Promise.all([...c(this, h).entries()].map(async ([r, e]) => {
      var o;
      return (o = this.signal) != null && o.aborted ? e : await new Promise((u) => setTimeout(async () => {
        u(await e.run());
      }));
    }));
    return this.dispatchEvent(i("complete")), t;
  }
  async warmup() {
    this.dispatchEvent(i("warmup"));
    for (let [, t] of c(this, h))
      await t.warmup();
  }
  reset() {
    this.dispatchEvent(i("reset")), c(this, h).forEach((t) => {
      t.reset();
    });
  }
  add(t, r) {
    let e = new m(this, t, r);
    return c(this, h).set(t, e), this.dispatchEvent(i("add", e)), this;
  }
  remove(t) {
    let r = this.getTask(t);
    return this.dispatchEvent(i("remove", r)), c(this, h).delete(t), this;
  }
  addEventListener(t, r, e) {
    super.addEventListener(t, r, e);
  }
  removeEventListener(t, r, e) {
    super.removeEventListener(t, r, e);
  }
  get results() {
    return [...c(this, h).values()].map((t) => t.result);
  }
  get tasks() {
    return [...c(this, h).values()];
  }
  getTask(t) {
    return c(this, h).get(t);
  }
};
h = new WeakMap();

// src/index.ts
var Q = d;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Bench,
  Task,
  now
});
