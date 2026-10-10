import { test } from 'node:test';
import assert from 'node:assert/strict';
import { capitalize } from '../src/capitalize.js';

test('capitalize uppercases the first character and leaves the rest unchanged', () => {
  assert.equal(capitalize('hello'), 'Hello');
  assert.equal(capitalize('hello world'), 'Hello world');
  assert.equal(capitalize(''), '');
  assert.equal(capitalize('hELLO'), 'HELLO');
  assert.equal(capitalize('Hello'), 'Hello');
});
