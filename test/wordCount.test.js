import { test } from 'node:test';
import assert from 'node:assert/strict';
import { wordCount } from '../src/wordCount.js';

test('wordCount counts whitespace-separated words', () => {
  assert.equal(wordCount('hello world'), 2);
  assert.equal(wordCount('one'), 1);
  assert.equal(wordCount('a\tb\nc'), 3);
});

test('wordCount ignores leading, trailing, and repeated whitespace', () => {
  assert.equal(wordCount('  a   b  '), 2);
});

test('wordCount returns 0 for empty and whitespace-only strings', () => {
  assert.equal(wordCount(''), 0);
  assert.equal(wordCount('   '), 0);
});
