'use strict';

// Facade that wraps Map and Node.js Timers to provide a simple interface for a
// collection with values that have expiration timeout.

class TimeoutCollection {
  constructor(timeout) {
    this.collections = new Map();
    this.timers = new Map();
    this.timeout = timeout;
  }
  set(key, value) {
    const timer = this.timers.get(key);
    if (timer) clearTimeout(timer);
    const timeId = setTimeout(() => {
      this.delete(key);
    }, this.timeout);
    timeId.unref();
    this.collections.set(key, value);
    this.timers.set(key, timeId);
  }
  get(key) {
    this.collections.get(key);
  }
  delete(key) {
    const timer = this.timers.get(key);
    if (timer) {
      clearTimeout(timer);
      this.collections.delete(key);
      this.timers.delete(key);
    }
  }
  toArray() {
    return [ ...this.collections.entries() ];
  }
}


// Usage

const hash = new TimeoutCollection(1000);
hash.set('uno', 1);
console.dir({ array: hash.toArray() });

hash.set('due', 2);
console.dir({ array: hash.toArray() });

setTimeout(() => {
  hash.set('tre', 3);
  console.dir({ array: hash.toArray() });

  setTimeout(() => {
    hash.set('quattro', 4);
    console.dir({ array: hash.toArray() });
  }, 500);

}, 1500);

