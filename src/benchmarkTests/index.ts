export type Modules = {
  cModule?: any;
  rustModule?: any;
};

export type WasmBenchResults = {
  [wasmFuncName: string]: string;
};

export class WasmTestBaseClass {
  warmUpRunLoops: number;
  benchmarkRunLoops: number;
  modules: Modules;
  shouldOverrideError: Error;
  performance: any;

  constructor(
    warmUpRunLoops: number,
    benchmarkRunLoops: number,
    modules: Modules,
  ) {
    this.warmUpRunLoops = warmUpRunLoops;
    this.benchmarkRunLoops = benchmarkRunLoops;
    this.modules = modules;
    this.shouldOverrideError = Error(
      'Should override this function in sub class',
    );
    if (typeof window === 'undefined' && typeof global === 'object') {
      this.performance = require('perf_hooks').performance;
    } else {
      this.performance = performance;
    }
  }

  initTestData() {
    throw this.shouldOverrideError;
  }

  getAllRunWasmFunc(): Array<Function> {
    throw this.shouldOverrideError;
  }

  runJavaScript(): number | Array<any> | any | void {
    throw this.shouldOverrideError;
  }

  check(jsRes: any, wasmRes: any): boolean {
    // handle known return type.
    // If subclass runJavaScript() don't return these following types,
    // overwrite this.check, otherwise will throw a Error
    if (typeof jsRes === 'number') {
      return jsRes === wasmRes;
    } else if (
      Array.isArray(jsRes) || // array
      (ArrayBuffer.isView(jsRes) && !(jsRes instanceof DataView)) // TypedArray
    ) {
      return this.equalArray(jsRes, wasmRes);
    }

    throw this.shouldOverrideError;
  }

  runWasmBenchmark(): WasmBenchResults {
    const result: WasmBenchResults = {};

    for (const runWasm of this.getAllRunWasmFunc()) {
      for (let i = 0; i < this.warmUpRunLoops; i++) {
        runWasm(); // warm-up
      }
      let elapsedTime = 0.0;
      for (let i = 0; i < this.benchmarkRunLoops; i++) {
        let startTime = this.performance.now();
        runWasm();
        let endTime = this.performance.now();
        elapsedTime += endTime - startTime;
      }
      result[runWasm.name] = (elapsedTime / this.benchmarkRunLoops).toFixed(4);
    }

    return result;
  }

  runJavaScriptBenchmark() {
    for (let i = 0; i < this.warmUpRunLoops; i++) {
      this.runJavaScript(); // warm-up
    }
    let elapsedTime = 0.0;
    for (let i = 0; i < this.benchmarkRunLoops; i++) {
      let startTime = this.performance.now();
      this.runJavaScript();
      let endTime = this.performance.now();
      elapsedTime += endTime - startTime;
    }
    return (elapsedTime / this.benchmarkRunLoops).toFixed(4);
  }

  checkFunctionality(): boolean {
    // run js
    const jsRes = this.runJavaScript();

    // run wasm functions and check equal
    for (const runWasm of this.getAllRunWasmFunc()) {
      if (!this.check(jsRes, runWasm())) {
        return false;
      }
    }
    return true;
  }

  equalArray(array1: any, array2: any): boolean {
    if (array1.length !== array2.length) return false;
    for (let i = 0, il = array1.length; i < il; i++) {
      if (array1[i] !== array2[i]) return false;
    }
    return true;
  }

  copyArray(src: any, res: any) {
    for (let i = 0, il = src.length; i < il; i++) {
      res[i] = src[i];
    }
  }
}
