import { test } from 'node:test';
import assert from 'node:assert/strict';
import { truncate } from '../src/truncate.js';

test('truncate returns strings that already fit unchanged', () => {
  assert.equal(truncate('hello', 10), 'hello');
  assert.equal(truncate('hello', 5), 'hello');
});

test('truncate cuts to max characters and ends with a single ellipsis', () => {
  assert.equal(truncate('hello world', 8), 'hello w…');
  assert.equal(truncate('hello world', 8).length, 8);
  assert.equal(truncate('hello', 1), '…');
});

test('truncate returns an empty string when max is 0', () => {
  assert.equal(truncate('hello', 0), '');
});
