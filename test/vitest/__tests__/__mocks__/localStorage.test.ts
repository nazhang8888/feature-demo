import { describe, it, expect, beforeEach } from 'vitest';

Object.defineProperty(window, 'localStorage', {
  value: localStorage as Storage,
});

describe('localStorage', () => {
  beforeEach(() => window.localStorage.clear());

  it('is initialized properly', () => expect(localStorage.length).toEqual(0));

  it("returns undefined if requested item doesn't exist", () => {
    const foo = localStorage.getItem('foo');
    expect(foo).toBeNull();
  });

  it('sets the value of an item', () => {
    localStorage.setItem('foo', 'bar');
    expect(localStorage.getItem('foo')).toEqual('bar');
  });

  it('gets the value of an item', () => {
    localStorage.setItem('foo', 'bar');
    const foo = localStorage.getItem('foo');
    expect(foo).toBe('bar');
  });

  it('removes an item', () => {
    localStorage.setItem('foo', 'bar');
    localStorage.removeItem('foo');
    const foo = localStorage.getItem('foo');
    expect(foo).toBeNull();
  });

  it('clears all items', () => {
    localStorage.setItem('foo', 'qwerty');
    localStorage.setItem('bar', 'asdf');
    expect(localStorage.getItem('foo')).toEqual('qwerty');
    expect(localStorage.getItem('bar')).toEqual('asdf');
    localStorage.clear();
    expect(localStorage.length).toEqual(0);
  });
});
