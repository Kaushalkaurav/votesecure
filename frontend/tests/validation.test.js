import test from 'node:test';
import assert from 'node:assert/strict';
import {validEmail} from '../src/config/validation.js';
test('institutional student and admin addresses pass',()=>{
  assert.equal(validEmail('24mc10ka67@mitsgwl.ac.in'),true);
  assert.equal(validEmail('25ai1lk115@mitsgwl.ac.in'),true);
  assert.equal(validEmail(' 24MC10KA67@MITSGWL.AC.IN '),true);
});
test('typos and wrong domains fail',()=>{
  assert.equal(validEmail('24mc10ka67@mitagwl.ac.in'),false);
  assert.equal(validEmail('24mc10ka67@mitsgwlXacXin'),false);
  assert.equal(validEmail('someone@gmail.com'),false);
});
