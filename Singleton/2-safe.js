'use strict';

const Singleton = new (function() {
  const single = this;
  return function() { return single; };
})();


// Usage
// eslint-disable-next-line
console.assert(new Singleton() === new Singleton());
console.log('instances are equal');
