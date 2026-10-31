import test from 'node:test';import assert from 'node:assert/strict';import {isMitsEmail} from '../src/config/validation.js';import {encryptChoice,decryptChoice} from '../src/utils/crypto.js';import {statusOf} from '../src/utils/elections.js';
process.env.BALLOT_KEY_HEX='a'.repeat(64);
for(const email of ['24mc10ka67@mitsgwl.ac.in','24mc10AB01@mitsgwl.ac.in','24mc10CS99@mitsgwl.ac.in'])test('accepts '+email,()=>assert.equal(isMitsEmail(email),true));
for(const email of ['student@gmail.com','24mc101266@mitsgwl.ac.in','24mc10kab67@mitsgwl.ac.in','24mc10ka6@mitsgwl.ac.in','24mc10ka670@mitsgwl.ac.in','24mc10ka67@gmail.com','24mc10ka67@mits.gwl.ac.in'])test('rejects '+email,()=>assert.equal(isMitsEmail(email),false));
test('encryption roundtrip',()=>assert.equal(decryptChoice(encryptChoice('candidate-id')),'candidate-id'));
test('election automatically closes by clock',()=>assert.equal(statusOf({status:'scheduled',startAt:new Date('2020-01-01'),endAt:new Date('2020-01-02')}),'closed'));
