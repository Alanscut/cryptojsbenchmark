import CryptoJS from "./core-es";
import * as md5RustWasm from "./md5-wasm/md5_bg";

// Shortcuts
var C = CryptoJS;
var C_lib = C.lib;
var WordArray = C_lib.WordArray;
var Hasher = C_lib.Hasher;
var C_algo = C.algo;

// Constants table
var T = [];

// Compute constants
(function () {
	for (var i = 0; i < 64; i++) {
		T[i] = (Math.abs(Math.sin(i + 1)) * 0x100000000) | 0;
	}
}());

/**
 * MD5 hash algorithm.
 */
export const MD5 = C_algo.MD5 = Hasher.extend({
	_doReset: function () {
		this._hash = new WordArray.init([
			0x67452301, 0xefcdab89,
			0x98badcfe, 0x10325476
		]);
	},

	_doProcessBlock: function (M, offset) {
		// Swap endian
		for (var i = 0; i < 16; i++) {
			// Shortcuts
			var offset_i = offset + i;
			var M_offset_i = M[offset_i];

			M[offset_i] = (
				(((M_offset_i << 8)  | (M_offset_i >>> 24)) & 0x00ff00ff) |
				(((M_offset_i << 24) | (M_offset_i >>> 8))  & 0xff00ff00)
			);
		}

		// Shortcuts
		var H = this._hash.words;

		var M_offset_0  = M[offset + 0];
		var M_offset_1  = M[offset + 1];
		var M_offset_2  = M[offset + 2];
		var M_offset_3  = M[offset + 3];
		var M_offset_4  = M[offset + 4];
		var M_offset_5  = M[offset + 5];
		var M_offset_6  = M[offset + 6];
		var M_offset_7  = M[offset + 7];
		var M_offset_8  = M[offset + 8];
		var M_offset_9  = M[offset + 9];
		var M_offset_10 = M[offset + 10];
		var M_offset_11 = M[offset + 11];
		var M_offset_12 = M[offset + 12];
		var M_offset_13 = M[offset + 13];
		var M_offset_14 = M[offset + 14];
		var M_offset_15 = M[offset + 15];

		// Working varialbes
		var a = H[0];
		var b = H[1];
		var c = H[2];
		var d = H[3];

		// Computation
		a = md5RustWasm.FF(a, b, c, d, M_offset_0,  7,  T[0]);
		d = md5RustWasm.FF(d, a, b, c, M_offset_1,  12, T[1]);
		c = md5RustWasm.FF(c, d, a, b, M_offset_2,  17, T[2]);
		b = md5RustWasm.FF(b, c, d, a, M_offset_3,  22, T[3]);
		a = md5RustWasm.FF(a, b, c, d, M_offset_4,  7,  T[4]);
		d = md5RustWasm.FF(d, a, b, c, M_offset_5,  12, T[5]);
		c = md5RustWasm.FF(c, d, a, b, M_offset_6,  17, T[6]);
		b = md5RustWasm.FF(b, c, d, a, M_offset_7,  22, T[7]);
		a = md5RustWasm.FF(a, b, c, d, M_offset_8,  7,  T[8]);
		d = md5RustWasm.FF(d, a, b, c, M_offset_9,  12, T[9]);
		c = md5RustWasm.FF(c, d, a, b, M_offset_10, 17, T[10]);
		b = md5RustWasm.FF(b, c, d, a, M_offset_11, 22, T[11]);
		a = md5RustWasm.FF(a, b, c, d, M_offset_12, 7,  T[12]);
		d = md5RustWasm.FF(d, a, b, c, M_offset_13, 12, T[13]);
		c = md5RustWasm.FF(c, d, a, b, M_offset_14, 17, T[14]);
		b = md5RustWasm.FF(b, c, d, a, M_offset_15, 22, T[15]);

		a = md5RustWasm.GG(a, b, c, d, M_offset_1,  5,  T[16]);
		d = md5RustWasm.GG(d, a, b, c, M_offset_6,  9,  T[17]);
		c = md5RustWasm.GG(c, d, a, b, M_offset_11, 14, T[18]);
		b = md5RustWasm.GG(b, c, d, a, M_offset_0,  20, T[19]);
		a = md5RustWasm.GG(a, b, c, d, M_offset_5,  5,  T[20]);
		d = md5RustWasm.GG(d, a, b, c, M_offset_10, 9,  T[21]);
		c = md5RustWasm.GG(c, d, a, b, M_offset_15, 14, T[22]);
		b = md5RustWasm.GG(b, c, d, a, M_offset_4,  20, T[23]);
		a = md5RustWasm.GG(a, b, c, d, M_offset_9,  5,  T[24]);
		d = md5RustWasm.GG(d, a, b, c, M_offset_14, 9,  T[25]);
		c = md5RustWasm.GG(c, d, a, b, M_offset_3,  14, T[26]);
		b = md5RustWasm.GG(b, c, d, a, M_offset_8,  20, T[27]);
		a = md5RustWasm.GG(a, b, c, d, M_offset_13, 5,  T[28]);
		d = md5RustWasm.GG(d, a, b, c, M_offset_2,  9,  T[29]);
		c = md5RustWasm.GG(c, d, a, b, M_offset_7,  14, T[30]);
		b = md5RustWasm.GG(b, c, d, a, M_offset_12, 20, T[31]);

		a = md5RustWasm.HH(a, b, c, d, M_offset_5,  4,  T[32]);
		d = md5RustWasm.HH(d, a, b, c, M_offset_8,  11, T[33]);
		c = md5RustWasm.HH(c, d, a, b, M_offset_11, 16, T[34]);
		b = md5RustWasm.HH(b, c, d, a, M_offset_14, 23, T[35]);
		a = md5RustWasm.HH(a, b, c, d, M_offset_1,  4,  T[36]);
		d = md5RustWasm.HH(d, a, b, c, M_offset_4,  11, T[37]);
		c = md5RustWasm.HH(c, d, a, b, M_offset_7,  16, T[38]);
		b = md5RustWasm.HH(b, c, d, a, M_offset_10, 23, T[39]);
		a = md5RustWasm.HH(a, b, c, d, M_offset_13, 4,  T[40]);
		d = md5RustWasm.HH(d, a, b, c, M_offset_0,  11, T[41]);
		c = md5RustWasm.HH(c, d, a, b, M_offset_3,  16, T[42]);
		b = md5RustWasm.HH(b, c, d, a, M_offset_6,  23, T[43]);
		a = md5RustWasm.HH(a, b, c, d, M_offset_9,  4,  T[44]);
		d = md5RustWasm.HH(d, a, b, c, M_offset_12, 11, T[45]);
		c = md5RustWasm.HH(c, d, a, b, M_offset_15, 16, T[46]);
		b = md5RustWasm.HH(b, c, d, a, M_offset_2,  23, T[47]);

		a = md5RustWasm.II(a, b, c, d, M_offset_0,  6,  T[48]);
		d = md5RustWasm.II(d, a, b, c, M_offset_7,  10, T[49]);
		c = md5RustWasm.II(c, d, a, b, M_offset_14, 15, T[50]);
		b = md5RustWasm.II(b, c, d, a, M_offset_5,  21, T[51]);
		a = md5RustWasm.II(a, b, c, d, M_offset_12, 6,  T[52]);
		d = md5RustWasm.II(d, a, b, c, M_offset_3,  10, T[53]);
		c = md5RustWasm.II(c, d, a, b, M_offset_10, 15, T[54]);
		b = md5RustWasm.II(b, c, d, a, M_offset_1,  21, T[55]);
		a = md5RustWasm.II(a, b, c, d, M_offset_8,  6,  T[56]);
		d = md5RustWasm.II(d, a, b, c, M_offset_15, 10, T[57]);
		c = md5RustWasm.II(c, d, a, b, M_offset_6,  15, T[58]);
		b = md5RustWasm.II(b, c, d, a, M_offset_13, 21, T[59]);
		a = md5RustWasm.II(a, b, c, d, M_offset_4,  6,  T[60]);
		d = md5RustWasm.II(d, a, b, c, M_offset_11, 10, T[61]);
		c = md5RustWasm.II(c, d, a, b, M_offset_2,  15, T[62]);
		b = md5RustWasm.II(b, c, d, a, M_offset_9,  21, T[63]);

		// Intermediate hash value
		H[0] = (H[0] + a) | 0;
		H[1] = (H[1] + b) | 0;
		H[2] = (H[2] + c) | 0;
		H[3] = (H[3] + d) | 0;
	},

	_doFinalize: function () {
		// Shortcuts
		var data = this._data;
		var dataWords = data.words;

		var nBitsTotal = this._nDataBytes * 8;
		var nBitsLeft = data.sigBytes * 8;

		// Add padding
		dataWords[nBitsLeft >>> 5] |= 0x80 << (24 - nBitsLeft % 32);

		var nBitsTotalH = Math.floor(nBitsTotal / 0x100000000);
		var nBitsTotalL = nBitsTotal;
		dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 15] = (
			(((nBitsTotalH << 8)  | (nBitsTotalH >>> 24)) & 0x00ff00ff) |
			(((nBitsTotalH << 24) | (nBitsTotalH >>> 8))  & 0xff00ff00)
		);
		dataWords[(((nBitsLeft + 64) >>> 9) << 4) + 14] = (
			(((nBitsTotalL << 8)  | (nBitsTotalL >>> 24)) & 0x00ff00ff) |
			(((nBitsTotalL << 24) | (nBitsTotalL >>> 8))  & 0xff00ff00)
		);

		data.sigBytes = (dataWords.length + 1) * 4;

		// Hash final blocks
		this._process();

		// Shortcuts
		var hash = this._hash;
		var H = hash.words;

		// Swap endian
		for (var i = 0; i < 4; i++) {
			// Shortcut
			var H_i = H[i];

			H[i] = (((H_i << 8)  | (H_i >>> 24)) & 0x00ff00ff) |
					(((H_i << 24) | (H_i >>> 8))  & 0xff00ff00);
		}

		// Return final computed hash
		return hash;
	},

	clone: function () {
		var clone = Hasher.clone.call(this);
		clone._hash = this._hash.clone();

		return clone;
	}
});

/**
 * Shortcut function to the hasher's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 *
 * @return {WordArray} The hash.
 *
 * @static
 *
 * @example
 *
 *     var hash = CryptoJS.MD5('message');
 *     var hash = CryptoJS.MD5(wordArray);
 */
export const md5 = C.MD5 = Hasher._createHelper(MD5);

/**
 * Shortcut function to the HMAC's object interface.
 *
 * @param {WordArray|string} message The message to hash.
 * @param {WordArray|string} key The secret key.
 *
 * @return {WordArray} The HMAC.
 *
 * @static
 *
 * @example
 *
 *     var hmac = CryptoJS.HmacMD5(message, key);
 */
export const HmacMD5 = C.HmacMD5 = Hasher._createHmacHelper(MD5);

