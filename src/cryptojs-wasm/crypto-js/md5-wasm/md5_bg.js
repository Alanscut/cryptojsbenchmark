import wasm from './md5_bg.wasm';

const lTextDecoder = typeof TextDecoder === 'undefined' ? (0, module.require)('util').TextDecoder : TextDecoder;

let cachedTextDecoder = new lTextDecoder('utf-8', { ignoreBOM: true, fatal: true });

cachedTextDecoder.decode();

let cachegetUint8Memory0 = null;
function getUint8Memory0() {
    if (cachegetUint8Memory0 === null || cachegetUint8Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint8Memory0 = new Uint8Array(wasm.memory.buffer);
    }
    return cachegetUint8Memory0;
}

function getStringFromWasm0(ptr, len) {
    return cachedTextDecoder.decode(getUint8Memory0().subarray(ptr, ptr + len));
}
/**
*/
export function greet() {
    wasm.greet();
}

/**
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @param {number} x
* @param {number} s
* @param {number} t
* @returns {number}
*/
export function FF(a, b, c, d, x, s, t) {
    var ret = wasm.FF(a, b, c, d, x, s, t);
    return ret >>> 0;
}

/**
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @param {number} x
* @param {number} s
* @param {number} t
* @returns {number}
*/
export function GG(a, b, c, d, x, s, t) {
    var ret = wasm.GG(a, b, c, d, x, s, t);
    return ret >>> 0;
}

/**
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @param {number} x
* @param {number} s
* @param {number} t
* @returns {number}
*/
export function HH(a, b, c, d, x, s, t) {
    var ret = wasm.HH(a, b, c, d, x, s, t);
    return ret >>> 0;
}

/**
* @param {number} a
* @param {number} b
* @param {number} c
* @param {number} d
* @param {number} x
* @param {number} s
* @param {number} t
* @returns {number}
*/
export function II(a, b, c, d, x, s, t) {
    var ret = wasm.II(a, b, c, d, x, s, t);
    return ret >>> 0;
}

export function __wbg_alert_8e30bf44309c2980(arg0, arg1) {
    alert(getStringFromWasm0(arg0, arg1));
}

