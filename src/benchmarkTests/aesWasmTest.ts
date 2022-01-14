import { WasmBenchResults } from "./index";
import { randomString } from "./utils"
// @ts-ignore
import core from "../cryptojs-wasm/crypto-js/core-es"
// @ts-ignore
import rustAes from "../cryptojs-wasm/crypto-js/aes-es";
// @ts-ignore
import jsAes from "crypto-js/aes";

export default class AesWasmTest {
  dataSize: number;
  warmUpRunLoops: number;
  benchmarkRunLoops: number;
  data: String;
  key: String;
  shouldOverrideError: Error;

  constructor(dataSize: number, warmUpRunLoops: number, benchmarkRunLoops: number) {
    this.dataSize = dataSize;
    this.warmUpRunLoops = warmUpRunLoops;
    this.benchmarkRunLoops = benchmarkRunLoops;
    this.data = randomString(dataSize);
    this.key = "key";
    this.shouldOverrideError = Error(
      "Should override this function in sub class"
    );
  }

  getAllRunWasmFunc(): Array<Function> {
    const runRustWasm = () => {
      const encrypted = rustAes.encrypt(this.data, this.key).toString();
      return rustAes.decrypt(encrypted, this.key).toString(core.enc.Utf8);
    };
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
        const startTime = performance.now();
        runWasm();
        const endTime = performance.now();
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
      const startTime = performance.now();
      this.runJavaScript();
      const endTime = performance.now();
      elapsedTime += endTime - startTime;
    }
    return (elapsedTime / this.benchmarkRunLoops).toFixed(4);
  }

  runJavaScript(): String {
    const encrypted = jsAes.encrypt(this.data, this.key).toString();
    return jsAes.decrypt(encrypted, this.key).toString(core.enc.Utf8);
  }

  check(jsRes: any, wasmRes: any): boolean {
    // handle known return type.
    // If subclass runJavaScript() don't return these following types,
    // overwrite this.check, otherwise will throw a Error
    if (typeof jsRes === "number" || typeof jsRes === "string") {
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
