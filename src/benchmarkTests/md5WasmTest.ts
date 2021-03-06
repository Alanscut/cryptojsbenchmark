import { WasmBenchResults } from './index';
import { randomString } from "./utils"
// @ts-ignore
import { md5 as rustMd5 } from '../cryptojs-wasm/crypto-js/md5-es';
// @ts-ignore
import jsMd5 from 'crypto-js/md5';

export default class Md5WasmTest {
  dataSize: number;
  warmUpRunLoops: number;
  benchmarkRunLoops: number;
  data: String;
  shouldOverrideError: Error;

  constructor(dataSize: number, warmUpRunLoops: number, benchmarkRunLoops: number) {
    this.dataSize = dataSize;
    this.warmUpRunLoops = warmUpRunLoops;
    this.benchmarkRunLoops = benchmarkRunLoops;
    this.data = randomString(dataSize);
    this.shouldOverrideError = Error(
      'Should override this function in sub class',
    );
  }

  getAllRunWasmFunc(): Array<Function> {
    const runRustWasm = () => rustMd5(this.data).toString();
    const allFunc: Array<Function> = [];
    allFunc.push(runRustWasm);

    return allFunc;
  }

  runWasmBenchmark(): WasmBenchResults {
    const result: WasmBenchResults = {};

    for (const runWasm of this.getAllRunWasmFunc()) {
      for (let i = 0; i < this.warmUpRunLoops; i++) {
        runWasm(); // warm-up
      }
      let elapsedTime = 0.0;
      for (let i = 0; i < this.benchmarkRunLoops; i++) {
        let startTime = performance.now();
        runWasm();
        let endTime = performance.now(); 
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
      let startTime = performance.now();
      this.runJavaScript();
      let endTime = performance.now();
      elapsedTime += endTime - startTime;
    }
    return (elapsedTime / this.benchmarkRunLoops).toFixed(4);
  }

  runJavaScript(): String {
    return jsMd5(this.data).toString();
  }

  check(jsRes: any, wasmRes: any): boolean {
    // handle known return type.
    // If subclass runJavaScript() don't return these following types,
    // overwrite this.check, otherwise will throw a Error
    if (typeof jsRes === 'number' || typeof jsRes === 'string') {
      return jsRes === wasmRes;
    } else if (
      Array.isArray(jsRes) || // array
      (ArrayBuffer.isView(jsRes) && !(jsRes instanceof DataView)) // TypedArray
    ) {
      return this.equalArray(jsRes, wasmRes);
    }

    throw this.shouldOverrideError;
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
