mod utils;

use wasm_bindgen::prelude::*;

// When the `wee_alloc` feature is enabled, use `wee_alloc` as the global
// allocator.
#[cfg(feature = "wee_alloc")]
#[global_allocator]
static ALLOC: wee_alloc::WeeAlloc = wee_alloc::WeeAlloc::INIT;


#[wasm_bindgen]
pub fn FF(a: u32, b: u32, c: u32, d: u32, x: u32, s: u32, t: u32) -> u32 {
    let n: u32 = a + ((b & c) | (!b & d)) + x + t;
    ((n << s) | (n >> (32 - s))) + b
}

#[wasm_bindgen]
pub fn GG(a: u32, b: u32, c: u32, d: u32, x: u32, s: u32, t: u32) -> u32 {
    let n: u32 = a + ((b & d) | (c & !d)) + x + t;
    ((n << s) | (n >> (32 - s))) + b
}

#[wasm_bindgen]
pub fn HH(a: u32, b: u32, c: u32, d: u32, x: u32, s: u32, t: u32) -> u32 {
    let n: u32 = a + (b ^ c ^ d) + x + t;
    ((n << s) | (n >> (32 - s))) + b
}

#[wasm_bindgen]
pub fn II(a: u32, b: u32, c: u32, d: u32, x: u32, s: u32, t: u32) -> u32 {
    let n: u32 = a + (c ^ (b | !d)) + x + t;
    ((n << s) | (n >> (32 - s))) + b
}