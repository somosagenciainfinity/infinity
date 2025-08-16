var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });

// node_modules/unenv/dist/runtime/_internal/utils.mjs
// @__NO_SIDE_EFFECTS__
function createNotImplementedError(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented(name) {
  const fn = /* @__PURE__ */ __name(() => {
    throw /* @__PURE__ */ createNotImplementedError(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass, "notImplementedClass");

// node_modules/unenv/dist/runtime/node/internal/perf_hooks/performance.mjs
var _timeOrigin = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin;
var nodeTiming = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry = class {
  static {
    __name(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark = class PerformanceMark2 extends PerformanceEntry {
  static {
    __name(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming = class extends PerformanceEntry {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance = class {
  static {
    __name(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw createNotImplementedError("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin) {
      return _performanceNow();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw createNotImplementedError("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw createNotImplementedError("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver = class {
  static {
    __name(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw createNotImplementedError("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw createNotImplementedError("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance();

// node_modules/@cloudflare/unenv-preset/dist/runtime/polyfill/performance.mjs
globalThis.performance = performance;
globalThis.Performance = Performance;
globalThis.PerformanceEntry = PerformanceEntry;
globalThis.PerformanceMark = PerformanceMark;
globalThis.PerformanceMeasure = PerformanceMeasure;
globalThis.PerformanceObserver = PerformanceObserver;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming;

// node_modules/unenv/dist/runtime/node/console.mjs
import { Writable } from "node:stream";

// node_modules/unenv/dist/runtime/mock/noop.mjs
var noop_default = Object.assign(() => {
}, { __unenv__: true });

// node_modules/unenv/dist/runtime/node/console.mjs
var _console = globalThis.console;
var _ignoreErrors = true;
var _stderr = new Writable();
var _stdout = new Writable();
var log = _console?.log ?? noop_default;
var info = _console?.info ?? log;
var trace = _console?.trace ?? info;
var debug = _console?.debug ?? log;
var table = _console?.table ?? log;
var error = _console?.error ?? log;
var warn = _console?.warn ?? error;
var createTask = _console?.createTask ?? /* @__PURE__ */ notImplemented("console.createTask");
var clear = _console?.clear ?? noop_default;
var count = _console?.count ?? noop_default;
var countReset = _console?.countReset ?? noop_default;
var dir = _console?.dir ?? noop_default;
var dirxml = _console?.dirxml ?? noop_default;
var group = _console?.group ?? noop_default;
var groupEnd = _console?.groupEnd ?? noop_default;
var groupCollapsed = _console?.groupCollapsed ?? noop_default;
var profile = _console?.profile ?? noop_default;
var profileEnd = _console?.profileEnd ?? noop_default;
var time = _console?.time ?? noop_default;
var timeEnd = _console?.timeEnd ?? noop_default;
var timeLog = _console?.timeLog ?? noop_default;
var timeStamp = _console?.timeStamp ?? noop_default;
var Console = _console?.Console ?? /* @__PURE__ */ notImplementedClass("console.Console");
var _times = /* @__PURE__ */ new Map();
var _stdoutErrorHandler = noop_default;
var _stderrErrorHandler = noop_default;

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/console.mjs
var workerdConsole = globalThis["console"];
var {
  assert,
  clear: clear2,
  // @ts-expect-error undocumented public API
  context,
  count: count2,
  countReset: countReset2,
  // @ts-expect-error undocumented public API
  createTask: createTask2,
  debug: debug2,
  dir: dir2,
  dirxml: dirxml2,
  error: error2,
  group: group2,
  groupCollapsed: groupCollapsed2,
  groupEnd: groupEnd2,
  info: info2,
  log: log2,
  profile: profile2,
  profileEnd: profileEnd2,
  table: table2,
  time: time2,
  timeEnd: timeEnd2,
  timeLog: timeLog2,
  timeStamp: timeStamp2,
  trace: trace2,
  warn: warn2
} = workerdConsole;
Object.assign(workerdConsole, {
  Console,
  _ignoreErrors,
  _stderr,
  _stderrErrorHandler,
  _stdout,
  _stdoutErrorHandler,
  _times
});
var console_default = workerdConsole;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-console
globalThis.console = console_default;

// node_modules/unenv/dist/runtime/node/internal/process/hrtime.mjs
var hrtime = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name(function hrtime2(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime"), { bigint: /* @__PURE__ */ __name(function bigint() {
  return BigInt(Date.now() * 1e6);
}, "bigint") });

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
import { EventEmitter } from "node:events";

// node_modules/unenv/dist/runtime/node/internal/tty/write-stream.mjs
var WriteStream = class {
  static {
    __name(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir4, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env3) {
    return 1;
  }
  hasColors(count4, env3) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};

// node_modules/unenv/dist/runtime/node/internal/tty/read-stream.mjs
var ReadStream = class {
  static {
    __name(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};

// node_modules/unenv/dist/runtime/node/internal/process/node-version.mjs
var NODE_VERSION = "22.14.0";

// node_modules/unenv/dist/runtime/node/internal/process/process.mjs
var Process = class _Process2 extends EventEmitter {
  static {
    __name(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process2.prototype), ...Object.getOwnPropertyNames(EventEmitter.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd3) {
    this.#cwd = cwd3;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION}`;
  }
  get versions() {
    return { node: NODE_VERSION };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw createNotImplementedError("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw createNotImplementedError("process.getActiveResourcesInfo");
  }
  exit() {
    throw createNotImplementedError("process.exit");
  }
  reallyExit() {
    throw createNotImplementedError("process.reallyExit");
  }
  kill() {
    throw createNotImplementedError("process.kill");
  }
  abort() {
    throw createNotImplementedError("process.abort");
  }
  dlopen() {
    throw createNotImplementedError("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw createNotImplementedError("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw createNotImplementedError("process.loadEnvFile");
  }
  disconnect() {
    throw createNotImplementedError("process.disconnect");
  }
  cpuUsage() {
    throw createNotImplementedError("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw createNotImplementedError("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw createNotImplementedError("process.initgroups");
  }
  openStdin() {
    throw createNotImplementedError("process.openStdin");
  }
  assert() {
    throw createNotImplementedError("process.assert");
  }
  binding() {
    throw createNotImplementedError("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};

// node_modules/@cloudflare/unenv-preset/dist/runtime/node/process.mjs
var globalProcess = globalThis["process"];
var getBuiltinModule = globalProcess.getBuiltinModule;
var { exit, platform, nextTick } = getBuiltinModule(
  "node:process"
);
var unenvProcess = new Process({
  env: globalProcess.env,
  hrtime,
  nextTick
});
var {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  finalization,
  features,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  on,
  off,
  once,
  pid,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
} = unenvProcess;
var _process = {
  abort,
  addListener,
  allowedNodeEnvironmentFlags,
  hasUncaughtExceptionCaptureCallback,
  setUncaughtExceptionCaptureCallback,
  loadEnvFile,
  sourceMapsEnabled,
  arch,
  argv,
  argv0,
  chdir,
  config,
  connected,
  constrainedMemory,
  availableMemory,
  cpuUsage,
  cwd,
  debugPort,
  dlopen,
  disconnect,
  emit,
  emitWarning,
  env,
  eventNames,
  execArgv,
  execPath,
  exit,
  finalization,
  features,
  getBuiltinModule,
  getActiveResourcesInfo,
  getMaxListeners,
  hrtime: hrtime3,
  kill,
  listeners,
  listenerCount,
  memoryUsage,
  nextTick,
  on,
  off,
  once,
  pid,
  platform,
  ppid,
  prependListener,
  prependOnceListener,
  rawListeners,
  release,
  removeAllListeners,
  removeListener,
  report,
  resourceUsage,
  setMaxListeners,
  setSourceMapsEnabled,
  stderr,
  stdin,
  stdout,
  title,
  throwDeprecation,
  traceDeprecation,
  umask,
  uptime,
  version,
  versions,
  // @ts-expect-error old API
  domain,
  initgroups,
  moduleLoadList,
  reallyExit,
  openStdin,
  assert: assert2,
  binding,
  send,
  exitCode,
  channel,
  getegid,
  geteuid,
  getgid,
  getgroups,
  getuid,
  setegid,
  seteuid,
  setgid,
  setgroups,
  setuid,
  permission,
  mainModule,
  _events,
  _eventsCount,
  _exiting,
  _maxListeners,
  _debugEnd,
  _debugProcess,
  _fatalException,
  _getActiveHandles,
  _getActiveRequests,
  _kill,
  _preload_modules,
  _rawDebug,
  _startProfilerIdleNotifier,
  _stopProfilerIdleNotifier,
  _tickCallback,
  _disconnect,
  _handleQueue,
  _pendingMessage,
  _channel,
  _send,
  _linkedBinding
};
var process_default = _process;

// node_modules/wrangler/_virtual_unenv_global_polyfill-@cloudflare-unenv-preset-node-process
globalThis.process = process_default;

// .wrangler/tmp/pages-ADrpaQ/bundledWorker-0.1946547087483126.mjs
import { Writable as Writable2 } from "node:stream";
import { EventEmitter as EventEmitter2 } from "node:events";
var __defProp2 = Object.defineProperty;
var __name2 = /* @__PURE__ */ __name((target, value) => __defProp2(target, "name", { value, configurable: true }), "__name");
// @__NO_SIDE_EFFECTS__
function createNotImplementedError2(name) {
  return new Error(`[unenv] ${name} is not implemented yet!`);
}
__name(createNotImplementedError2, "createNotImplementedError");
__name2(createNotImplementedError2, "createNotImplementedError");
// @__NO_SIDE_EFFECTS__
function notImplemented2(name) {
  const fn = /* @__PURE__ */ __name2(() => {
    throw /* @__PURE__ */ createNotImplementedError2(name);
  }, "fn");
  return Object.assign(fn, { __unenv__: true });
}
__name(notImplemented2, "notImplemented");
__name2(notImplemented2, "notImplemented");
// @__NO_SIDE_EFFECTS__
function notImplementedClass2(name) {
  return class {
    __unenv__ = true;
    constructor() {
      throw new Error(`[unenv] ${name} is not implemented yet!`);
    }
  };
}
__name(notImplementedClass2, "notImplementedClass");
__name2(notImplementedClass2, "notImplementedClass");
var _timeOrigin2 = globalThis.performance?.timeOrigin ?? Date.now();
var _performanceNow2 = globalThis.performance?.now ? globalThis.performance.now.bind(globalThis.performance) : () => Date.now() - _timeOrigin2;
var nodeTiming2 = {
  name: "node",
  entryType: "node",
  startTime: 0,
  duration: 0,
  nodeStart: 0,
  v8Start: 0,
  bootstrapComplete: 0,
  environment: 0,
  loopStart: 0,
  loopExit: 0,
  idleTime: 0,
  uvMetricsInfo: {
    loopCount: 0,
    events: 0,
    eventsWaiting: 0
  },
  detail: void 0,
  toJSON() {
    return this;
  }
};
var PerformanceEntry2 = class {
  static {
    __name(this, "PerformanceEntry");
  }
  static {
    __name2(this, "PerformanceEntry");
  }
  __unenv__ = true;
  detail;
  entryType = "event";
  name;
  startTime;
  constructor(name, options) {
    this.name = name;
    this.startTime = options?.startTime || _performanceNow2();
    this.detail = options?.detail;
  }
  get duration() {
    return _performanceNow2() - this.startTime;
  }
  toJSON() {
    return {
      name: this.name,
      entryType: this.entryType,
      startTime: this.startTime,
      duration: this.duration,
      detail: this.detail
    };
  }
};
var PerformanceMark3 = class PerformanceMark22 extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMark2");
  }
  static {
    __name2(this, "PerformanceMark");
  }
  entryType = "mark";
  constructor() {
    super(...arguments);
  }
  get duration() {
    return 0;
  }
};
var PerformanceMeasure2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceMeasure");
  }
  static {
    __name2(this, "PerformanceMeasure");
  }
  entryType = "measure";
};
var PerformanceResourceTiming2 = class extends PerformanceEntry2 {
  static {
    __name(this, "PerformanceResourceTiming");
  }
  static {
    __name2(this, "PerformanceResourceTiming");
  }
  entryType = "resource";
  serverTiming = [];
  connectEnd = 0;
  connectStart = 0;
  decodedBodySize = 0;
  domainLookupEnd = 0;
  domainLookupStart = 0;
  encodedBodySize = 0;
  fetchStart = 0;
  initiatorType = "";
  name = "";
  nextHopProtocol = "";
  redirectEnd = 0;
  redirectStart = 0;
  requestStart = 0;
  responseEnd = 0;
  responseStart = 0;
  secureConnectionStart = 0;
  startTime = 0;
  transferSize = 0;
  workerStart = 0;
  responseStatus = 0;
};
var PerformanceObserverEntryList2 = class {
  static {
    __name(this, "PerformanceObserverEntryList");
  }
  static {
    __name2(this, "PerformanceObserverEntryList");
  }
  __unenv__ = true;
  getEntries() {
    return [];
  }
  getEntriesByName(_name, _type) {
    return [];
  }
  getEntriesByType(type) {
    return [];
  }
};
var Performance2 = class {
  static {
    __name(this, "Performance");
  }
  static {
    __name2(this, "Performance");
  }
  __unenv__ = true;
  timeOrigin = _timeOrigin2;
  eventCounts = /* @__PURE__ */ new Map();
  _entries = [];
  _resourceTimingBufferSize = 0;
  navigation = void 0;
  timing = void 0;
  timerify(_fn, _options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.timerify");
  }
  get nodeTiming() {
    return nodeTiming2;
  }
  eventLoopUtilization() {
    return {};
  }
  markResourceTiming() {
    return new PerformanceResourceTiming2("");
  }
  onresourcetimingbufferfull = null;
  now() {
    if (this.timeOrigin === _timeOrigin2) {
      return _performanceNow2();
    }
    return Date.now() - this.timeOrigin;
  }
  clearMarks(markName) {
    this._entries = markName ? this._entries.filter((e) => e.name !== markName) : this._entries.filter((e) => e.entryType !== "mark");
  }
  clearMeasures(measureName) {
    this._entries = measureName ? this._entries.filter((e) => e.name !== measureName) : this._entries.filter((e) => e.entryType !== "measure");
  }
  clearResourceTimings() {
    this._entries = this._entries.filter((e) => e.entryType !== "resource" || e.entryType !== "navigation");
  }
  getEntries() {
    return this._entries;
  }
  getEntriesByName(name, type) {
    return this._entries.filter((e) => e.name === name && (!type || e.entryType === type));
  }
  getEntriesByType(type) {
    return this._entries.filter((e) => e.entryType === type);
  }
  mark(name, options) {
    const entry = new PerformanceMark3(name, options);
    this._entries.push(entry);
    return entry;
  }
  measure(measureName, startOrMeasureOptions, endMark) {
    let start;
    let end;
    if (typeof startOrMeasureOptions === "string") {
      start = this.getEntriesByName(startOrMeasureOptions, "mark")[0]?.startTime;
      end = this.getEntriesByName(endMark, "mark")[0]?.startTime;
    } else {
      start = Number.parseFloat(startOrMeasureOptions?.start) || this.now();
      end = Number.parseFloat(startOrMeasureOptions?.end) || this.now();
    }
    const entry = new PerformanceMeasure2(measureName, {
      startTime: start,
      detail: {
        start,
        end
      }
    });
    this._entries.push(entry);
    return entry;
  }
  setResourceTimingBufferSize(maxSize) {
    this._resourceTimingBufferSize = maxSize;
  }
  addEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.addEventListener");
  }
  removeEventListener(type, listener, options) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.removeEventListener");
  }
  dispatchEvent(event) {
    throw /* @__PURE__ */ createNotImplementedError2("Performance.dispatchEvent");
  }
  toJSON() {
    return this;
  }
};
var PerformanceObserver2 = class {
  static {
    __name(this, "PerformanceObserver");
  }
  static {
    __name2(this, "PerformanceObserver");
  }
  __unenv__ = true;
  static supportedEntryTypes = [];
  _callback = null;
  constructor(callback) {
    this._callback = callback;
  }
  takeRecords() {
    return [];
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.disconnect");
  }
  observe(options) {
    throw /* @__PURE__ */ createNotImplementedError2("PerformanceObserver.observe");
  }
  bind(fn) {
    return fn;
  }
  runInAsyncScope(fn, thisArg, ...args) {
    return fn.call(thisArg, ...args);
  }
  asyncId() {
    return 0;
  }
  triggerAsyncId() {
    return 0;
  }
  emitDestroy() {
    return this;
  }
};
var performance2 = globalThis.performance && "addEventListener" in globalThis.performance ? globalThis.performance : new Performance2();
globalThis.performance = performance2;
globalThis.Performance = Performance2;
globalThis.PerformanceEntry = PerformanceEntry2;
globalThis.PerformanceMark = PerformanceMark3;
globalThis.PerformanceMeasure = PerformanceMeasure2;
globalThis.PerformanceObserver = PerformanceObserver2;
globalThis.PerformanceObserverEntryList = PerformanceObserverEntryList2;
globalThis.PerformanceResourceTiming = PerformanceResourceTiming2;
var noop_default2 = Object.assign(() => {
}, { __unenv__: true });
var _console2 = globalThis.console;
var _ignoreErrors2 = true;
var _stderr2 = new Writable2();
var _stdout2 = new Writable2();
var log3 = _console2?.log ?? noop_default2;
var info3 = _console2?.info ?? log3;
var trace3 = _console2?.trace ?? info3;
var debug3 = _console2?.debug ?? log3;
var table3 = _console2?.table ?? log3;
var error3 = _console2?.error ?? log3;
var warn3 = _console2?.warn ?? error3;
var createTask3 = _console2?.createTask ?? /* @__PURE__ */ notImplemented2("console.createTask");
var clear3 = _console2?.clear ?? noop_default2;
var count3 = _console2?.count ?? noop_default2;
var countReset3 = _console2?.countReset ?? noop_default2;
var dir3 = _console2?.dir ?? noop_default2;
var dirxml3 = _console2?.dirxml ?? noop_default2;
var group3 = _console2?.group ?? noop_default2;
var groupEnd3 = _console2?.groupEnd ?? noop_default2;
var groupCollapsed3 = _console2?.groupCollapsed ?? noop_default2;
var profile3 = _console2?.profile ?? noop_default2;
var profileEnd3 = _console2?.profileEnd ?? noop_default2;
var time3 = _console2?.time ?? noop_default2;
var timeEnd3 = _console2?.timeEnd ?? noop_default2;
var timeLog3 = _console2?.timeLog ?? noop_default2;
var timeStamp3 = _console2?.timeStamp ?? noop_default2;
var Console2 = _console2?.Console ?? /* @__PURE__ */ notImplementedClass2("console.Console");
var _times2 = /* @__PURE__ */ new Map();
var _stdoutErrorHandler2 = noop_default2;
var _stderrErrorHandler2 = noop_default2;
var workerdConsole2 = globalThis["console"];
var {
  assert: assert3,
  clear: clear22,
  // @ts-expect-error undocumented public API
  context: context2,
  count: count22,
  countReset: countReset22,
  // @ts-expect-error undocumented public API
  createTask: createTask22,
  debug: debug22,
  dir: dir22,
  dirxml: dirxml22,
  error: error22,
  group: group22,
  groupCollapsed: groupCollapsed22,
  groupEnd: groupEnd22,
  info: info22,
  log: log22,
  profile: profile22,
  profileEnd: profileEnd22,
  table: table22,
  time: time22,
  timeEnd: timeEnd22,
  timeLog: timeLog22,
  timeStamp: timeStamp22,
  trace: trace22,
  warn: warn22
} = workerdConsole2;
Object.assign(workerdConsole2, {
  Console: Console2,
  _ignoreErrors: _ignoreErrors2,
  _stderr: _stderr2,
  _stderrErrorHandler: _stderrErrorHandler2,
  _stdout: _stdout2,
  _stdoutErrorHandler: _stdoutErrorHandler2,
  _times: _times2
});
var console_default2 = workerdConsole2;
globalThis.console = console_default2;
var hrtime4 = /* @__PURE__ */ Object.assign(/* @__PURE__ */ __name2(/* @__PURE__ */ __name(function hrtime22(startTime) {
  const now = Date.now();
  const seconds = Math.trunc(now / 1e3);
  const nanos = now % 1e3 * 1e6;
  if (startTime) {
    let diffSeconds = seconds - startTime[0];
    let diffNanos = nanos - startTime[0];
    if (diffNanos < 0) {
      diffSeconds = diffSeconds - 1;
      diffNanos = 1e9 + diffNanos;
    }
    return [diffSeconds, diffNanos];
  }
  return [seconds, nanos];
}, "hrtime2"), "hrtime"), { bigint: /* @__PURE__ */ __name2(/* @__PURE__ */ __name(function bigint2() {
  return BigInt(Date.now() * 1e6);
}, "bigint"), "bigint") });
var WriteStream2 = class {
  static {
    __name(this, "WriteStream");
  }
  static {
    __name2(this, "WriteStream");
  }
  fd;
  columns = 80;
  rows = 24;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  clearLine(dir32, callback) {
    callback && callback();
    return false;
  }
  clearScreenDown(callback) {
    callback && callback();
    return false;
  }
  cursorTo(x2, y, callback) {
    callback && typeof callback === "function" && callback();
    return false;
  }
  moveCursor(dx, dy, callback) {
    callback && callback();
    return false;
  }
  getColorDepth(env22) {
    return 1;
  }
  hasColors(count32, env22) {
    return false;
  }
  getWindowSize() {
    return [this.columns, this.rows];
  }
  write(str, encoding, cb) {
    if (str instanceof Uint8Array) {
      str = new TextDecoder().decode(str);
    }
    try {
      console.log(str);
    } catch {
    }
    cb && typeof cb === "function" && cb();
    return false;
  }
};
var ReadStream2 = class {
  static {
    __name(this, "ReadStream");
  }
  static {
    __name2(this, "ReadStream");
  }
  fd;
  isRaw = false;
  isTTY = false;
  constructor(fd) {
    this.fd = fd;
  }
  setRawMode(mode) {
    this.isRaw = mode;
    return this;
  }
};
var NODE_VERSION2 = "22.14.0";
var Process2 = class _Process extends EventEmitter2 {
  static {
    __name(this, "_Process");
  }
  static {
    __name2(this, "Process");
  }
  env;
  hrtime;
  nextTick;
  constructor(impl) {
    super();
    this.env = impl.env;
    this.hrtime = impl.hrtime;
    this.nextTick = impl.nextTick;
    for (const prop of [...Object.getOwnPropertyNames(_Process.prototype), ...Object.getOwnPropertyNames(EventEmitter2.prototype)]) {
      const value = this[prop];
      if (typeof value === "function") {
        this[prop] = value.bind(this);
      }
    }
  }
  // --- event emitter ---
  emitWarning(warning, type, code) {
    console.warn(`${code ? `[${code}] ` : ""}${type ? `${type}: ` : ""}${warning}`);
  }
  emit(...args) {
    return super.emit(...args);
  }
  listeners(eventName) {
    return super.listeners(eventName);
  }
  // --- stdio (lazy initializers) ---
  #stdin;
  #stdout;
  #stderr;
  get stdin() {
    return this.#stdin ??= new ReadStream2(0);
  }
  get stdout() {
    return this.#stdout ??= new WriteStream2(1);
  }
  get stderr() {
    return this.#stderr ??= new WriteStream2(2);
  }
  // --- cwd ---
  #cwd = "/";
  chdir(cwd22) {
    this.#cwd = cwd22;
  }
  cwd() {
    return this.#cwd;
  }
  // --- dummy props and getters ---
  arch = "";
  platform = "";
  argv = [];
  argv0 = "";
  execArgv = [];
  execPath = "";
  title = "";
  pid = 200;
  ppid = 100;
  get version() {
    return `v${NODE_VERSION2}`;
  }
  get versions() {
    return { node: NODE_VERSION2 };
  }
  get allowedNodeEnvironmentFlags() {
    return /* @__PURE__ */ new Set();
  }
  get sourceMapsEnabled() {
    return false;
  }
  get debugPort() {
    return 0;
  }
  get throwDeprecation() {
    return false;
  }
  get traceDeprecation() {
    return false;
  }
  get features() {
    return {};
  }
  get release() {
    return {};
  }
  get connected() {
    return false;
  }
  get config() {
    return {};
  }
  get moduleLoadList() {
    return [];
  }
  constrainedMemory() {
    return 0;
  }
  availableMemory() {
    return 0;
  }
  uptime() {
    return 0;
  }
  resourceUsage() {
    return {};
  }
  // --- noop methods ---
  ref() {
  }
  unref() {
  }
  // --- unimplemented methods ---
  umask() {
    throw /* @__PURE__ */ createNotImplementedError2("process.umask");
  }
  getBuiltinModule() {
    return void 0;
  }
  getActiveResourcesInfo() {
    throw /* @__PURE__ */ createNotImplementedError2("process.getActiveResourcesInfo");
  }
  exit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.exit");
  }
  reallyExit() {
    throw /* @__PURE__ */ createNotImplementedError2("process.reallyExit");
  }
  kill() {
    throw /* @__PURE__ */ createNotImplementedError2("process.kill");
  }
  abort() {
    throw /* @__PURE__ */ createNotImplementedError2("process.abort");
  }
  dlopen() {
    throw /* @__PURE__ */ createNotImplementedError2("process.dlopen");
  }
  setSourceMapsEnabled() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setSourceMapsEnabled");
  }
  loadEnvFile() {
    throw /* @__PURE__ */ createNotImplementedError2("process.loadEnvFile");
  }
  disconnect() {
    throw /* @__PURE__ */ createNotImplementedError2("process.disconnect");
  }
  cpuUsage() {
    throw /* @__PURE__ */ createNotImplementedError2("process.cpuUsage");
  }
  setUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.setUncaughtExceptionCaptureCallback");
  }
  hasUncaughtExceptionCaptureCallback() {
    throw /* @__PURE__ */ createNotImplementedError2("process.hasUncaughtExceptionCaptureCallback");
  }
  initgroups() {
    throw /* @__PURE__ */ createNotImplementedError2("process.initgroups");
  }
  openStdin() {
    throw /* @__PURE__ */ createNotImplementedError2("process.openStdin");
  }
  assert() {
    throw /* @__PURE__ */ createNotImplementedError2("process.assert");
  }
  binding() {
    throw /* @__PURE__ */ createNotImplementedError2("process.binding");
  }
  // --- attached interfaces ---
  permission = { has: /* @__PURE__ */ notImplemented2("process.permission.has") };
  report = {
    directory: "",
    filename: "",
    signal: "SIGUSR2",
    compact: false,
    reportOnFatalError: false,
    reportOnSignal: false,
    reportOnUncaughtException: false,
    getReport: /* @__PURE__ */ notImplemented2("process.report.getReport"),
    writeReport: /* @__PURE__ */ notImplemented2("process.report.writeReport")
  };
  finalization = {
    register: /* @__PURE__ */ notImplemented2("process.finalization.register"),
    unregister: /* @__PURE__ */ notImplemented2("process.finalization.unregister"),
    registerBeforeExit: /* @__PURE__ */ notImplemented2("process.finalization.registerBeforeExit")
  };
  memoryUsage = Object.assign(() => ({
    arrayBuffers: 0,
    rss: 0,
    external: 0,
    heapTotal: 0,
    heapUsed: 0
  }), { rss: /* @__PURE__ */ __name2(() => 0, "rss") });
  // --- undefined props ---
  mainModule = void 0;
  domain = void 0;
  // optional
  send = void 0;
  exitCode = void 0;
  channel = void 0;
  getegid = void 0;
  geteuid = void 0;
  getgid = void 0;
  getgroups = void 0;
  getuid = void 0;
  setegid = void 0;
  seteuid = void 0;
  setgid = void 0;
  setgroups = void 0;
  setuid = void 0;
  // internals
  _events = void 0;
  _eventsCount = void 0;
  _exiting = void 0;
  _maxListeners = void 0;
  _debugEnd = void 0;
  _debugProcess = void 0;
  _fatalException = void 0;
  _getActiveHandles = void 0;
  _getActiveRequests = void 0;
  _kill = void 0;
  _preload_modules = void 0;
  _rawDebug = void 0;
  _startProfilerIdleNotifier = void 0;
  _stopProfilerIdleNotifier = void 0;
  _tickCallback = void 0;
  _disconnect = void 0;
  _handleQueue = void 0;
  _pendingMessage = void 0;
  _channel = void 0;
  _send = void 0;
  _linkedBinding = void 0;
};
var globalProcess2 = globalThis["process"];
var getBuiltinModule2 = globalProcess2.getBuiltinModule;
var { exit: exit2, platform: platform2, nextTick: nextTick2 } = getBuiltinModule2(
  "node:process"
);
var unenvProcess2 = new Process2({
  env: globalProcess2.env,
  hrtime: hrtime4,
  nextTick: nextTick2
});
var {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  finalization: finalization2,
  features: features2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
} = unenvProcess2;
var _process2 = {
  abort: abort2,
  addListener: addListener2,
  allowedNodeEnvironmentFlags: allowedNodeEnvironmentFlags2,
  hasUncaughtExceptionCaptureCallback: hasUncaughtExceptionCaptureCallback2,
  setUncaughtExceptionCaptureCallback: setUncaughtExceptionCaptureCallback2,
  loadEnvFile: loadEnvFile2,
  sourceMapsEnabled: sourceMapsEnabled2,
  arch: arch2,
  argv: argv2,
  argv0: argv02,
  chdir: chdir2,
  config: config2,
  connected: connected2,
  constrainedMemory: constrainedMemory2,
  availableMemory: availableMemory2,
  cpuUsage: cpuUsage2,
  cwd: cwd2,
  debugPort: debugPort2,
  dlopen: dlopen2,
  disconnect: disconnect2,
  emit: emit2,
  emitWarning: emitWarning2,
  env: env2,
  eventNames: eventNames2,
  execArgv: execArgv2,
  execPath: execPath2,
  exit: exit2,
  finalization: finalization2,
  features: features2,
  getBuiltinModule: getBuiltinModule2,
  getActiveResourcesInfo: getActiveResourcesInfo2,
  getMaxListeners: getMaxListeners2,
  hrtime: hrtime32,
  kill: kill2,
  listeners: listeners2,
  listenerCount: listenerCount2,
  memoryUsage: memoryUsage2,
  nextTick: nextTick2,
  on: on2,
  off: off2,
  once: once2,
  pid: pid2,
  platform: platform2,
  ppid: ppid2,
  prependListener: prependListener2,
  prependOnceListener: prependOnceListener2,
  rawListeners: rawListeners2,
  release: release2,
  removeAllListeners: removeAllListeners2,
  removeListener: removeListener2,
  report: report2,
  resourceUsage: resourceUsage2,
  setMaxListeners: setMaxListeners2,
  setSourceMapsEnabled: setSourceMapsEnabled2,
  stderr: stderr2,
  stdin: stdin2,
  stdout: stdout2,
  title: title2,
  throwDeprecation: throwDeprecation2,
  traceDeprecation: traceDeprecation2,
  umask: umask2,
  uptime: uptime2,
  version: version2,
  versions: versions2,
  // @ts-expect-error old API
  domain: domain2,
  initgroups: initgroups2,
  moduleLoadList: moduleLoadList2,
  reallyExit: reallyExit2,
  openStdin: openStdin2,
  assert: assert22,
  binding: binding2,
  send: send2,
  exitCode: exitCode2,
  channel: channel2,
  getegid: getegid2,
  geteuid: geteuid2,
  getgid: getgid2,
  getgroups: getgroups2,
  getuid: getuid2,
  setegid: setegid2,
  seteuid: seteuid2,
  setgid: setgid2,
  setgroups: setgroups2,
  setuid: setuid2,
  permission: permission2,
  mainModule: mainModule2,
  _events: _events2,
  _eventsCount: _eventsCount2,
  _exiting: _exiting2,
  _maxListeners: _maxListeners2,
  _debugEnd: _debugEnd2,
  _debugProcess: _debugProcess2,
  _fatalException: _fatalException2,
  _getActiveHandles: _getActiveHandles2,
  _getActiveRequests: _getActiveRequests2,
  _kill: _kill2,
  _preload_modules: _preload_modules2,
  _rawDebug: _rawDebug2,
  _startProfilerIdleNotifier: _startProfilerIdleNotifier2,
  _stopProfilerIdleNotifier: _stopProfilerIdleNotifier2,
  _tickCallback: _tickCallback2,
  _disconnect: _disconnect2,
  _handleQueue: _handleQueue2,
  _pendingMessage: _pendingMessage2,
  _channel: _channel2,
  _send: _send2,
  _linkedBinding: _linkedBinding2
};
var process_default2 = _process2;
globalThis.process = process_default2;
var At = Object.defineProperty;
var ze = /* @__PURE__ */ __name2((e) => {
  throw TypeError(e);
}, "ze");
var Ot = /* @__PURE__ */ __name2((e, t, r) => t in e ? At(e, t, { enumerable: true, configurable: true, writable: true, value: r }) : e[t] = r, "Ot");
var g = /* @__PURE__ */ __name2((e, t, r) => Ot(e, typeof t != "symbol" ? t + "" : t, r), "g");
var Ne = /* @__PURE__ */ __name2((e, t, r) => t.has(e) || ze("Cannot " + r), "Ne");
var d = /* @__PURE__ */ __name2((e, t, r) => (Ne(e, t, "read from private field"), r ? r.call(e) : t.get(e)), "d");
var m = /* @__PURE__ */ __name2((e, t, r) => t.has(e) ? ze("Cannot add the same private member more than once") : t instanceof WeakSet ? t.add(e) : t.set(e, r), "m");
var f = /* @__PURE__ */ __name2((e, t, r, s) => (Ne(e, t, "write to private field"), s ? s.call(e, r) : t.set(e, r), r), "f");
var x = /* @__PURE__ */ __name2((e, t, r) => (Ne(e, t, "access private method"), r), "x");
var Ue = /* @__PURE__ */ __name2((e, t, r, s) => ({ set _(o) {
  f(e, t, o, r);
}, get _() {
  return d(e, t, s);
} }), "Ue");
var Ge = /* @__PURE__ */ __name2((e, t, r) => (s, o) => {
  let a = -1;
  return i(0);
  async function i(l) {
    if (l <= a) throw new Error("next() called multiple times");
    a = l;
    let n, c = false, u;
    if (e[l] ? (u = e[l][0][0], s.req.routeIndex = l) : u = l === e.length && o || void 0, u) try {
      n = await u(s, () => i(l + 1));
    } catch (p) {
      if (p instanceof Error && t) s.error = p, n = await t(p, s), c = true;
      else throw p;
    }
    else s.finalized === false && r && (n = await r(s));
    return n && (s.finalized === false || c) && (s.res = n), s;
  }
  __name(i, "i");
  __name2(i, "i");
}, "Ge");
var Ct = Symbol();
var Rt = /* @__PURE__ */ __name2(async (e, t = /* @__PURE__ */ Object.create(null)) => {
  const { all: r = false, dot: s = false } = t, a = (e instanceof ct ? e.raw.headers : e.headers).get("Content-Type");
  return a != null && a.startsWith("multipart/form-data") || a != null && a.startsWith("application/x-www-form-urlencoded") ? St(e, { all: r, dot: s }) : {};
}, "Rt");
async function St(e, t) {
  const r = await e.formData();
  return r ? _t(r, t) : {};
}
__name(St, "St");
__name2(St, "St");
function _t(e, t) {
  const r = /* @__PURE__ */ Object.create(null);
  return e.forEach((s, o) => {
    t.all || o.endsWith("[]") ? $t(r, o, s) : r[o] = s;
  }), t.dot && Object.entries(r).forEach(([s, o]) => {
    s.includes(".") && (Nt(r, s, o), delete r[s]);
  }), r;
}
__name(_t, "_t");
__name2(_t, "_t");
var $t = /* @__PURE__ */ __name2((e, t, r) => {
  e[t] !== void 0 ? Array.isArray(e[t]) ? e[t].push(r) : e[t] = [e[t], r] : t.endsWith("[]") ? e[t] = [r] : e[t] = r;
}, "$t");
var Nt = /* @__PURE__ */ __name2((e, t, r) => {
  let s = e;
  const o = t.split(".");
  o.forEach((a, i) => {
    i === o.length - 1 ? s[a] = r : ((!s[a] || typeof s[a] != "object" || Array.isArray(s[a]) || s[a] instanceof File) && (s[a] = /* @__PURE__ */ Object.create(null)), s = s[a]);
  });
}, "Nt");
var ot = /* @__PURE__ */ __name2((e) => {
  const t = e.split("/");
  return t[0] === "" && t.shift(), t;
}, "ot");
var It = /* @__PURE__ */ __name2((e) => {
  const { groups: t, path: r } = Mt(e), s = ot(r);
  return Dt(s, t);
}, "It");
var Mt = /* @__PURE__ */ __name2((e) => {
  const t = [];
  return e = e.replace(/\{[^}]+\}/g, (r, s) => {
    const o = `@${s}`;
    return t.push([o, r]), o;
  }), { groups: t, path: e };
}, "Mt");
var Dt = /* @__PURE__ */ __name2((e, t) => {
  for (let r = t.length - 1; r >= 0; r--) {
    const [s] = t[r];
    for (let o = e.length - 1; o >= 0; o--) if (e[o].includes(s)) {
      e[o] = e[o].replace(s, t[r][1]);
      break;
    }
  }
  return e;
}, "Dt");
var Te = {};
var Ht = /* @__PURE__ */ __name2((e, t) => {
  if (e === "*") return "*";
  const r = e.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
  if (r) {
    const s = `${e}#${t}`;
    return Te[s] || (r[2] ? Te[s] = t && t[0] !== ":" && t[0] !== "*" ? [s, r[1], new RegExp(`^${r[2]}(?=/${t})`)] : [e, r[1], new RegExp(`^${r[2]}$`)] : Te[s] = [e, r[1], true]), Te[s];
  }
  return null;
}, "Ht");
var Le = /* @__PURE__ */ __name2((e, t) => {
  try {
    return t(e);
  } catch {
    return e.replace(/(?:%[0-9A-Fa-f]{2})+/g, (r) => {
      try {
        return t(r);
      } catch {
        return r;
      }
    });
  }
}, "Le");
var Lt = /* @__PURE__ */ __name2((e) => Le(e, decodeURI), "Lt");
var at = /* @__PURE__ */ __name2((e) => {
  const t = e.url, r = t.indexOf("/", t.charCodeAt(9) === 58 ? 13 : 8);
  let s = r;
  for (; s < t.length; s++) {
    const o = t.charCodeAt(s);
    if (o === 37) {
      const a = t.indexOf("?", s), i = t.slice(r, a === -1 ? void 0 : a);
      return Lt(i.includes("%25") ? i.replace(/%25/g, "%2525") : i);
    } else if (o === 63) break;
  }
  return t.slice(r, s);
}, "at");
var Ft = /* @__PURE__ */ __name2((e) => {
  const t = at(e);
  return t.length > 1 && t.at(-1) === "/" ? t.slice(0, -1) : t;
}, "Ft");
var se = /* @__PURE__ */ __name2((e, t, ...r) => (r.length && (t = se(t, ...r)), `${(e == null ? void 0 : e[0]) === "/" ? "" : "/"}${e}${t === "/" ? "" : `${(e == null ? void 0 : e.at(-1)) === "/" ? "" : "/"}${(t == null ? void 0 : t[0]) === "/" ? t.slice(1) : t}`}`), "se");
var it = /* @__PURE__ */ __name2((e) => {
  if (e.charCodeAt(e.length - 1) !== 63 || !e.includes(":")) return null;
  const t = e.split("/"), r = [];
  let s = "";
  return t.forEach((o) => {
    if (o !== "" && !/\:/.test(o)) s += "/" + o;
    else if (/\:/.test(o)) if (/\?/.test(o)) {
      r.length === 0 && s === "" ? r.push("/") : r.push(s);
      const a = o.replace("?", "");
      s += "/" + a, r.push(s);
    } else s += "/" + o;
  }), r.filter((o, a, i) => i.indexOf(o) === a);
}, "it");
var Ie = /* @__PURE__ */ __name2((e) => /[%+]/.test(e) ? (e.indexOf("+") !== -1 && (e = e.replace(/\+/g, " ")), e.indexOf("%") !== -1 ? Le(e, lt) : e) : e, "Ie");
var nt = /* @__PURE__ */ __name2((e, t, r) => {
  let s;
  if (!r && t && !/[%+]/.test(t)) {
    let i = e.indexOf(`?${t}`, 8);
    for (i === -1 && (i = e.indexOf(`&${t}`, 8)); i !== -1; ) {
      const l = e.charCodeAt(i + t.length + 1);
      if (l === 61) {
        const n = i + t.length + 2, c = e.indexOf("&", n);
        return Ie(e.slice(n, c === -1 ? void 0 : c));
      } else if (l == 38 || isNaN(l)) return "";
      i = e.indexOf(`&${t}`, i + 1);
    }
    if (s = /[%+]/.test(e), !s) return;
  }
  const o = {};
  s ?? (s = /[%+]/.test(e));
  let a = e.indexOf("?", 8);
  for (; a !== -1; ) {
    const i = e.indexOf("&", a + 1);
    let l = e.indexOf("=", a);
    l > i && i !== -1 && (l = -1);
    let n = e.slice(a + 1, l === -1 ? i === -1 ? void 0 : i : l);
    if (s && (n = Ie(n)), a = i, n === "") continue;
    let c;
    l === -1 ? c = "" : (c = e.slice(l + 1, i === -1 ? void 0 : i), s && (c = Ie(c))), r ? (o[n] && Array.isArray(o[n]) || (o[n] = []), o[n].push(c)) : o[n] ?? (o[n] = c);
  }
  return t ? o[t] : o;
}, "nt");
var qt = nt;
var zt = /* @__PURE__ */ __name2((e, t) => nt(e, t, true), "zt");
var lt = decodeURIComponent;
var Ve = /* @__PURE__ */ __name2((e) => Le(e, lt), "Ve");
var ae;
var O;
var L;
var dt;
var ut;
var De;
var q;
var Xe;
var ct = (Xe = class {
  static {
    __name(this, "Xe");
  }
  static {
    __name2(this, "Xe");
  }
  constructor(e, t = "/", r = [[]]) {
    m(this, L);
    g(this, "raw");
    m(this, ae);
    m(this, O);
    g(this, "routeIndex", 0);
    g(this, "path");
    g(this, "bodyCache", {});
    m(this, q, (e2) => {
      const { bodyCache: t2, raw: r2 } = this, s = t2[e2];
      if (s) return s;
      const o = Object.keys(t2)[0];
      return o ? t2[o].then((a) => (o === "json" && (a = JSON.stringify(a)), new Response(a)[e2]())) : t2[e2] = r2[e2]();
    });
    this.raw = e, this.path = t, f(this, O, r), f(this, ae, {});
  }
  param(e) {
    return e ? x(this, L, dt).call(this, e) : x(this, L, ut).call(this);
  }
  query(e) {
    return qt(this.url, e);
  }
  queries(e) {
    return zt(this.url, e);
  }
  header(e) {
    if (e) return this.raw.headers.get(e) ?? void 0;
    const t = {};
    return this.raw.headers.forEach((r, s) => {
      t[s] = r;
    }), t;
  }
  async parseBody(e) {
    var t;
    return (t = this.bodyCache).parsedBody ?? (t.parsedBody = await Rt(this, e));
  }
  json() {
    return d(this, q).call(this, "text").then((e) => JSON.parse(e));
  }
  text() {
    return d(this, q).call(this, "text");
  }
  arrayBuffer() {
    return d(this, q).call(this, "arrayBuffer");
  }
  blob() {
    return d(this, q).call(this, "blob");
  }
  formData() {
    return d(this, q).call(this, "formData");
  }
  addValidatedData(e, t) {
    d(this, ae)[e] = t;
  }
  valid(e) {
    return d(this, ae)[e];
  }
  get url() {
    return this.raw.url;
  }
  get method() {
    return this.raw.method;
  }
  get [Ct]() {
    return d(this, O);
  }
  get matchedRoutes() {
    return d(this, O)[0].map(([[, e]]) => e);
  }
  get routePath() {
    return d(this, O)[0].map(([[, e]]) => e)[this.routeIndex].path;
  }
}, ae = /* @__PURE__ */ new WeakMap(), O = /* @__PURE__ */ new WeakMap(), L = /* @__PURE__ */ new WeakSet(), dt = /* @__PURE__ */ __name2(function(e) {
  const t = d(this, O)[0][this.routeIndex][1][e], r = x(this, L, De).call(this, t);
  return r ? /\%/.test(r) ? Ve(r) : r : void 0;
}, "dt"), ut = /* @__PURE__ */ __name2(function() {
  const e = {}, t = Object.keys(d(this, O)[0][this.routeIndex][1]);
  for (const r of t) {
    const s = x(this, L, De).call(this, d(this, O)[0][this.routeIndex][1][r]);
    s && typeof s == "string" && (e[r] = /\%/.test(s) ? Ve(s) : s);
  }
  return e;
}, "ut"), De = /* @__PURE__ */ __name2(function(e) {
  return d(this, O)[1] ? d(this, O)[1][e] : e;
}, "De"), q = /* @__PURE__ */ new WeakMap(), Xe);
var Ut = { Stringify: 1 };
var pt = /* @__PURE__ */ __name2(async (e, t, r, s, o) => {
  typeof e == "object" && !(e instanceof String) && (e instanceof Promise || (e = e.toString()), e instanceof Promise && (e = await e));
  const a = e.callbacks;
  return a != null && a.length ? (o ? o[0] += e : o = [e], Promise.all(a.map((l) => l({ phase: t, buffer: o, context: s }))).then((l) => Promise.all(l.filter(Boolean).map((n) => pt(n, t, false, s, o))).then(() => o[0]))) : Promise.resolve(e);
}, "pt");
var Gt = "text/plain; charset=UTF-8";
var Me = /* @__PURE__ */ __name2((e, t) => ({ "Content-Type": e, ...t }), "Me");
var be;
var xe;
var I;
var ie;
var M;
var A;
var ve;
var ne;
var le;
var X;
var ye;
var we;
var z;
var re;
var Je;
var Vt = (Je = class {
  static {
    __name(this, "Je");
  }
  static {
    __name2(this, "Je");
  }
  constructor(e, t) {
    m(this, z);
    m(this, be);
    m(this, xe);
    g(this, "env", {});
    m(this, I);
    g(this, "finalized", false);
    g(this, "error");
    m(this, ie);
    m(this, M);
    m(this, A);
    m(this, ve);
    m(this, ne);
    m(this, le);
    m(this, X);
    m(this, ye);
    m(this, we);
    g(this, "render", (...e2) => (d(this, ne) ?? f(this, ne, (t2) => this.html(t2)), d(this, ne).call(this, ...e2)));
    g(this, "setLayout", (e2) => f(this, ve, e2));
    g(this, "getLayout", () => d(this, ve));
    g(this, "setRenderer", (e2) => {
      f(this, ne, e2);
    });
    g(this, "header", (e2, t2, r) => {
      this.finalized && f(this, A, new Response(d(this, A).body, d(this, A)));
      const s = d(this, A) ? d(this, A).headers : d(this, X) ?? f(this, X, new Headers());
      t2 === void 0 ? s.delete(e2) : r != null && r.append ? s.append(e2, t2) : s.set(e2, t2);
    });
    g(this, "status", (e2) => {
      f(this, ie, e2);
    });
    g(this, "set", (e2, t2) => {
      d(this, I) ?? f(this, I, /* @__PURE__ */ new Map()), d(this, I).set(e2, t2);
    });
    g(this, "get", (e2) => d(this, I) ? d(this, I).get(e2) : void 0);
    g(this, "newResponse", (...e2) => x(this, z, re).call(this, ...e2));
    g(this, "body", (e2, t2, r) => x(this, z, re).call(this, e2, t2, r));
    g(this, "text", (e2, t2, r) => !d(this, X) && !d(this, ie) && !t2 && !r && !this.finalized ? new Response(e2) : x(this, z, re).call(this, e2, t2, Me(Gt, r)));
    g(this, "json", (e2, t2, r) => x(this, z, re).call(this, JSON.stringify(e2), t2, Me("application/json", r)));
    g(this, "html", (e2, t2, r) => {
      const s = /* @__PURE__ */ __name2((o) => x(this, z, re).call(this, o, t2, Me("text/html; charset=UTF-8", r)), "s");
      return typeof e2 == "object" ? pt(e2, Ut.Stringify, false, {}).then(s) : s(e2);
    });
    g(this, "redirect", (e2, t2) => {
      const r = String(e2);
      return this.header("Location", /[^\x00-\xFF]/.test(r) ? encodeURI(r) : r), this.newResponse(null, t2 ?? 302);
    });
    g(this, "notFound", () => (d(this, le) ?? f(this, le, () => new Response()), d(this, le).call(this, this)));
    f(this, be, e), t && (f(this, M, t.executionCtx), this.env = t.env, f(this, le, t.notFoundHandler), f(this, we, t.path), f(this, ye, t.matchResult));
  }
  get req() {
    return d(this, xe) ?? f(this, xe, new ct(d(this, be), d(this, we), d(this, ye))), d(this, xe);
  }
  get event() {
    if (d(this, M) && "respondWith" in d(this, M)) return d(this, M);
    throw Error("This context has no FetchEvent");
  }
  get executionCtx() {
    if (d(this, M)) return d(this, M);
    throw Error("This context has no ExecutionContext");
  }
  get res() {
    return d(this, A) || f(this, A, new Response(null, { headers: d(this, X) ?? f(this, X, new Headers()) }));
  }
  set res(e) {
    if (d(this, A) && e) {
      e = new Response(e.body, e);
      for (const [t, r] of d(this, A).headers.entries()) if (t !== "content-type") if (t === "set-cookie") {
        const s = d(this, A).headers.getSetCookie();
        e.headers.delete("set-cookie");
        for (const o of s) e.headers.append("set-cookie", o);
      } else e.headers.set(t, r);
    }
    f(this, A, e), this.finalized = true;
  }
  get var() {
    return d(this, I) ? Object.fromEntries(d(this, I)) : {};
  }
}, be = /* @__PURE__ */ new WeakMap(), xe = /* @__PURE__ */ new WeakMap(), I = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), M = /* @__PURE__ */ new WeakMap(), A = /* @__PURE__ */ new WeakMap(), ve = /* @__PURE__ */ new WeakMap(), ne = /* @__PURE__ */ new WeakMap(), le = /* @__PURE__ */ new WeakMap(), X = /* @__PURE__ */ new WeakMap(), ye = /* @__PURE__ */ new WeakMap(), we = /* @__PURE__ */ new WeakMap(), z = /* @__PURE__ */ new WeakSet(), re = /* @__PURE__ */ __name2(function(e, t, r) {
  const s = d(this, A) ? new Headers(d(this, A).headers) : d(this, X) ?? new Headers();
  if (typeof t == "object" && "headers" in t) {
    const a = t.headers instanceof Headers ? t.headers : new Headers(t.headers);
    for (const [i, l] of a) i.toLowerCase() === "set-cookie" ? s.append(i, l) : s.set(i, l);
  }
  if (r) for (const [a, i] of Object.entries(r)) if (typeof i == "string") s.set(a, i);
  else {
    s.delete(a);
    for (const l of i) s.append(a, l);
  }
  const o = typeof t == "number" ? t : (t == null ? void 0 : t.status) ?? d(this, ie);
  return new Response(e, { status: o, headers: s });
}, "re"), Je);
var E = "ALL";
var Bt = "all";
var Wt = ["get", "post", "put", "delete", "options", "patch"];
var ht = "Can not add a route since the matcher is already built.";
var ft = class extends Error {
  static {
    __name(this, "ft");
  }
  static {
    __name2(this, "ft");
  }
};
var Kt = "__COMPOSED_HANDLER";
var Xt = /* @__PURE__ */ __name2((e) => e.text("404 Not Found", 404), "Xt");
var Be = /* @__PURE__ */ __name2((e, t) => {
  if ("getResponse" in e) {
    const r = e.getResponse();
    return t.newResponse(r.body, r);
  }
  return console.error(e), t.text("Internal Server Error", 500);
}, "Be");
var C;
var j;
var mt;
var R;
var W;
var ke;
var Ae;
var Ye;
var gt = (Ye = class {
  static {
    __name(this, "Ye");
  }
  static {
    __name2(this, "Ye");
  }
  constructor(t = {}) {
    m(this, j);
    g(this, "get");
    g(this, "post");
    g(this, "put");
    g(this, "delete");
    g(this, "options");
    g(this, "patch");
    g(this, "all");
    g(this, "on");
    g(this, "use");
    g(this, "router");
    g(this, "getPath");
    g(this, "_basePath", "/");
    m(this, C, "/");
    g(this, "routes", []);
    m(this, R, Xt);
    g(this, "errorHandler", Be);
    g(this, "onError", (t2) => (this.errorHandler = t2, this));
    g(this, "notFound", (t2) => (f(this, R, t2), this));
    g(this, "fetch", (t2, ...r) => x(this, j, Ae).call(this, t2, r[1], r[0], t2.method));
    g(this, "request", (t2, r, s2, o2) => t2 instanceof Request ? this.fetch(r ? new Request(t2, r) : t2, s2, o2) : (t2 = t2.toString(), this.fetch(new Request(/^https?:\/\//.test(t2) ? t2 : `http://localhost${se("/", t2)}`, r), s2, o2)));
    g(this, "fire", () => {
      addEventListener("fetch", (t2) => {
        t2.respondWith(x(this, j, Ae).call(this, t2.request, t2, void 0, t2.request.method));
      });
    });
    [...Wt, Bt].forEach((a) => {
      this[a] = (i, ...l) => (typeof i == "string" ? f(this, C, i) : x(this, j, W).call(this, a, d(this, C), i), l.forEach((n) => {
        x(this, j, W).call(this, a, d(this, C), n);
      }), this);
    }), this.on = (a, i, ...l) => {
      for (const n of [i].flat()) {
        f(this, C, n);
        for (const c of [a].flat()) l.map((u) => {
          x(this, j, W).call(this, c.toUpperCase(), d(this, C), u);
        });
      }
      return this;
    }, this.use = (a, ...i) => (typeof a == "string" ? f(this, C, a) : (f(this, C, "*"), i.unshift(a)), i.forEach((l) => {
      x(this, j, W).call(this, E, d(this, C), l);
    }), this);
    const { strict: s, ...o } = t;
    Object.assign(this, o), this.getPath = s ?? true ? t.getPath ?? at : Ft;
  }
  route(t, r) {
    const s = this.basePath(t);
    return r.routes.map((o) => {
      var i;
      let a;
      r.errorHandler === Be ? a = o.handler : (a = /* @__PURE__ */ __name2(async (l, n) => (await Ge([], r.errorHandler)(l, () => o.handler(l, n))).res, "a"), a[Kt] = o.handler), x(i = s, j, W).call(i, o.method, o.path, a);
    }), this;
  }
  basePath(t) {
    const r = x(this, j, mt).call(this);
    return r._basePath = se(this._basePath, t), r;
  }
  mount(t, r, s) {
    let o, a;
    s && (typeof s == "function" ? a = s : (a = s.optionHandler, s.replaceRequest === false ? o = /* @__PURE__ */ __name2((n) => n, "o") : o = s.replaceRequest));
    const i = a ? (n) => {
      const c = a(n);
      return Array.isArray(c) ? c : [c];
    } : (n) => {
      let c;
      try {
        c = n.executionCtx;
      } catch {
      }
      return [n.env, c];
    };
    o || (o = (() => {
      const n = se(this._basePath, t), c = n === "/" ? 0 : n.length;
      return (u) => {
        const p = new URL(u.url);
        return p.pathname = p.pathname.slice(c) || "/", new Request(p, u);
      };
    })());
    const l = /* @__PURE__ */ __name2(async (n, c) => {
      const u = await r(o(n.req.raw), ...i(n));
      if (u) return u;
      await c();
    }, "l");
    return x(this, j, W).call(this, E, se(t, "*"), l), this;
  }
}, C = /* @__PURE__ */ new WeakMap(), j = /* @__PURE__ */ new WeakSet(), mt = /* @__PURE__ */ __name2(function() {
  const t = new gt({ router: this.router, getPath: this.getPath });
  return t.errorHandler = this.errorHandler, f(t, R, d(this, R)), t.routes = this.routes, t;
}, "mt"), R = /* @__PURE__ */ new WeakMap(), W = /* @__PURE__ */ __name2(function(t, r, s) {
  t = t.toUpperCase(), r = se(this._basePath, r);
  const o = { basePath: this._basePath, path: r, method: t, handler: s };
  this.router.add(t, r, [s, o]), this.routes.push(o);
}, "W"), ke = /* @__PURE__ */ __name2(function(t, r) {
  if (t instanceof Error) return this.errorHandler(t, r);
  throw t;
}, "ke"), Ae = /* @__PURE__ */ __name2(function(t, r, s, o) {
  if (o === "HEAD") return (async () => new Response(null, await x(this, j, Ae).call(this, t, r, s, "GET")))();
  const a = this.getPath(t, { env: s }), i = this.router.match(o, a), l = new Vt(t, { path: a, matchResult: i, env: s, executionCtx: r, notFoundHandler: d(this, R) });
  if (i[0].length === 1) {
    let c;
    try {
      c = i[0][0][0][0](l, async () => {
        l.res = await d(this, R).call(this, l);
      });
    } catch (u) {
      return x(this, j, ke).call(this, u, l);
    }
    return c instanceof Promise ? c.then((u) => u || (l.finalized ? l.res : d(this, R).call(this, l))).catch((u) => x(this, j, ke).call(this, u, l)) : c ?? d(this, R).call(this, l);
  }
  const n = Ge(i[0], this.errorHandler, d(this, R));
  return (async () => {
    try {
      const c = await n(l);
      if (!c.finalized) throw new Error("Context is not finalized. Did you forget to return a Response object or `await next()`?");
      return c.res;
    } catch (c) {
      return x(this, j, ke).call(this, c, l);
    }
  })();
}, "Ae"), Ye);
var Ce = "[^/]+";
var fe = ".*";
var ge = "(?:|/.*)";
var oe = Symbol();
var Jt = new Set(".\\+*[^]$()");
function Yt(e, t) {
  return e.length === 1 ? t.length === 1 ? e < t ? -1 : 1 : -1 : t.length === 1 || e === fe || e === ge ? 1 : t === fe || t === ge ? -1 : e === Ce ? 1 : t === Ce ? -1 : e.length === t.length ? e < t ? -1 : 1 : t.length - e.length;
}
__name(Yt, "Yt");
__name2(Yt, "Yt");
var J;
var Y;
var S;
var Qe;
var He = (Qe = class {
  static {
    __name(this, "Qe");
  }
  static {
    __name2(this, "Qe");
  }
  constructor() {
    m(this, J);
    m(this, Y);
    m(this, S, /* @__PURE__ */ Object.create(null));
  }
  insert(t, r, s, o, a) {
    if (t.length === 0) {
      if (d(this, J) !== void 0) throw oe;
      if (a) return;
      f(this, J, r);
      return;
    }
    const [i, ...l] = t, n = i === "*" ? l.length === 0 ? ["", "", fe] : ["", "", Ce] : i === "/*" ? ["", "", ge] : i.match(/^\:([^\{\}]+)(?:\{(.+)\})?$/);
    let c;
    if (n) {
      const u = n[1];
      let p = n[2] || Ce;
      if (u && n[2] && (p === ".*" || (p = p.replace(/^\((?!\?:)(?=[^)]+\)$)/, "(?:"), /\((?!\?:)/.test(p)))) throw oe;
      if (c = d(this, S)[p], !c) {
        if (Object.keys(d(this, S)).some((h) => h !== fe && h !== ge)) throw oe;
        if (a) return;
        c = d(this, S)[p] = new He(), u !== "" && f(c, Y, o.varIndex++);
      }
      !a && u !== "" && s.push([u, d(c, Y)]);
    } else if (c = d(this, S)[i], !c) {
      if (Object.keys(d(this, S)).some((u) => u.length > 1 && u !== fe && u !== ge)) throw oe;
      if (a) return;
      c = d(this, S)[i] = new He();
    }
    c.insert(l, r, s, o, a);
  }
  buildRegExpStr() {
    const r = Object.keys(d(this, S)).sort(Yt).map((s) => {
      const o = d(this, S)[s];
      return (typeof d(o, Y) == "number" ? `(${s})@${d(o, Y)}` : Jt.has(s) ? `\\${s}` : s) + o.buildRegExpStr();
    });
    return typeof d(this, J) == "number" && r.unshift(`#${d(this, J)}`), r.length === 0 ? "" : r.length === 1 ? r[0] : "(?:" + r.join("|") + ")";
  }
}, J = /* @__PURE__ */ new WeakMap(), Y = /* @__PURE__ */ new WeakMap(), S = /* @__PURE__ */ new WeakMap(), Qe);
var Re;
var Ee;
var Ze;
var Qt = (Ze = class {
  static {
    __name(this, "Ze");
  }
  static {
    __name2(this, "Ze");
  }
  constructor() {
    m(this, Re, { varIndex: 0 });
    m(this, Ee, new He());
  }
  insert(e, t, r) {
    const s = [], o = [];
    for (let i = 0; ; ) {
      let l = false;
      if (e = e.replace(/\{[^}]+\}/g, (n) => {
        const c = `@\\${i}`;
        return o[i] = [c, n], i++, l = true, c;
      }), !l) break;
    }
    const a = e.match(/(?::[^\/]+)|(?:\/\*$)|./g) || [];
    for (let i = o.length - 1; i >= 0; i--) {
      const [l] = o[i];
      for (let n = a.length - 1; n >= 0; n--) if (a[n].indexOf(l) !== -1) {
        a[n] = a[n].replace(l, o[i][1]);
        break;
      }
    }
    return d(this, Ee).insert(a, t, s, d(this, Re), r), s;
  }
  buildRegExp() {
    let e = d(this, Ee).buildRegExpStr();
    if (e === "") return [/^$/, [], []];
    let t = 0;
    const r = [], s = [];
    return e = e.replace(/#(\d+)|@(\d+)|\.\*\$/g, (o, a, i) => a !== void 0 ? (r[++t] = Number(a), "$()") : (i !== void 0 && (s[Number(i)] = ++t), "")), [new RegExp(`^${e}`), r, s];
  }
}, Re = /* @__PURE__ */ new WeakMap(), Ee = /* @__PURE__ */ new WeakMap(), Ze);
var bt = [];
var Zt = [/^$/, [], /* @__PURE__ */ Object.create(null)];
var Oe = /* @__PURE__ */ Object.create(null);
function xt(e) {
  return Oe[e] ?? (Oe[e] = new RegExp(e === "*" ? "" : `^${e.replace(/\/\*$|([.\\+*[^\]$()])/g, (t, r) => r ? `\\${r}` : "(?:|/.*)")}$`));
}
__name(xt, "xt");
__name2(xt, "xt");
function es() {
  Oe = /* @__PURE__ */ Object.create(null);
}
__name(es, "es");
__name2(es, "es");
function ts(e) {
  var c;
  const t = new Qt(), r = [];
  if (e.length === 0) return Zt;
  const s = e.map((u) => [!/\*|\/:/.test(u[0]), ...u]).sort(([u, p], [h, v]) => u ? 1 : h ? -1 : p.length - v.length), o = /* @__PURE__ */ Object.create(null);
  for (let u = 0, p = -1, h = s.length; u < h; u++) {
    const [v, w, b] = s[u];
    v ? o[w] = [b.map(([k]) => [k, /* @__PURE__ */ Object.create(null)]), bt] : p++;
    let y;
    try {
      y = t.insert(w, p, v);
    } catch (k) {
      throw k === oe ? new ft(w) : k;
    }
    v || (r[p] = b.map(([k, ee]) => {
      const ue = /* @__PURE__ */ Object.create(null);
      for (ee -= 1; ee >= 0; ee--) {
        const [_, _e] = y[ee];
        ue[_] = _e;
      }
      return [k, ue];
    }));
  }
  const [a, i, l] = t.buildRegExp();
  for (let u = 0, p = r.length; u < p; u++) for (let h = 0, v = r[u].length; h < v; h++) {
    const w = (c = r[u][h]) == null ? void 0 : c[1];
    if (!w) continue;
    const b = Object.keys(w);
    for (let y = 0, k = b.length; y < k; y++) w[b[y]] = l[w[b[y]]];
  }
  const n = [];
  for (const u in i) n[u] = r[i[u]];
  return [a, n, o];
}
__name(ts, "ts");
__name2(ts, "ts");
function te(e, t) {
  if (e) {
    for (const r of Object.keys(e).sort((s, o) => o.length - s.length)) if (xt(r).test(t)) return [...e[r]];
  }
}
__name(te, "te");
__name2(te, "te");
var U;
var G;
var de;
var vt;
var yt;
var et;
var ss = (et = class {
  static {
    __name(this, "et");
  }
  static {
    __name2(this, "et");
  }
  constructor() {
    m(this, de);
    g(this, "name", "RegExpRouter");
    m(this, U);
    m(this, G);
    f(this, U, { [E]: /* @__PURE__ */ Object.create(null) }), f(this, G, { [E]: /* @__PURE__ */ Object.create(null) });
  }
  add(e, t, r) {
    var l;
    const s = d(this, U), o = d(this, G);
    if (!s || !o) throw new Error(ht);
    s[e] || [s, o].forEach((n) => {
      n[e] = /* @__PURE__ */ Object.create(null), Object.keys(n[E]).forEach((c) => {
        n[e][c] = [...n[E][c]];
      });
    }), t === "/*" && (t = "*");
    const a = (t.match(/\/:/g) || []).length;
    if (/\*$/.test(t)) {
      const n = xt(t);
      e === E ? Object.keys(s).forEach((c) => {
        var u;
        (u = s[c])[t] || (u[t] = te(s[c], t) || te(s[E], t) || []);
      }) : (l = s[e])[t] || (l[t] = te(s[e], t) || te(s[E], t) || []), Object.keys(s).forEach((c) => {
        (e === E || e === c) && Object.keys(s[c]).forEach((u) => {
          n.test(u) && s[c][u].push([r, a]);
        });
      }), Object.keys(o).forEach((c) => {
        (e === E || e === c) && Object.keys(o[c]).forEach((u) => n.test(u) && o[c][u].push([r, a]));
      });
      return;
    }
    const i = it(t) || [t];
    for (let n = 0, c = i.length; n < c; n++) {
      const u = i[n];
      Object.keys(o).forEach((p) => {
        var h;
        (e === E || e === p) && ((h = o[p])[u] || (h[u] = [...te(s[p], u) || te(s[E], u) || []]), o[p][u].push([r, a - c + n + 1]));
      });
    }
  }
  match(e, t) {
    es();
    const r = x(this, de, vt).call(this);
    return this.match = (s, o) => {
      const a = r[s] || r[E], i = a[2][o];
      if (i) return i;
      const l = o.match(a[0]);
      if (!l) return [[], bt];
      const n = l.indexOf("", 1);
      return [a[1][n], l];
    }, this.match(e, t);
  }
}, U = /* @__PURE__ */ new WeakMap(), G = /* @__PURE__ */ new WeakMap(), de = /* @__PURE__ */ new WeakSet(), vt = /* @__PURE__ */ __name2(function() {
  const e = /* @__PURE__ */ Object.create(null);
  return Object.keys(d(this, G)).concat(Object.keys(d(this, U))).forEach((t) => {
    e[t] || (e[t] = x(this, de, yt).call(this, t));
  }), f(this, U, f(this, G, void 0)), e;
}, "vt"), yt = /* @__PURE__ */ __name2(function(e) {
  const t = [];
  let r = e === E;
  return [d(this, U), d(this, G)].forEach((s) => {
    const o = s[e] ? Object.keys(s[e]).map((a) => [a, s[e][a]]) : [];
    o.length !== 0 ? (r || (r = true), t.push(...o)) : e !== E && t.push(...Object.keys(s[E]).map((a) => [a, s[E][a]]));
  }), r ? ts(t) : null;
}, "yt"), et);
var V;
var D;
var tt;
var rs = (tt = class {
  static {
    __name(this, "tt");
  }
  static {
    __name2(this, "tt");
  }
  constructor(e) {
    g(this, "name", "SmartRouter");
    m(this, V, []);
    m(this, D, []);
    f(this, V, e.routers);
  }
  add(e, t, r) {
    if (!d(this, D)) throw new Error(ht);
    d(this, D).push([e, t, r]);
  }
  match(e, t) {
    if (!d(this, D)) throw new Error("Fatal error");
    const r = d(this, V), s = d(this, D), o = r.length;
    let a = 0, i;
    for (; a < o; a++) {
      const l = r[a];
      try {
        for (let n = 0, c = s.length; n < c; n++) l.add(...s[n]);
        i = l.match(e, t);
      } catch (n) {
        if (n instanceof ft) continue;
        throw n;
      }
      this.match = l.match.bind(l), f(this, V, [l]), f(this, D, void 0);
      break;
    }
    if (a === o) throw new Error("Fatal error");
    return this.name = `SmartRouter + ${this.activeRouter.name}`, i;
  }
  get activeRouter() {
    if (d(this, D) || d(this, V).length !== 1) throw new Error("No active router has been determined yet.");
    return d(this, V)[0];
  }
}, V = /* @__PURE__ */ new WeakMap(), D = /* @__PURE__ */ new WeakMap(), tt);
var he = /* @__PURE__ */ Object.create(null);
var B;
var P;
var Q;
var ce;
var T;
var H;
var K;
var st;
var wt = (st = class {
  static {
    __name(this, "st");
  }
  static {
    __name2(this, "st");
  }
  constructor(e, t, r) {
    m(this, H);
    m(this, B);
    m(this, P);
    m(this, Q);
    m(this, ce, 0);
    m(this, T, he);
    if (f(this, P, r || /* @__PURE__ */ Object.create(null)), f(this, B, []), e && t) {
      const s = /* @__PURE__ */ Object.create(null);
      s[e] = { handler: t, possibleKeys: [], score: 0 }, f(this, B, [s]);
    }
    f(this, Q, []);
  }
  insert(e, t, r) {
    f(this, ce, ++Ue(this, ce)._);
    let s = this;
    const o = It(t), a = [];
    for (let i = 0, l = o.length; i < l; i++) {
      const n = o[i], c = o[i + 1], u = Ht(n, c), p = Array.isArray(u) ? u[0] : n;
      if (p in d(s, P)) {
        s = d(s, P)[p], u && a.push(u[1]);
        continue;
      }
      d(s, P)[p] = new wt(), u && (d(s, Q).push(u), a.push(u[1])), s = d(s, P)[p];
    }
    return d(s, B).push({ [e]: { handler: r, possibleKeys: a.filter((i, l, n) => n.indexOf(i) === l), score: d(this, ce) } }), s;
  }
  search(e, t) {
    var l;
    const r = [];
    f(this, T, he);
    let o = [this];
    const a = ot(t), i = [];
    for (let n = 0, c = a.length; n < c; n++) {
      const u = a[n], p = n === c - 1, h = [];
      for (let v = 0, w = o.length; v < w; v++) {
        const b = o[v], y = d(b, P)[u];
        y && (f(y, T, d(b, T)), p ? (d(y, P)["*"] && r.push(...x(this, H, K).call(this, d(y, P)["*"], e, d(b, T))), r.push(...x(this, H, K).call(this, y, e, d(b, T)))) : h.push(y));
        for (let k = 0, ee = d(b, Q).length; k < ee; k++) {
          const ue = d(b, Q)[k], _ = d(b, T) === he ? {} : { ...d(b, T) };
          if (ue === "*") {
            const F = d(b, P)["*"];
            F && (r.push(...x(this, H, K).call(this, F, e, d(b, T))), f(F, T, _), h.push(F));
            continue;
          }
          const [_e, qe, pe] = ue;
          if (!u && !(pe instanceof RegExp)) continue;
          const N = d(b, P)[_e], kt = a.slice(n).join("/");
          if (pe instanceof RegExp) {
            const F = pe.exec(kt);
            if (F) {
              if (_[qe] = F[0], r.push(...x(this, H, K).call(this, N, e, d(b, T), _)), Object.keys(d(N, P)).length) {
                f(N, T, _);
                const $e = ((l = F[0].match(/\//)) == null ? void 0 : l.length) ?? 0;
                (i[$e] || (i[$e] = [])).push(N);
              }
              continue;
            }
          }
          (pe === true || pe.test(u)) && (_[qe] = u, p ? (r.push(...x(this, H, K).call(this, N, e, _, d(b, T))), d(N, P)["*"] && r.push(...x(this, H, K).call(this, d(N, P)["*"], e, _, d(b, T)))) : (f(N, T, _), h.push(N)));
        }
      }
      o = h.concat(i.shift() ?? []);
    }
    return r.length > 1 && r.sort((n, c) => n.score - c.score), [r.map(({ handler: n, params: c }) => [n, c])];
  }
}, B = /* @__PURE__ */ new WeakMap(), P = /* @__PURE__ */ new WeakMap(), Q = /* @__PURE__ */ new WeakMap(), ce = /* @__PURE__ */ new WeakMap(), T = /* @__PURE__ */ new WeakMap(), H = /* @__PURE__ */ new WeakSet(), K = /* @__PURE__ */ __name2(function(e, t, r, s) {
  const o = [];
  for (let a = 0, i = d(e, B).length; a < i; a++) {
    const l = d(e, B)[a], n = l[t] || l[E], c = {};
    if (n !== void 0 && (n.params = /* @__PURE__ */ Object.create(null), o.push(n), r !== he || s && s !== he)) for (let u = 0, p = n.possibleKeys.length; u < p; u++) {
      const h = n.possibleKeys[u], v = c[n.score];
      n.params[h] = s != null && s[h] && !v ? s[h] : r[h] ?? (s == null ? void 0 : s[h]), c[n.score] = true;
    }
  }
  return o;
}, "K"), st);
var Z;
var rt;
var os = (rt = class {
  static {
    __name(this, "rt");
  }
  static {
    __name2(this, "rt");
  }
  constructor() {
    g(this, "name", "TrieRouter");
    m(this, Z);
    f(this, Z, new wt());
  }
  add(e, t, r) {
    const s = it(t);
    if (s) {
      for (let o = 0, a = s.length; o < a; o++) d(this, Z).insert(e, s[o], r);
      return;
    }
    d(this, Z).insert(e, t, r);
  }
  match(e, t) {
    return d(this, Z).search(e, t);
  }
}, Z = /* @__PURE__ */ new WeakMap(), rt);
var Et = class extends gt {
  static {
    __name(this, "Et");
  }
  static {
    __name2(this, "Et");
  }
  constructor(e = {}) {
    super(e), this.router = e.router ?? new rs({ routers: [new ss(), new os()] });
  }
};
var as = /* @__PURE__ */ __name2((e) => {
  const r = { ...{ origin: "*", allowMethods: ["GET", "HEAD", "PUT", "POST", "DELETE", "PATCH"], allowHeaders: [], exposeHeaders: [] }, ...e }, s = /* @__PURE__ */ ((a) => typeof a == "string" ? a === "*" ? () => a : (i) => a === i ? i : null : typeof a == "function" ? a : (i) => a.includes(i) ? i : null)(r.origin), o = ((a) => typeof a == "function" ? a : Array.isArray(a) ? () => a : () => [])(r.allowMethods);
  return async function(i, l) {
    var u;
    function n(p, h) {
      i.res.headers.set(p, h);
    }
    __name(n, "n");
    __name2(n, "n");
    const c = s(i.req.header("origin") || "", i);
    if (c && n("Access-Control-Allow-Origin", c), r.origin !== "*") {
      const p = i.req.header("Vary");
      p ? n("Vary", p) : n("Vary", "Origin");
    }
    if (r.credentials && n("Access-Control-Allow-Credentials", "true"), (u = r.exposeHeaders) != null && u.length && n("Access-Control-Expose-Headers", r.exposeHeaders.join(",")), i.req.method === "OPTIONS") {
      r.maxAge != null && n("Access-Control-Max-Age", r.maxAge.toString());
      const p = o(i.req.header("origin") || "", i);
      p.length && n("Access-Control-Allow-Methods", p.join(","));
      let h = r.allowHeaders;
      if (!(h != null && h.length)) {
        const v = i.req.header("Access-Control-Request-Headers");
        v && (h = v.split(/\s*,\s*/));
      }
      return h != null && h.length && (n("Access-Control-Allow-Headers", h.join(",")), i.res.headers.append("Vary", "Access-Control-Request-Headers")), i.res.headers.delete("Content-Length"), i.res.headers.delete("Content-Type"), new Response(null, { headers: i.res.headers, status: 204, statusText: "No Content" });
    }
    await l();
  };
}, "as");
var is = /^\s*(?:text\/(?!event-stream(?:[;\s]|$))[^;\s]+|application\/(?:javascript|json|xml|xml-dtd|ecmascript|dart|postscript|rtf|tar|toml|vnd\.dart|vnd\.ms-fontobject|vnd\.ms-opentype|wasm|x-httpd-php|x-javascript|x-ns-proxy-autoconfig|x-sh|x-tar|x-virtualbox-hdd|x-virtualbox-ova|x-virtualbox-ovf|x-virtualbox-vbox|x-virtualbox-vdi|x-virtualbox-vhd|x-virtualbox-vmdk|x-www-form-urlencoded)|font\/(?:otf|ttf)|image\/(?:bmp|vnd\.adobe\.photoshop|vnd\.microsoft\.icon|vnd\.ms-dds|x-icon|x-ms-bmp)|message\/rfc822|model\/gltf-binary|x-shader\/x-fragment|x-shader\/x-vertex|[^;\s]+?\+(?:json|text|xml|yaml))(?:[;\s]|$)/i;
var We = /* @__PURE__ */ __name2((e, t = ls) => {
  const r = /\.([a-zA-Z0-9]+?)$/, s = e.match(r);
  if (!s) return;
  let o = t[s[1]];
  return o && o.startsWith("text") && (o += "; charset=utf-8"), o;
}, "We");
var ns = { aac: "audio/aac", avi: "video/x-msvideo", avif: "image/avif", av1: "video/av1", bin: "application/octet-stream", bmp: "image/bmp", css: "text/css", csv: "text/csv", eot: "application/vnd.ms-fontobject", epub: "application/epub+zip", gif: "image/gif", gz: "application/gzip", htm: "text/html", html: "text/html", ico: "image/x-icon", ics: "text/calendar", jpeg: "image/jpeg", jpg: "image/jpeg", js: "text/javascript", json: "application/json", jsonld: "application/ld+json", map: "application/json", mid: "audio/x-midi", midi: "audio/x-midi", mjs: "text/javascript", mp3: "audio/mpeg", mp4: "video/mp4", mpeg: "video/mpeg", oga: "audio/ogg", ogv: "video/ogg", ogx: "application/ogg", opus: "audio/opus", otf: "font/otf", pdf: "application/pdf", png: "image/png", rtf: "application/rtf", svg: "image/svg+xml", tif: "image/tiff", tiff: "image/tiff", ts: "video/mp2t", ttf: "font/ttf", txt: "text/plain", wasm: "application/wasm", webm: "video/webm", weba: "audio/webm", webmanifest: "application/manifest+json", webp: "image/webp", woff: "font/woff", woff2: "font/woff2", xhtml: "application/xhtml+xml", xml: "application/xml", zip: "application/zip", "3gp": "video/3gpp", "3g2": "video/3gpp2", gltf: "model/gltf+json", glb: "model/gltf-binary" };
var ls = ns;
var cs = /* @__PURE__ */ __name2((...e) => {
  let t = e.filter((o) => o !== "").join("/");
  t = t.replace(new RegExp("(?<=\\/)\\/+", "g"), "");
  const r = t.split("/"), s = [];
  for (const o of r) o === ".." && s.length > 0 && s.at(-1) !== ".." ? s.pop() : o !== "." && s.push(o);
  return s.join("/") || ".";
}, "cs");
var jt = { br: ".br", zstd: ".zst", gzip: ".gz" };
var ds = Object.keys(jt);
var us = "index.html";
var ps = /* @__PURE__ */ __name2((e) => {
  const t = e.root ?? "./", r = e.path, s = e.join ?? cs;
  return async (o, a) => {
    var u, p, h, v;
    if (o.finalized) return a();
    let i;
    if (e.path) i = e.path;
    else try {
      if (i = decodeURIComponent(o.req.path), /(?:^|[\/\\])\.\.(?:$|[\/\\])/.test(i)) throw new Error();
    } catch {
      return await ((u = e.onNotFound) == null ? void 0 : u.call(e, o.req.path, o)), a();
    }
    let l = s(t, !r && e.rewriteRequestPath ? e.rewriteRequestPath(i) : i);
    e.isDir && await e.isDir(l) && (l = s(l, us));
    const n = e.getContent;
    let c = await n(l, o);
    if (c instanceof Response) return o.newResponse(c.body, c);
    if (c) {
      const w = e.mimes && We(l, e.mimes) || We(l);
      if (o.header("Content-Type", w || "application/octet-stream"), e.precompressed && (!w || is.test(w))) {
        const b = new Set((p = o.req.header("Accept-Encoding")) == null ? void 0 : p.split(",").map((y) => y.trim()));
        for (const y of ds) {
          if (!b.has(y)) continue;
          const k = await n(l + jt[y], o);
          if (k) {
            c = k, o.header("Content-Encoding", y), o.header("Vary", "Accept-Encoding", { append: true });
            break;
          }
        }
      }
      return await ((h = e.onFound) == null ? void 0 : h.call(e, l, o)), o.body(c);
    }
    await ((v = e.onNotFound) == null ? void 0 : v.call(e, l, o)), await a();
  };
}, "ps");
var hs = /* @__PURE__ */ __name2(async (e, t) => {
  let r;
  t && t.manifest ? typeof t.manifest == "string" ? r = JSON.parse(t.manifest) : r = t.manifest : typeof __STATIC_CONTENT_MANIFEST == "string" ? r = JSON.parse(__STATIC_CONTENT_MANIFEST) : r = __STATIC_CONTENT_MANIFEST;
  let s;
  t && t.namespace ? s = t.namespace : s = __STATIC_CONTENT;
  const o = r[e] || e;
  if (!o) return null;
  const a = await s.get(o, { type: "stream" });
  return a || null;
}, "hs");
var fs = /* @__PURE__ */ __name2((e) => async function(r, s) {
  return ps({ ...e, getContent: /* @__PURE__ */ __name2(async (a) => hs(a, { manifest: e.manifest, namespace: e.namespace ? e.namespace : r.env ? r.env.__STATIC_CONTENT : void 0 }), "getContent") })(r, s);
}, "fs");
var gs = /* @__PURE__ */ __name2((e) => fs(e), "gs");
var $ = new Et();
$.use("/api/*", as());
$.use("/static/*", gs({ root: "./public" }));
var Pe = /* @__PURE__ */ new Map();
function je(e, t = 100, r = 6e4) {
  const s = Date.now(), o = s - r;
  Pe.has(e) || Pe.set(e, []);
  const i = Pe.get(e).filter((l) => l > o);
  return i.length >= t ? false : (i.push(s), Pe.set(e, i), true);
}
__name(je, "je");
__name2(je, "je");
async function Se(e, t, r, s = "GET", o) {
  const a = `https://${e}.myshopify.com/admin/api/2024-01/${r}`, l = { method: s, headers: { "X-Shopify-Access-Token": t, "Content-Type": "application/json" } };
  o && (s === "POST" || s === "PUT") && (l.body = JSON.stringify(o));
  const n = await fetch(a, l);
  if (!n.ok) {
    const u = await n.text();
    throw new Error(`Shopify API error: ${n.status} - ${u}`);
  }
  return await n.json();
}
__name(Se, "Se");
__name2(Se, "Se");
function Fe(e) {
  if (!e) return "";
  const t = e.split(",");
  for (const r of t) if (r.includes('rel="next"')) {
    const s = r.split(";")[0].trim();
    if (s.startsWith("<") && s.endsWith(">")) return s.slice(1, -1);
  }
  return "";
}
__name(Fe, "Fe");
__name2(Fe, "Fe");
async function me(e, t, r) {
  let s = [], o = `https://${e}.myshopify.com/admin/api/2024-01/products.json?limit=250&fields=id,title,body_html,vendor,product_type,created_at,updated_at,published_at,tags,status,variants,options,images,image`;
  for (console.log("\u{1F680} USANDO L\xD3GICA DO SEU SCRIPT PYTHON - LINK HEADER PAGINATION"); o; ) {
    console.log(`\u{1F50D} Fetching: ${o}`);
    try {
      const i = await fetch(o, { method: "GET", headers: { "X-Shopify-Access-Token": t, "Content-Type": "application/json" } });
      if (!i.ok) {
        const u = await i.text();
        throw new Error(`Shopify API error: ${i.status} - ${u}`);
      }
      const n = (await i.json()).products || [];
      if (console.log(`\u{1F4E6} Received ${n.length} products... Total so far: ${s.length + n.length}`), n.length === 0) {
        console.log("\u{1F6D1} No products in response, ending pagination");
        break;
      }
      s = s.concat(n);
      const c = i.headers.get("Link") || "";
      o = Fe(c), console.log(o ? `\u27A1\uFE0F Next page found: ${o}` : "\u2705 No more pages, pagination complete");
    } catch (a) {
      console.error("\u274C Error in pagination:", a);
      break;
    }
  }
  return console.log(`\u{1F389} PAGINATION COMPLETE: ${s.length} total products found`), s;
}
__name(me, "me");
__name2(me, "me");
async function Tt(e, t) {
  let r = [];
  const s = ["custom_collections", "smart_collections"];
  console.log("\u{1F680} BUSCANDO COLE\xC7\xD5ES - MESMA L\xD3GICA DO PYTHON");
  for (const o of s) {
    let a = `https://${e}.myshopify.com/admin/api/2024-01/${o}.json?limit=250`;
    for (console.log(`\u{1F50D} Fetching ${o}...`); a; ) try {
      const l = await fetch(a, { method: "GET", headers: { "X-Shopify-Access-Token": t, "Content-Type": "application/json" } });
      if (!l.ok) {
        console.log(`Error fetching ${o}: ${l.status}`);
        break;
      }
      const c = (await l.json())[o] || [];
      if (console.log(`\u{1F4E6} Found ${c.length} ${o}`), c.length === 0) break;
      r = r.concat(c);
      const u = l.headers.get("Link") || "";
      a = Fe(u);
    } catch (i) {
      console.error(`Error fetching ${o}:`, i);
      break;
    }
  }
  return console.log(`\u{1F389} TOTAL COLLECTIONS: ${r.length}`), r;
}
__name(Tt, "Tt");
__name2(Tt, "Tt");
async function ms(e, t, r) {
  let s = [], o = `https://${e}.myshopify.com/admin/api/2024-01/collections/${r}/products.json?limit=250&fields=id`;
  for (; o; ) try {
    const a = await fetch(o, { method: "GET", headers: { "X-Shopify-Access-Token": t, "Content-Type": "application/json" } });
    if (!a.ok) break;
    const l = (await a.json()).products || [];
    s = s.concat(l);
    const n = a.headers.get("Link") || "";
    o = Fe(n);
  } catch (a) {
    console.log(`\u274C Error in collection ${r} pagination:`, a);
    break;
  }
  return s;
}
__name(ms, "ms");
__name2(ms, "ms");
async function bs(e, t, r) {
  const s = {};
  console.log("\u{1F50D} MAPEANDO PRODUTOS POR COLE\xC7\xC3O COM PAGINA\xC7\xC3O COMPLETA...");
  for (const o of r) try {
    console.log(`\u{1F50D} Buscando produtos da cole\xE7\xE3o "${o.title}"...`);
    const a = await ms(e, t, o.id);
    a.forEach((i) => {
      s[i.id] || (s[i.id] = []), s[i.id].push(o.id.toString());
    }), console.log(`\u2705 Cole\xE7\xE3o "${o.title}": ${a.length} produtos (com pagina\xE7\xE3o completa)`);
  } catch (a) {
    console.log(`\u274C Erro na cole\xE7\xE3o ${o.title}:`, a);
  }
  return console.log(`\u2705 Mapeamento completo: ${Object.keys(s).length} produtos mapeados`), s;
}
__name(bs, "bs");
__name2(bs, "bs");
async function xs(e, t, r, s) {
  const o = [];
  for (let a = 0; a < r.length; a++) {
    const i = r[a];
    try {
      const l = { id: i.id };
      s.title && s.title !== i.title && (l.title = s.title), s.description !== void 0 && s.description !== i.body_html && (l.body_html = s.description), s.vendor && s.vendor !== i.vendor && (l.vendor = s.vendor), s.productType && s.productType !== i.product_type && (l.product_type = s.productType), s.tags !== void 0 && (l.tags = s.tags), s.status && s.status !== i.status && (l.status = s.status), (s.seoTitle || s.seoDescription) && (l.metafields_global_title_tag = s.seoTitle || i.metafields_global_title_tag, l.metafields_global_description_tag = s.seoDescription || i.metafields_global_description_tag), (s.price || s.comparePrice) && (l.variants = i.variants.map((c) => ({ id: c.id, price: s.price || c.price, compare_at_price: s.comparePrice || c.compare_at_price }))), s.inventory !== void 0 && (l.variants = i.variants.map((c) => ({ id: c.id, inventory_quantity: s.inventory })));
      const n = await Se(e, t, `products/${i.id}.json`, "PUT", { product: l });
      o.push({ id: i.id, success: true, data: n.product }), a < r.length - 1 && await new Promise((c) => setTimeout(c, 200));
    } catch (l) {
      o.push({ id: i.id, success: false, error: l instanceof Error ? l.message : "Unknown error" });
    }
  }
  return o;
}
__name(xs, "xs");
__name2(xs, "xs");
$.post("/api/test-connection", async (e) => {
  try {
    const { shop: t, accessToken: r } = await e.req.json();
    if (!t || !r) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop e accessToken" }, 400);
    const s = await Se(t, r, "shop.json");
    return e.json({ success: true, shop: s.shop.name, domain: s.shop.domain, plan: s.shop.plan_name });
  } catch (t) {
    return e.json({ error: "Falha na conex\xE3o: " + (t instanceof Error ? t.message : "Erro desconhecido") }, 401);
  }
});
$.post("/api/products", async (e) => {
  try {
    const { shop: t, accessToken: r } = await e.req.json();
    if (!t || !r) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop e accessToken" }, 400);
    if (!je(`products:${t}`, 50)) return e.json({ error: "Rate limit exceeded" }, 429);
    console.log("Loading ALL products with working pagination logic");
    const s = await me(t, r);
    console.log(`\u2705 Successfully loaded ${s.length} total products`), console.log("\u{1F50D} Loading collections for product mapping...");
    const o = await Tt(t, r);
    console.log(`\u2705 Loaded ${o.length} collections`);
    const a = await bs(t, r, o), i = s.map((l) => ({ ...l, collection_ids: a[l.id] || [] }));
    return i.length > 0 && console.log("\u2705 First product with collections:", { id: i[0].id, title: i[0].title, collection_ids: i[0].collection_ids }), e.json({ products: i, total: i.length });
  } catch (t) {
    return e.json({ error: "Erro ao buscar produtos: " + (t instanceof Error ? t.message : "Erro desconhecido") }, 500);
  }
});
$.post("/api/collections", async (e) => {
  try {
    const { shop: t, accessToken: r } = await e.req.json();
    if (!t || !r) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop e accessToken" }, 400);
    if (!je(`collections:${t}`, 30)) return e.json({ error: "Rate limit exceeded" }, 429);
    const s = await Tt(t, r);
    return e.json({ collections: s });
  } catch (t) {
    return e.json({ error: "Erro ao buscar cole\xE7\xF5es: " + (t instanceof Error ? t.message : "Erro desconhecido") }, 500);
  }
});
$.post("/api/bulk-update", async (e) => {
  try {
    const { shop: t, accessToken: r, productIds: s, updates: o } = await e.req.json();
    if (!t || !r || !s || !o) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop, accessToken, productIds, updates" }, 400);
    if (!je(`bulk:${t}`, 10, 3e5)) return e.json({ error: "Rate limit exceeded for bulk operations" }, 429);
    const a = [];
    for (const l of s) try {
      const n = await Se(t, r, `products/${l}.json`);
      a.push(n.product);
    } catch (n) {
      console.error(`Error fetching product ${l}:`, n);
    }
    const i = await xs(t, r, a, o);
    return e.json({ results: i, successful: i.filter((l) => l.success).length, failed: i.filter((l) => !l.success).length });
  } catch (t) {
    return e.json({ error: "Erro na atualiza\xE7\xE3o em massa: " + (t instanceof Error ? t.message : "Erro desconhecido") }, 500);
  }
});
$.post("/api/analyze-variants", async (e) => {
  try {
    const { shop: t, accessToken: r, scope: s, selectedProductIds: o } = await e.req.json();
    if (!t || !r) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop e accessToken" }, 400);
    if (s === "selected" && (!o || o.length === 0)) return e.json({ error: 'Para escopo "selected", selectedProductIds \xE9 obrigat\xF3rio' }, 400);
    if (!je(`analyze-variants:${t}`, 10, 6e4)) return e.json({ error: "Rate limit exceeded for variant analysis" }, 429);
    let a = [];
    s === "selected" ? (a = (await me(t, r, 250)).filter((c) => o.includes(c.id.toString()) || o.includes(c.id)), console.log(`\u{1F3AF} Analisando variantes de ${a.length} produtos selecionados`)) : (a = await me(t, r, 250), console.log(`\u{1F310} Analisando variantes de todos os ${a.length} produtos`));
    const i = {}, l = {};
    return a.forEach((n) => {
      n.options && n.options.length > 0 && (n.options.forEach((c) => {
        l[c.name] || (l[c.name] = { name: c.name, values: /* @__PURE__ */ new Set(), productCount: 0, products: [] }), l[c.name].productCount++, l[c.name].products.push({ id: n.id, title: n.title }), c.values && c.values.forEach((u) => {
          l[c.name].values.add(u);
        });
      }), n.variants && n.variants.length > 0 && n.variants.forEach((c) => {
        const u = `${n.id}_${c.id}`;
        i[u] = { productId: n.id, productTitle: n.title, variantId: c.id, variantTitle: c.title, price: c.price, option1: c.option1, option2: c.option2, option3: c.option3, sku: c.sku };
      }));
    }), Object.keys(l).forEach((n) => {
      l[n].values = Array.from(l[n].values), l[n].products = l[n].products.slice(0, 10);
    }), e.json({ success: true, totalProducts: a.length, optionStats: l, variantCount: Object.keys(i).length, sampleVariants: Object.values(i).slice(0, 50) });
  } catch (t) {
    return e.json({ error: "Erro na an\xE1lise de variantes: " + (t instanceof Error ? t.message : "Erro desconhecido") }, 500);
  }
});
$.post("/api/bulk-update-variant-titles", async (e) => {
  var t;
  try {
    const { shop: r, accessToken: s, titleMappings: o, scope: a, selectedProductIds: i } = await e.req.json();
    if (!r || !s || !o || o.length === 0) return e.json({ error: "Par\xE2metros obrigat\xF3rios: shop, accessToken, titleMappings" }, 400);
    if (a === "selected" && (!i || i.length === 0)) return e.json({ error: 'Para escopo "selected", selectedProductIds \xE9 obrigat\xF3rio' }, 400);
    if (!je(`bulk-variants:${r}`, 5, 3e5)) return e.json({ error: "Rate limit exceeded for bulk variant operations" }, 429);
    let l = [];
    a === "all" ? l = await me(r, s, 250) : l = (await me(r, s, 250)).filter((h) => i.includes(h.id.toString()) || i.includes(h.id));
    let n = 0, c = 0;
    const u = [];
    console.log(`\u{1F3AF} Processando ${l.length} produtos (escopo: ${a})`);
    for (const p of l) try {
      let h = false;
      const v = ((t = p.options) == null ? void 0 : t.map((w) => {
        const b = o.find((y) => y.currentTitle.toLowerCase() === w.name.toLowerCase());
        return b && b.newTitle && b.newTitle !== w.name ? (h = true, { ...w, name: b.newTitle }) : w;
      })) || [];
      if (h && v.length > 0) {
        const w = await Se(r, s, `products/${p.id}.json`, "PUT", { product: { id: p.id, options: v } });
        n++, u.push({ productId: p.id, title: p.title, success: true, changes: v.map((b) => b.name).join(", ") }), await new Promise((b) => setTimeout(b, 500));
      }
    } catch (h) {
      c++, u.push({ productId: p.id, title: p.title, success: false, error: h instanceof Error ? h.message : "Erro desconhecido" });
    }
    return e.json({ success: true, totalProducts: allProducts.length, updatedCount: n, failedCount: c, results: u.slice(0, 50) });
  } catch (r) {
    return e.json({ error: "Erro na atualiza\xE7\xE3o em massa de t\xEDtulos de variantes: " + (r instanceof Error ? r.message : "Erro desconhecido") }, 500);
  }
});
$.get("/", (e) => e.html(`
    <!DOCTYPE html>
    <html lang="pt-BR">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Infinity Bulk Manager - Gerenciamento em Massa de Produtos Shopify</title>
        <script src="https://cdn.tailwindcss.com"><\/script>
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
        <style>
            .checkbox-row:hover { background-color: #f3f4f6; }
            .checkbox-large { transform: scale(1.2); }
            .product-row { cursor: pointer; transition: all 0.2s; }
            .product-row.selected { background-color: #dbeafe; }
            .loading-spinner { animation: spin 1s linear infinite; }
            @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        </style>
    </head>
    <body class="bg-gray-100 min-h-screen">
        <div class="container mx-auto px-4 py-8">
            <!-- Header -->
            <div class="text-center py-8 mb-8">
                <div class="flex items-center justify-center mb-4">
                    <i class="fas fa-infinity text-green-600 text-4xl mr-3"></i>
                    <h1 class="text-4xl font-bold text-gray-800">Infinity Bulk Manager</h1>
                </div>
                <div class="text-gray-600 text-lg max-w-2xl mx-auto">
                    <p class="mb-2">Gerencie produtos da sua loja Shopify em massa com poder infinito.</p>
                    <p>Atualize pre\xE7os, edite variantes e t\xEDtulos de op\xE7\xF5es em milhares de produtos.</p>
                </div>
                <div id="connection-status" class="mt-4 hidden">
                    <span class="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium">
                        <i class="fas fa-check-circle mr-2"></i>
                        Conectado
                    </span>
                </div>
            </div>

            <!-- Connection Form -->
            <div id="connection-form" class="bg-white rounded-lg shadow-md p-6 mb-6">
                <h2 class="text-xl font-bold text-gray-800 mb-4">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar \xE0 sua loja Shopify
                </h2>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Nome da Loja (sem .myshopify.com)</label>
                        <input type="text" id="shop-name" placeholder="exemplo: minhaloja" 
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                    <div>
                        <label class="block text-sm font-medium text-gray-700 mb-2">Access Token</label>
                        <input type="password" id="access-token" placeholder="shpat_..."
                               class="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    </div>
                </div>
                <button id="connect-btn" class="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                    <i class="fas fa-plug mr-2"></i>
                    Conectar
                </button>
                <div id="connection-error" class="mt-4 p-3 bg-red-100 border border-red-300 rounded-lg text-red-700 hidden"></div>
            </div>

            <!-- Main Interface (hidden until connected) -->
            <div id="main-interface" class="hidden">
                <!-- Main Controls -->
                <div class="bg-white rounded-lg shadow-md p-6 mb-6">
                    <div class="flex flex-wrap items-center justify-center gap-2 mb-4">
                        <button id="load-products-btn" class="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors text-sm font-medium">
                            <i class="fas fa-sync-alt mr-2"></i>
                            Carregar Todos os Produtos
                        </button>
                        <button id="select-all-btn" class="bg-blue-600 text-white px-3 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                            <i class="fas fa-check-square mr-1"></i>
                            Selecionar Todos
                        </button>
                        <button id="clear-selection-btn" class="bg-gray-600 text-white px-3 py-2 rounded-lg hover:bg-gray-700 transition-colors text-sm">
                            <i class="fas fa-square mr-1"></i>
                            Limpar Sele\xE7\xE3o
                        </button>
                        <button id="bulk-edit-btn" class="bg-purple-600 text-white px-3 py-2 rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-sm" disabled>
                            <i class="fas fa-edit mr-1"></i>
                            Edi\xE7\xE3o em Massa
                        </button>
                        <button id="variant-titles-btn" class="bg-orange-600 text-white px-3 py-2 rounded-lg hover:bg-orange-700 transition-colors text-sm">
                            <i class="fas fa-cogs mr-1"></i>
                            Variantes e Op\xE7\xF5es
                        </button>
                    </div>
                    <div id="selection-info" class="text-sm text-gray-600"></div>
                </div>

                <!-- Products Table -->
                <div class="bg-white rounded-lg shadow-md overflow-hidden">
                    <div class="p-4 border-b border-gray-200">
                        <h3 class="text-lg font-bold text-gray-800">
                            <i class="fas fa-boxes mr-2"></i>
                            Todos os Produtos
                        </h3>
                        <div id="products-count" class="text-sm text-gray-600 mt-1"></div>
                    </div>
                    <div id="loading" class="p-8 text-center hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Carregando produtos...</p>
                    </div>
                    <div id="products-container" class="max-h-96 overflow-y-auto">
                        <table class="w-full">
                            <thead class="bg-gray-50 sticky top-0">
                                <tr>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-12">
                                        <input type="checkbox" id="select-all-checkbox" class="checkbox-large">
                                    </th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">T\xEDtulo</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pre\xE7o</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Estoque</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th class="p-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Variantes</th>
                                </tr>
                            </thead>
                            <tbody id="products-list" class="divide-y divide-gray-200">
                                <!-- Products will be loaded here -->
                            </tbody>
                        </table>
                    </div>
                    
                    <!-- Filtro de Cole\xE7\xF5es - POSICIONADO EMBAIXO COMO COMBINADO -->
                    <div id="collections-filter-section" class="border-t border-gray-200 p-4 bg-gray-50 hidden">
                        <div class="flex items-center justify-between gap-4">
                            <div class="flex items-center gap-3">
                                <i class="fas fa-filter text-gray-600"></i>
                                <label class="text-sm font-medium text-gray-700">Filtrar por cole\xE7\xE3o:</label>
                                <select id="collection-filter" class="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm min-w-64">
                                    <option value="">\u{1F4E6} Todas as cole\xE7\xF5es</option>
                                </select>
                            </div>
                            <div id="filter-info" class="text-xs text-gray-600"></div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Bulk Edit Modal -->
            <div id="bulk-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-edit mr-2"></i>
                            Edi\xE7\xE3o em Massa
                        </h3>
                        <div class="flex items-center space-x-4">
                            <!-- Bot\xF5es duplicados do rodap\xE9 (c\xF3pia exata) -->
                            <button type="button" id="cancel-bulk-top" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" id="apply-bulk-top" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                Aplicar Altera\xE7\xF5es
                            </button>
                            <button id="close-modal" class="text-gray-500 hover:text-gray-700 ml-2">
                                <i class="fas fa-times text-xl"></i>
                            </button>
                        </div>
                    </div>
                    
                    <form id="bulk-edit-form" class="space-y-6">
                        <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <!-- Basic Information -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Informa\xE7\xF5es B\xE1sicas</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-title" class="mr-2">
                                        <span class="font-medium text-gray-700">T\xEDtulo do Produto</span>
                                    </label>
                                    <input type="text" id="bulk-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descri\xE7\xE3o</span>
                                    </label>
                                    <textarea id="bulk-description" rows="4" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-vendor" class="mr-2">
                                        <span class="font-medium text-gray-700">Fornecedor</span>
                                    </label>
                                    <input type="text" id="bulk-vendor" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-product-type" class="mr-2">
                                        <span class="font-medium text-gray-700">Tipo de Produto</span>
                                    </label>
                                    <input type="text" id="bulk-product-type" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-tags" class="mr-2">
                                        <span class="font-medium text-gray-700">Tags (separadas por v\xEDrgula)</span>
                                    </label>
                                    <input type="text" id="bulk-tags" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-status" class="mr-2">
                                        <span class="font-medium text-gray-700">Status</span>
                                    </label>
                                    <select id="bulk-status" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="active">Ativo</option>
                                        <option value="draft">Rascunho</option>
                                        <option value="archived">Arquivado</option>
                                    </select>
                                </div>
                            </div>
                            
                            <!-- Pricing and Inventory -->
                            <div class="space-y-4">
                                <h4 class="text-lg font-semibold text-gray-800 border-b pb-2">Pre\xE7os e Estoque</h4>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Pre\xE7o</span>
                                    </label>
                                    <input type="number" id="bulk-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-compare-price" class="mr-2">
                                        <span class="font-medium text-gray-700">Pre\xE7o de Compara\xE7\xE3o</span>
                                    </label>
                                    <input type="number" id="bulk-compare-price" step="0.01" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Quantidade em Estoque</span>
                                    </label>
                                    <input type="number" id="bulk-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-sku" class="mr-2">
                                        <span class="font-medium text-gray-700">SKU</span>
                                    </label>
                                    <input type="text" id="bulk-sku" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-weight" class="mr-2">
                                        <span class="font-medium text-gray-700">Peso (kg)</span>
                                    </label>
                                    <input type="number" id="bulk-weight" step="0.001" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-track-inventory" class="mr-2">
                                        <span class="font-medium text-gray-700">Rastrear Estoque</span>
                                    </label>
                                    <select id="bulk-track-inventory" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                        <option value="true">Sim</option>
                                        <option value="false">N\xE3o</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <!-- SEO Section -->
                        <div class="border-t pt-6">
                            <h4 class="text-lg font-semibold text-gray-800 border-b pb-2 mb-4">SEO</h4>
                            <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-title" class="mr-2">
                                        <span class="font-medium text-gray-700">T\xEDtulo SEO</span>
                                    </label>
                                    <input type="text" id="bulk-seo-title" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled>
                                </div>
                                
                                <div>
                                    <label class="flex items-center mb-2">
                                        <input type="checkbox" id="enable-seo-description" class="mr-2">
                                        <span class="font-medium text-gray-700">Descri\xE7\xE3o SEO</span>
                                    </label>
                                    <textarea id="bulk-seo-description" rows="3" class="w-full p-3 border border-gray-300 rounded-lg disabled:bg-gray-100" disabled></textarea>
                                </div>
                            </div>
                        </div>
                        
                        <div class="flex justify-end space-x-4 border-t pt-6">
                            <button type="button" id="cancel-bulk" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                Cancelar
                            </button>
                            <button type="submit" id="apply-bulk" class="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors">
                                <i class="fas fa-save mr-2"></i>
                                Aplicar Altera\xE7\xF5es
                            </button>
                        </div>
                    </form>
                </div>
            </div>

            <!-- Advanced Variant Management Modal -->
            <div id="variant-titles-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-6xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-2xl font-bold text-gray-800">
                            <i class="fas fa-cogs mr-2"></i>
                            Variantes e Op\xE7\xF5es - Gerenciamento Avan\xE7ado
                        </h3>
                        <button id="close-variant-titles-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    
                    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
                        <div class="bg-blue-50 border border-blue-200 rounded-lg p-4">
                            <h4 class="font-bold text-blue-800 mb-2">
                                <i class="fas fa-edit mr-2"></i>Renomear T\xEDtulos de Op\xE7\xF5es
                            </h4>
                            <p class="text-blue-700 text-sm mb-3">
                                Altere os nomes das op\xE7\xF5es (ex: "Size" \u2192 "Tamanho") em todos os produtos.
                            </p>
                            
                            <!-- Seletor de Escopo para Carregamento -->
                            <div class="mb-4">
                                <h5 class="text-sm font-medium text-blue-800 mb-2">Carregar variantes de:</h5>
                                <div class="space-y-2">
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="all" id="load-scope-all" class="mr-2" checked>
                                        <span>Todos os produtos da loja</span>
                                    </label>
                                    <label class="flex items-center text-sm">
                                        <input type="radio" name="load-scope" value="selected" id="load-scope-selected" class="mr-2">
                                        <span id="load-scope-selected-text">Apenas produtos selecionados (0 produtos)</span>
                                    </label>
                                </div>
                            </div>
                            
                            <button id="load-variant-data-btn" class="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 text-sm">
                                <i class="fas fa-search mr-2"></i>
                                Carregar Variantes Existentes
                            </button>
                        </div>
                        
                        <div class="bg-green-50 border border-green-200 rounded-lg p-4">
                            <h4 class="font-bold text-green-800 mb-2">
                                <i class="fas fa-dollar-sign mr-2"></i>Editar Valores e Pre\xE7os
                            </h4>
                            <p class="text-green-700 text-sm mb-3">
                                Altere valores das op\xE7\xF5es e adicione pre\xE7os extras por variante.
                            </p>
                            <div class="text-xs text-green-600">
                                Dispon\xEDvel ap\xF3s carregar variantes existentes
                            </div>
                        </div>
                    </div>
                    
                    <div id="loading-variants" class="text-center py-8 hidden">
                        <i class="fas fa-spinner loading-spinner text-blue-600 text-2xl"></i>
                        <p class="text-gray-600 mt-2">Analisando variantes dos produtos...</p>
                    </div>
                    
                    <div id="variant-data-container" class="hidden">
                        <!-- Tab Navigation -->
                        <div class="flex border-b border-gray-200 mb-6">
                            <button id="tab-titles" class="px-4 py-2 text-sm font-medium text-blue-600 border-b-2 border-blue-600 bg-blue-50">
                                <i class="fas fa-tags mr-2"></i>T\xEDtulos das Op\xE7\xF5es
                            </button>
                            <button id="tab-values" class="px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700">
                                <i class="fas fa-list mr-2"></i>Valores e Pre\xE7os
                            </button>
                        </div>
                        
                        <!-- Titles Tab -->
                        <div id="content-titles" class="space-y-4">
                            <div id="existing-options-list" class="space-y-3">
                                <!-- Will be populated with existing options -->
                            </div>
                        </div>
                        
                        <!-- Values Tab -->
                        <div id="content-values" class="hidden space-y-4">
                            <div id="existing-values-list" class="space-y-4">
                                <!-- Will be populated with existing values and price options -->
                            </div>
                        </div>
                    </div>
                    
                    <div class="border-t pt-6 mt-6">
                        <!-- Seletor de Escopo das Altera\xE7\xF5es -->
                        <div class="mb-4">
                            <h4 class="text-md font-semibold text-gray-800 mb-3">
                                <i class="fas fa-target mr-2"></i>Escopo das Altera\xE7\xF5es
                            </h4>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="variant-scope" value="all" id="scope-all" class="mr-3" checked>
                                    <div>
                                        <div class="font-medium text-gray-800">Todos os Produtos</div>
                                        <div class="text-sm text-gray-600">Aplicar a todos os produtos da loja que possuem as op\xE7\xF5es especificadas</div>
                                    </div>
                                </label>
                                <label class="flex items-center p-3 border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 transition-colors">
                                    <input type="radio" name="variant-scope" value="selected" id="scope-selected" class="mr-3">
                                    <div>
                                        <div class="font-medium text-gray-800">Produtos Selecionados</div>
                                        <div class="text-sm text-gray-600" id="selected-count-display">Aplicar apenas aos produtos selecionados na tabela</div>
                                    </div>
                                </label>
                            </div>
                        </div>
                        
                        <div class="flex justify-between items-center">
                            <div class="text-sm text-gray-600" id="scope-info">
                                <i class="fas fa-info-circle text-blue-500 mr-2"></i>
                                <span id="scope-info-text">As altera\xE7\xF5es ser\xE3o aplicadas a todos os produtos que possuem as op\xE7\xF5es especificadas</span>
                            </div>
                            <div class="flex space-x-4">
                                <button id="cancel-variant-titles" class="bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600 transition-colors">
                                    Cancelar
                                </button>
                                <button id="apply-variant-changes" class="bg-orange-600 text-white px-6 py-3 rounded-lg hover:bg-orange-700 transition-colors hidden">
                                    <i class="fas fa-magic mr-2"></i>
                                    Aplicar Altera\xE7\xF5es
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Results Modal -->
            <div id="results-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden items-center justify-center z-50">
                <div class="bg-white rounded-lg p-6 w-full max-w-4xl mx-4 max-h-screen overflow-y-auto">
                    <div class="flex justify-between items-center mb-6">
                        <h3 class="text-xl font-bold text-gray-800">
                            <i class="fas fa-chart-bar mr-2"></i>
                            Resultados da Atualiza\xE7\xE3o em Massa
                        </h3>
                        <button id="close-results-modal" class="text-gray-500 hover:text-gray-700">
                            <i class="fas fa-times text-xl"></i>
                        </button>
                    </div>
                    <div id="results-content">
                        <!-- Results will be shown here -->
                    </div>
                </div>
            </div>
        </div>

        <script src="/static/app.js"><\/script>
    </body>
    </html>
  `));
var Ke = new Et();
var vs = Object.assign({ "/src/index.tsx": $ });
var Pt = false;
for (const [, e] of Object.entries(vs)) e && (Ke.route("/", e), Ke.notFound(e.notFoundHandler), Pt = true);
if (!Pt) throw new Error("Can't import modules from ['/src/index.tsx','/app/server.ts']");
var drainBody = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default = drainBody;
function reduceError(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError(e.cause)
  };
}
__name(reduceError, "reduceError");
__name2(reduceError, "reduceError");
var jsonError = /* @__PURE__ */ __name2(async (request, env22, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env22);
  } catch (e) {
    const error32 = reduceError(e);
    return Response.json(error32, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default = jsonError;
var __INTERNAL_WRANGLER_MIDDLEWARE__ = [
  middleware_ensure_req_body_drained_default,
  middleware_miniflare3_json_error_default
];
var middleware_insertion_facade_default = Ke;
var __facade_middleware__ = [];
function __facade_register__(...args) {
  __facade_middleware__.push(...args.flat());
}
__name(__facade_register__, "__facade_register__");
__name2(__facade_register__, "__facade_register__");
function __facade_invokeChain__(request, env22, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env22, ctx, middlewareCtx);
}
__name(__facade_invokeChain__, "__facade_invokeChain__");
__name2(__facade_invokeChain__, "__facade_invokeChain__");
function __facade_invoke__(request, env22, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__(request, env22, ctx, dispatch, [
    ...__facade_middleware__,
    finalMiddleware
  ]);
}
__name(__facade_invoke__, "__facade_invoke__");
__name2(__facade_invoke__, "__facade_invoke__");
var __Facade_ScheduledController__ = class ___Facade_ScheduledController__ {
  static {
    __name(this, "___Facade_ScheduledController__");
  }
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name2(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name2(function(request, env22, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env22, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env22, ctx) {
      const dispatcher = /* @__PURE__ */ __name2(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env22, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__(request, env22, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler, "wrapExportedHandler");
__name2(wrapExportedHandler, "wrapExportedHandler");
function wrapWorkerEntrypoint(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__ === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__) {
    __facade_register__(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name2((request, env22, ctx) => {
      this.env = env22;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name2((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
__name2(wrapWorkerEntrypoint, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY;
if (typeof middleware_insertion_facade_default === "object") {
  WRAPPED_ENTRY = wrapExportedHandler(middleware_insertion_facade_default);
} else if (typeof middleware_insertion_facade_default === "function") {
  WRAPPED_ENTRY = wrapWorkerEntrypoint(middleware_insertion_facade_default);
}
var middleware_loader_entry_default = WRAPPED_ENTRY;

// node_modules/wrangler/templates/pages-dev-util.ts
function isRoutingRuleMatch(pathname, routingRule) {
  if (!pathname) {
    throw new Error("Pathname is undefined.");
  }
  if (!routingRule) {
    throw new Error("Routing rule is undefined.");
  }
  const ruleRegExp = transformRoutingRuleToRegExp(routingRule);
  return pathname.match(ruleRegExp) !== null;
}
__name(isRoutingRuleMatch, "isRoutingRuleMatch");
function transformRoutingRuleToRegExp(rule) {
  let transformedRule;
  if (rule === "/" || rule === "/*") {
    transformedRule = rule;
  } else if (rule.endsWith("/*")) {
    transformedRule = `${rule.substring(0, rule.length - 2)}(/*)?`;
  } else if (rule.endsWith("/")) {
    transformedRule = `${rule.substring(0, rule.length - 1)}(/)?`;
  } else if (rule.endsWith("*")) {
    transformedRule = rule;
  } else {
    transformedRule = `${rule}(/)?`;
  }
  transformedRule = `^${transformedRule.replaceAll(/\./g, "\\.").replaceAll(/\*/g, ".*")}$`;
  return new RegExp(transformedRule);
}
__name(transformRoutingRuleToRegExp, "transformRoutingRuleToRegExp");

// .wrangler/tmp/pages-ADrpaQ/7g4u2j1907m.js
var define_ROUTES_default = { version: 1, include: ["/*"], exclude: ["/static/*"] };
var routes = define_ROUTES_default;
var pages_dev_pipeline_default = {
  fetch(request, env3, context3) {
    const { pathname } = new URL(request.url);
    for (const exclude of routes.exclude) {
      if (isRoutingRuleMatch(pathname, exclude)) {
        return env3.ASSETS.fetch(request);
      }
    }
    for (const include of routes.include) {
      if (isRoutingRuleMatch(pathname, include)) {
        const workerAsHandler = middleware_loader_entry_default;
        if (workerAsHandler.fetch === void 0) {
          throw new TypeError("Entry point missing `fetch` handler");
        }
        return workerAsHandler.fetch(request, env3, context3);
      }
    }
    return env3.ASSETS.fetch(request);
  }
};

// node_modules/wrangler/templates/middleware/middleware-ensure-req-body-drained.ts
var drainBody2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } finally {
    try {
      if (request.body !== null && !request.bodyUsed) {
        const reader = request.body.getReader();
        while (!(await reader.read()).done) {
        }
      }
    } catch (e) {
      console.error("Failed to drain the unused request body.", e);
    }
  }
}, "drainBody");
var middleware_ensure_req_body_drained_default2 = drainBody2;

// node_modules/wrangler/templates/middleware/middleware-miniflare3-json-error.ts
function reduceError2(e) {
  return {
    name: e?.name,
    message: e?.message ?? String(e),
    stack: e?.stack,
    cause: e?.cause === void 0 ? void 0 : reduceError2(e.cause)
  };
}
__name(reduceError2, "reduceError");
var jsonError2 = /* @__PURE__ */ __name(async (request, env3, _ctx, middlewareCtx) => {
  try {
    return await middlewareCtx.next(request, env3);
  } catch (e) {
    const error4 = reduceError2(e);
    return Response.json(error4, {
      status: 500,
      headers: { "MF-Experimental-Error-Stack": "true" }
    });
  }
}, "jsonError");
var middleware_miniflare3_json_error_default2 = jsonError2;

// .wrangler/tmp/bundle-pkYRKY/middleware-insertion-facade.js
var __INTERNAL_WRANGLER_MIDDLEWARE__2 = [
  middleware_ensure_req_body_drained_default2,
  middleware_miniflare3_json_error_default2
];
var middleware_insertion_facade_default2 = pages_dev_pipeline_default;

// node_modules/wrangler/templates/middleware/common.ts
var __facade_middleware__2 = [];
function __facade_register__2(...args) {
  __facade_middleware__2.push(...args.flat());
}
__name(__facade_register__2, "__facade_register__");
function __facade_invokeChain__2(request, env3, ctx, dispatch, middlewareChain) {
  const [head, ...tail] = middlewareChain;
  const middlewareCtx = {
    dispatch,
    next(newRequest, newEnv) {
      return __facade_invokeChain__2(newRequest, newEnv, ctx, dispatch, tail);
    }
  };
  return head(request, env3, ctx, middlewareCtx);
}
__name(__facade_invokeChain__2, "__facade_invokeChain__");
function __facade_invoke__2(request, env3, ctx, dispatch, finalMiddleware) {
  return __facade_invokeChain__2(request, env3, ctx, dispatch, [
    ...__facade_middleware__2,
    finalMiddleware
  ]);
}
__name(__facade_invoke__2, "__facade_invoke__");

// .wrangler/tmp/bundle-pkYRKY/middleware-loader.entry.ts
var __Facade_ScheduledController__2 = class ___Facade_ScheduledController__2 {
  constructor(scheduledTime, cron, noRetry) {
    this.scheduledTime = scheduledTime;
    this.cron = cron;
    this.#noRetry = noRetry;
  }
  static {
    __name(this, "__Facade_ScheduledController__");
  }
  #noRetry;
  noRetry() {
    if (!(this instanceof ___Facade_ScheduledController__2)) {
      throw new TypeError("Illegal invocation");
    }
    this.#noRetry();
  }
};
function wrapExportedHandler2(worker) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return worker;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  const fetchDispatcher = /* @__PURE__ */ __name(function(request, env3, ctx) {
    if (worker.fetch === void 0) {
      throw new Error("Handler does not export a fetch() function.");
    }
    return worker.fetch(request, env3, ctx);
  }, "fetchDispatcher");
  return {
    ...worker,
    fetch(request, env3, ctx) {
      const dispatcher = /* @__PURE__ */ __name(function(type, init) {
        if (type === "scheduled" && worker.scheduled !== void 0) {
          const controller = new __Facade_ScheduledController__2(
            Date.now(),
            init.cron ?? "",
            () => {
            }
          );
          return worker.scheduled(controller, env3, ctx);
        }
      }, "dispatcher");
      return __facade_invoke__2(request, env3, ctx, dispatcher, fetchDispatcher);
    }
  };
}
__name(wrapExportedHandler2, "wrapExportedHandler");
function wrapWorkerEntrypoint2(klass) {
  if (__INTERNAL_WRANGLER_MIDDLEWARE__2 === void 0 || __INTERNAL_WRANGLER_MIDDLEWARE__2.length === 0) {
    return klass;
  }
  for (const middleware of __INTERNAL_WRANGLER_MIDDLEWARE__2) {
    __facade_register__2(middleware);
  }
  return class extends klass {
    #fetchDispatcher = /* @__PURE__ */ __name((request, env3, ctx) => {
      this.env = env3;
      this.ctx = ctx;
      if (super.fetch === void 0) {
        throw new Error("Entrypoint class does not define a fetch() function.");
      }
      return super.fetch(request);
    }, "#fetchDispatcher");
    #dispatcher = /* @__PURE__ */ __name((type, init) => {
      if (type === "scheduled" && super.scheduled !== void 0) {
        const controller = new __Facade_ScheduledController__2(
          Date.now(),
          init.cron ?? "",
          () => {
          }
        );
        return super.scheduled(controller);
      }
    }, "#dispatcher");
    fetch(request) {
      return __facade_invoke__2(
        request,
        this.env,
        this.ctx,
        this.#dispatcher,
        this.#fetchDispatcher
      );
    }
  };
}
__name(wrapWorkerEntrypoint2, "wrapWorkerEntrypoint");
var WRAPPED_ENTRY2;
if (typeof middleware_insertion_facade_default2 === "object") {
  WRAPPED_ENTRY2 = wrapExportedHandler2(middleware_insertion_facade_default2);
} else if (typeof middleware_insertion_facade_default2 === "function") {
  WRAPPED_ENTRY2 = wrapWorkerEntrypoint2(middleware_insertion_facade_default2);
}
var middleware_loader_entry_default2 = WRAPPED_ENTRY2;
export {
  __INTERNAL_WRANGLER_MIDDLEWARE__2 as __INTERNAL_WRANGLER_MIDDLEWARE__,
  middleware_loader_entry_default2 as default
};
//# sourceMappingURL=7g4u2j1907m.js.map
