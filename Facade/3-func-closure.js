'use strict';

// Facade that wraps Map and Node.js Timers to provide a simple interface for a
// collection with values that have expiration timeout.

const timeoutCollection = function(timeout) {
  const collections = new Map();
  const timers = new Map();

  const facade = {};

  facade.set = function(key, value) {
    const timer = timers.get(key);
    if (timer) clearTimeout(timer);
    const timeId = setTimeout(() => {
      facade.delete(key);
    }, timeout);
    timeId.unref();
    collections.set(key, value);
    timers.set(key, timeId);
  };

  facade.get = function(key) {
    collections.get(key);
  };
  facade.delete = function(key) {
    const timer = timers.get(key);
    if (timer) {
      clearTimeout(timer);
      collections.delete(key);
      timers.delete(key);
    }
  };
  facade.toArray = function() {
    return [ ...collections.entries() ];
  };
  return facade;
};



// Usage

const hash = timeoutCollection(1000);
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

