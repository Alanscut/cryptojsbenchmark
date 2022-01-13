mod utils;

use wasm_bindgen::prelude::*;

#[wasm_bindgen]
pub struct CryptBlock {
    pub res0: usize,
    pub res1: usize,
    pub res2: usize,
    pub res3: usize
}

#[wasm_bindgen]
impl CryptBlock {
    pub fn new() -> CryptBlock {
        CryptBlock {
            res0: 0,
            res1: 0,
            res2: 0,
            res3: 0
        }
    }

    pub fn doCryptBlock(&mut self, m: &[usize], nRounds: usize, keySchedule: &[usize], SUB_MIX_0: &[usize], SUB_MIX_1: &[usize], SUB_MIX_2: &[usize], SUB_MIX_3: &[usize], SBOX: &[usize]) {
        // Get input, add round key
        let mut s0: usize = m[0] ^ keySchedule[0];
        let mut s1: usize = m[1] ^ keySchedule[1];
        let mut s2: usize = m[2] ^ keySchedule[2];
        let mut s3: usize = m[3] ^ keySchedule[3];
    
        // Key schedule row counter
        let mut ksRow = 4;
    
        let mut t0: usize;
        let mut t1: usize;
        let mut t2: usize;
        let mut t3: usize;
    
        // Rounds
        let mut round = 1;
        while round < nRounds {
            t0 = SUB_MIX_0[s0 >> 24] ^ SUB_MIX_1[(s1 >> 16) & 0xff] ^ SUB_MIX_2[(s2 >> 8) & 0xff] ^ SUB_MIX_3[s3 & 0xff] ^ keySchedule[ksRow];
            ksRow += 1;
            t1 = SUB_MIX_0[s1 >> 24] ^ SUB_MIX_1[(s2 >> 16) & 0xff] ^ SUB_MIX_2[(s3 >> 8) & 0xff] ^ SUB_MIX_3[s0 & 0xff] ^ keySchedule[ksRow];
            ksRow += 1;
            t2 = SUB_MIX_0[s2 >> 24] ^ SUB_MIX_1[(s3 >> 16) & 0xff] ^ SUB_MIX_2[(s0 >> 8) & 0xff] ^ SUB_MIX_3[s1 & 0xff] ^ keySchedule[ksRow];
            ksRow += 1;
            t3 = SUB_MIX_0[s3 >> 24] ^ SUB_MIX_1[(s0 >> 16) & 0xff] ^ SUB_MIX_2[(s1 >> 8) & 0xff] ^ SUB_MIX_3[s2 & 0xff] ^ keySchedule[ksRow];
            ksRow += 1;
    
            // Update state
            s0 = t0;
            s1 = t1;
            s2 = t2;
            s3 = t3;
    
            round += 1;
        }
    
        // Shift rows, sub bytes, add round key
        t0 = ((SBOX[s0 >> 24] << 24) | (SBOX[(s1 >> 16) & 0xff] << 16) | (SBOX[(s2 >> 8) & 0xff] << 8) | SBOX[s3 & 0xff]) ^ keySchedule[ksRow];
        ksRow += 1;
        t1 = ((SBOX[s1 >> 24] << 24) | (SBOX[(s2 >> 16) & 0xff] << 16) | (SBOX[(s3 >> 8) & 0xff] << 8) | SBOX[s0 & 0xff]) ^ keySchedule[ksRow];
        ksRow += 1;
        t2 = ((SBOX[s2 >> 24] << 24) | (SBOX[(s3 >> 16) & 0xff] << 16) | (SBOX[(s0 >> 8) & 0xff] << 8) | SBOX[s1 & 0xff]) ^ keySchedule[ksRow];
        ksRow += 1;
        t3 = ((SBOX[s3 >> 24] << 24) | (SBOX[(s0 >> 16) & 0xff] << 16) | (SBOX[(s1 >> 8) & 0xff] << 8) | SBOX[s2 & 0xff]) ^ keySchedule[ksRow];
        ksRow += 1;
    
        // Set output
        self.res0 = t0;
        self.res1 = t1;
        self.res2 = t2;
        self.res3 = t3;
    }
}
