const bytes = await fetch('/src/cryptojs-wasm/crypto-js/aes-wasm/aes_bg.wasm')
  .then(res => res.arrayBuffer())
let imports = {};
imports['./aes_bg.js'] = {__wbindgen_throw};
const result = await WebAssembly.instantiate(bytes, imports)
const wasm = result.instance.exports

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

let cachegetUint32Memory0 = null;
function getUint32Memory0() {
    if (cachegetUint32Memory0 === null || cachegetUint32Memory0.buffer !== wasm.memory.buffer) {
        cachegetUint32Memory0 = new Uint32Array(wasm.memory.buffer);
    }
    return cachegetUint32Memory0;
}

let WASM_VECTOR_LEN = 0;

function passArray32ToWasm0(arg, malloc) {
    const ptr = malloc(arg.length * 4);
    getUint32Memory0().set(arg, ptr / 4);
    WASM_VECTOR_LEN = arg.length;
    return ptr;
}
/**
*/
export class CryptBlock {

    static __wrap(ptr) {
        const obj = Object.create(CryptBlock.prototype);
        obj.ptr = ptr;

        return obj;
    }

    __destroy_into_raw() {
        const ptr = this.ptr;
        this.ptr = 0;

        return ptr;
    }

    free() {
        const ptr = this.__destroy_into_raw();
        wasm.__wbg_cryptblock_free(ptr);
    }
    /**
    */
    get res0() {
        var ret = wasm.__wbg_get_cryptblock_res0(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set res0(arg0) {
        wasm.__wbg_set_cryptblock_res0(this.ptr, arg0);
    }
    /**
    */
    get res1() {
        var ret = wasm.__wbg_get_cryptblock_res1(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set res1(arg0) {
        wasm.__wbg_set_cryptblock_res1(this.ptr, arg0);
    }
    /**
    */
    get res2() {
        var ret = wasm.__wbg_get_cryptblock_res2(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set res2(arg0) {
        wasm.__wbg_set_cryptblock_res2(this.ptr, arg0);
    }
    /**
    */
    get res3() {
        var ret = wasm.__wbg_get_cryptblock_res3(this.ptr);
        return ret >>> 0;
    }
    /**
    * @param {number} arg0
    */
    set res3(arg0) {
        wasm.__wbg_set_cryptblock_res3(this.ptr, arg0);
    }
    /**
    * @returns {CryptBlock}
    */
    static new() {
        var ret = wasm.cryptblock_new();
        return CryptBlock.__wrap(ret);
    }
    /**
    * @param {Uint32Array} m
    * @param {number} nRounds
    * @param {Uint32Array} keySchedule
    * @param {Uint32Array} SUB_MIX_0
    * @param {Uint32Array} SUB_MIX_1
    * @param {Uint32Array} SUB_MIX_2
    * @param {Uint32Array} SUB_MIX_3
    * @param {Uint32Array} SBOX
    */
    doCryptBlock(m, nRounds, keySchedule, SUB_MIX_0, SUB_MIX_1, SUB_MIX_2, SUB_MIX_3, SBOX) {
        var ptr0 = passArray32ToWasm0(m, wasm.__wbindgen_malloc);
        var len0 = WASM_VECTOR_LEN;
        var ptr1 = passArray32ToWasm0(keySchedule, wasm.__wbindgen_malloc);
        var len1 = WASM_VECTOR_LEN;
        var ptr2 = passArray32ToWasm0(SUB_MIX_0, wasm.__wbindgen_malloc);
        var len2 = WASM_VECTOR_LEN;
        var ptr3 = passArray32ToWasm0(SUB_MIX_1, wasm.__wbindgen_malloc);
        var len3 = WASM_VECTOR_LEN;
        var ptr4 = passArray32ToWasm0(SUB_MIX_2, wasm.__wbindgen_malloc);
        var len4 = WASM_VECTOR_LEN;
        var ptr5 = passArray32ToWasm0(SUB_MIX_3, wasm.__wbindgen_malloc);
        var len5 = WASM_VECTOR_LEN;
        var ptr6 = passArray32ToWasm0(SBOX, wasm.__wbindgen_malloc);
        var len6 = WASM_VECTOR_LEN;
        wasm.cryptblock_doCryptBlock(this.ptr, ptr0, len0, nRounds, ptr1, len1, ptr2, len2, ptr3, len3, ptr4, len4, ptr5, len5, ptr6, len6);
    }
}

export function __wbindgen_throw(arg0, arg1) {
    throw new Error(getStringFromWasm0(arg0, arg1));
};

