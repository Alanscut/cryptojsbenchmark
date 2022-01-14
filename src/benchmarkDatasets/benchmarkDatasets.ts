import md5WasmTest from "../benchmarkTests/md5WasmTest.ts";
import aesWasmTest from "../benchmarkTests/aesWasmTest.ts";

const benchmarkDatasets = {
  md5: {
    dataSize: 1048576,
    testbench: md5WasmTest,
  },
  aes: {
    dataSize: 1048576,
    testbench: aesWasmTest,
  },
};

export default benchmarkDatasets;
