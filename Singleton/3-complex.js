'use strict';

const Singleton = (() => {
  let instance;

  class Singleton {
    constructor() {
      if (instance) return instance;
      instance = this;
    }
  }

  return Singleton;
})();


// Usage

// eslint-disable-next-line
console.assert(new Singleton() === new Singleton());
console.log('instances are equal');
