var j = Object.defineProperty;
var q = (s, r, t) => r in s ? j(s, r, { enumerable: !0, configurable: !0, writable: !0, value: t }) : s[r] = t;
var a = (s, r, t) => (q(s, typeof r != "symbol" ? r + "" : r, t), t), z = (s, r, t) => {
  if (!r.has(s))
    throw TypeError("Cannot " + t);
};
var c = (s, r, t) => (z(s, r, "read from private field"), t ? t.call(s) : r.get(s)), K = (s, r, t) => {
  if (r.has(s))
    throw TypeError("Cannot add the same private member more than once");
  r instanceof WeakSet ? r.add(s) : r.set(s, t);
};

// src/event.ts
function i(s, r = null) {
  let t = new Event(s);
  return Object.defineProperty(t, "task", {
    value: r,
    enumerable: !0,
    writable: !1,
    configurable: !1
  }), t;
}

// src/constants.ts
var V = {
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
}, T = V;

// src/utils.ts
var N = (s) => s / 1e6, g = () => {
  var s;
  return typeof ((s = globalThis.process) == null ? void 0 : s.hrtime) == "function" ? N(Number(process.hrtime.bigint())) : performance.now();
}, R = (s) => s.reduce((r, t) => r + t, 0) / s.length || 0, O = (s, r) => s.reduce((n, e) => n + (e - r) ** 2) / (s.length - 1) || 0;

// src/task.ts
var l = class extends EventTarget {
  constructor(t, n, e) {
    super();
    a(this, "bench");
    a(this, "name");
    a(this, "fn");
    a(this, "runs", 0);
    a(this, "result");
    this.bench = t, this.name = n, this.fn = e;
  }
  async run() {
    var o, u, d;
    this.dispatchEvent(i("start", this));
    let t = this.bench.now(), n = 0, e = [];
    for (await this.bench.setup(this, "run"); (n < this.bench.time || this.runs < this.bench.iterations) && !((o = this.bench.signal) != null && o.aborted); ) {
      let p = 0;
      try {
        await Promise.resolve().then(() => (p = this.bench.now(), this.fn()));
      } catch (b) {
        this.setResult({ error: b });
      }
      let m = this.bench.now() - p;
      this.runs += 1, e.push(m), n = this.bench.now() - t;
    }
    await this.bench.teardown(this, "run"), e.sort();
    {
      let p = e[0], m = e[e.length - 1], b = n / this.runs, F = 1 / b, f = R(e), k = O(e, f), y = Math.sqrt(k), x = y / Math.sqrt(e.length), M = e.length - 1, B = T[String(Math.round(M) || 1)] || T.infinity, L = x * B, P = L / f * 100 || 0, I = e[Math.ceil(e.length * (75 / 100)) - 1], H = e[Math.ceil(e.length * (99 / 100)) - 1], A = e[Math.ceil(e.length * (99.5 / 100)) - 1], S = e[Math.ceil(e.length * (99.9 / 100)) - 1];
      if ((u = this.bench.signal) != null && u.aborted)
        return this;
      this.setResult({
        totalTime: n,
        min: p,
        max: m,
        hz: F,
        period: b,
        samples: e,
        mean: f,
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
    return (d = this.result) != null && d.error && (this.dispatchEvent(i("error", this)), this.bench.dispatchEvent(i("error", this))), this.dispatchEvent(i("cycle", this)), this.bench.dispatchEvent(i("cycle", this)), this.dispatchEvent(i("complete", this)), this;
  }
  async warmup() {
    var e;
    this.dispatchEvent(i("warmup", this));
    let t = this.bench.now(), n = 0;
    for (this.bench.setup(this, "warmup"); (n < this.bench.warmupTime || this.runs < this.bench.warmupIterations) && !((e = this.bench.signal) != null && e.aborted); ) {
      try {
        await Promise.resolve().then(this.fn);
      } catch (o) {
      }
      this.runs += 1, n = this.bench.now() - t;
    }
    this.bench.teardown(this, "warmup"), this.runs = 0;
  }
  addEventListener(t, n, e) {
    super.addEventListener(t, n, e);
  }
  removeEventListener(t, n, e) {
    super.removeEventListener(t, n, e);
  }
  setResult(t) {
    this.result = { ...this.result, ...t }, Object.freeze(this.reset);
  }
  reset() {
    this.dispatchEvent(i("reset", this)), this.runs = 0, this.result = void 0;
  }
};

// src/bench.ts
var h, w = class extends EventTarget {
  constructor(t = {}) {
    var n, e, o, u, d, p, m;
    super();
    K(this, h, /* @__PURE__ */ new Map());
    a(this, "signal");
    a(this, "warmupTime", 100);
    a(this, "warmupIterations", 5);
    a(this, "time", 500);
    a(this, "iterations", 10);
    a(this, "now", g);
    a(this, "setup");
    a(this, "teardown");
    this.now = (n = t.now) != null ? n : this.now, this.warmupTime = (e = t.warmupTime) != null ? e : this.warmupTime, this.warmupIterations = (o = t.warmupIterations) != null ? o : this.warmupIterations, this.time = (u = t.time) != null ? u : this.time, this.iterations = (d = t.iterations) != null ? d : this.iterations, this.signal = t.signal, this.setup = (p = t.setup) != null ? p : () => {
    }, this.teardown = (m = t.teardown) != null ? m : () => {
    }, this.signal && this.signal.addEventListener("abort", () => {
      this.dispatchEvent(i("abort"));
    }, { once: !0 });
  }
  async run() {
    this.dispatchEvent(i("start"));
    let t = await Promise.all([...c(this, h).entries()].map(async ([n, e]) => {
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
  add(t, n) {
    let e = new l(this, t, n);
    return c(this, h).set(t, e), this.dispatchEvent(i("add", e)), this;
  }
  remove(t) {
    let n = this.getTask(t);
    return this.dispatchEvent(i("remove", n)), c(this, h).delete(t), this;
  }
  addEventListener(t, n, e) {
    super.addEventListener(t, n, e);
  }
  removeEventListener(t, n, e) {
    super.removeEventListener(t, n, e);
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
var st = w;
export {
  w as Bench,
  l as Task,
  st as default,
  g as now
};
